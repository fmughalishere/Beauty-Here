import { useNavigate, Link } from 'react-router-dom';
import './PaymentSuccess.css';

const PaymentSuccess = () => {
  const navigate = useNavigate();

  const orderId = Math.floor(100000 + Math.random() * 900000);

  return (
    <div className="payment-success-page">
      <div className="success-card">
        
        <div className="success-icon-wrapper">
          <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
            <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none"/>
            <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
          </svg>
        </div>

        <h1 className="success-title">Payment Successful!</h1>
        <p className="success-message">
          Thank you for your order! Your purchase has been confirmed.
          A confirmation email with your order details has been sent to you.
        </p>

        <div className="order-details-summary">
          <p><strong>Order ID:</strong> #{orderId}</p>
          <p><strong>Date:</strong> {new Date().toLocaleDateString()}</p>
        </div>

        <div className="success-actions">
          <button className="btn-secondary" onClick={() => navigate('/profile')}>
            View Order History
          </button>
          <Link to="/product" className="btn-primary">
            Continue Shopping
          </Link>
        </div>

      </div>
    </div>
  );
}

export default PaymentSuccess;