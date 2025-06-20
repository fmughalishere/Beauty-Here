import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../Context/cartContext';
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaLock } from 'react-icons/fa';
import axios from 'axios';
import './Checkout.css';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const Checkout = () => {
  const { cartItems, getTotalCartAmount, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [isSummaryVisible, setIsSummaryVisible] = useState(false);
  const [processing, setProcessing] = useState(false); 
  const [error, setError] = useState(null);

  const stripe = useStripe();
  const elements = useElements();

  const [address, setAddress] = useState({
    fullName: '',
    address: '',
    city: '',
    postalCode: '',
  });

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/payment-success'); 
    }
  }, [cartItems, navigate]);

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.id]: e.target.value });
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
        if (!address.fullName || !address.address || !address.city || !address.postalCode) {
        setError("Please fill in all shipping address details.");
        return;
    }

    setProcessing(true); 
    setError(null);

    if (!stripe || !elements) {
      setError("Stripe is not ready. Please wait a moment and try again.");
      setProcessing(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);

    try {
      const { data: paymentIntentResponse } = await axios.post('http://localhost:5000/api/payment/create-payment-intent', {
        amount: getTotalCartAmount(),
      });

      if (!paymentIntentResponse.success) {
        throw new Error("Failed to prepare payment.");
      }

      const clientSecret = paymentIntentResponse.clientSecret;
      const paymentResult = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: address.fullName,
          },
        },
      });

      if (paymentResult.error) {
        setError(paymentResult.error.message);
        setProcessing(false);
      } else {
        if (paymentResult.paymentIntent.status === 'succeeded') {
          console.log("Payment Succeeded! Placing order...");
          
          const token = localStorage.getItem('auth-token');
          const orderData = {
            items: cartItems,
            amount: getTotalCartAmount(),
            address: address,
            transactionId: paymentResult.paymentIntent.id,
          };

          const response = await axios.post('http://localhost:5000/api/order/place', orderData, {
            headers: { Authorization: `Bearer ${token}` },
          });

          if (response.data.success) {
            clearCart();
            navigate('/payment-success');
          } else {
            setError("Payment was successful, but we failed to save your order. Please contact support.");
          }
        }
      }
    } catch (err) {
      console.error("Checkout failed:", err);
      setError("An error occurred during checkout. Please try again.");
      setProcessing(false);
    }
  };

  const totalAmount = getTotalCartAmount();

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <div className="customer-info-section">
          <div className="logo-header">
            <h2>BeautyHere Checkout</h2>
          </div>

          <form onSubmit={handleFormSubmit}>
            <div className="form-section">
              <h3>Shipping Address</h3>
              <div className="input-group full-width">
                <input type="text" id="fullName" value={address.fullName} onChange={handleChange} placeholder=" " required />
                <label htmlFor="fullName">Full Name</label>
              </div>
              <div className="input-group full-width">
                <input type="text" id="address" value={address.address} onChange={handleChange} placeholder=" " required />
                <label htmlFor="address">Address</label>
              </div>
              <div className="input-row">
                <div className="input-group">
                  <input type="text" id="city" value={address.city} onChange={handleChange} placeholder=" " required />
                  <label htmlFor="city">City</label>
                </div>
                <div className="input-group">
                  <input type="text" id="postalCode" value={address.postalCode} onChange={handleChange} placeholder=" " required />
                  <label htmlFor="postalCode">Postal Code</label>
                </div>
              </div>
            </div>
                        <div className="form-section">
              <h3>Payment Information</h3>
              <p className="secure-payment-info"><FaLock /> All transactions are secure and encrypted by Stripe.</p>
              <div className="card-element-container">
                <CardElement options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }} />
              </div>
            </div>
            {error && <div className="payment-error">{error}</div>}

            <button type="submit" className="place-order-btn" disabled={processing || !stripe}>
              {processing ? 'Processing...' : `Pay $${totalAmount.toFixed(2)} and Place Order`}
            </button>
          </form>
        </div>
        <div className="order-summary-section">
          <div className="mobile-summary-header" onClick={() => setIsSummaryVisible(!isSummaryVisible)}>
            <div>
              <FaShoppingCart />
              <span>{isSummaryVisible ? 'Hide' : 'Show'} order summary</span>
            </div>
            <span>${totalAmount.toFixed(2)}</span>
          </div>
          <div className={`summary-content ${isSummaryVisible ? 'visible' : ''}`}>
            {cartItems.map((item) => (
              <div key={item.id} className="summary-item">
                <div className="item-img-container">
                  <img src={item.imageSrc} alt={item.name} />
                  <span className="item-quantity-badge">{item.quantity}</span>
                </div>
                <div className="item-details">
                  <p className="item-name">{item.name}</p>
                </div>
                <p className="item-price">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
            <hr />
            <div className="summary-total-row">
              <span>Subtotal</span>
              <span>${totalAmount.toFixed(2)}</span>
            </div>
            <div className="summary-total-row">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <hr />
            <div className="summary-total-row final-total">
              <span>Total</span>
              <span>${totalAmount.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;