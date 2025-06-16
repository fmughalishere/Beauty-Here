import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../Context/cartContext';
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaLock } from 'react-icons/fa';
import axios from 'axios';
import './Checkout.css';

const Checkout = () => {
  const { cartItems, getTotalCartAmount, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [isSummaryVisible, setIsSummaryVisible] = useState(false);

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
    console.log('Placing order with data:', { items: cartItems, amount: getTotalCartAmount(), address });

    try {
      const token = localStorage.getItem('auth-token');
      if (!token) {
        alert("Please log in to place an order.");
        navigate('/login');
        return;
      }

      const orderData = {
        items: cartItems,
        amount: getTotalCartAmount(),
        address: address,
      };

      const response = await axios.post('http://localhost:5000/api/order/place', orderData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        clearCart();
        navigate('/payment-success');
      } else {
        alert("Error placing order: " + response.data.message);
      }
    } catch (error) {
      console.error("Checkout failed:", error);
      alert("An error occurred during checkout.");
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
              <p className="secure-payment-info"><FaLock /> All transactions are secure and encrypted.</p>
              <div className="input-group full-width">
                <input type="text" id="cardName" placeholder=" " required />
                <label htmlFor="cardName">Name on Card</label>
              </div>
              <div className="input-group full-width">
                <input type="text" id="cardNumber" placeholder=" " pattern="\d{4} \d{4} \d{4} \d{4}" required />
                <label htmlFor="cardNumber">Card Number (XXXX XXXX XXXX XXXX)</label>
              </div>
              <div className="input-row">
                <div className="input-group">
                  <input type="text" id="expiry" placeholder=" " pattern="\d{2}/\d{2}" required />
                  <label htmlFor="expiry">Expiry (MM/YY)</label>
                </div>
                <div className="input-group">
                  <input type="text" id="cvv" placeholder=" " pattern="\d{3}" required />
                  <label htmlFor="cvv">CVV</label>
                </div>
              </div>
            </div>

            <button type="submit" className="place-order-btn">
              Pay ${totalAmount.toFixed(2)} and Place Order
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
