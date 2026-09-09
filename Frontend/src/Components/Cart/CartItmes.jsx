import React, { useContext } from 'react';
import { CartContext } from '../../Context/cartContext';
import { Link } from 'react-router-dom';
import './CartItems.css';
import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import Footer from '../Footer';
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { duration: 0.5, staggerChildren: 0.2 } 
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  exit: { opacity: 0, x: 50, transition: { duration: 0.3, ease: 'easeIn' } }
};

const summaryVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut', delay: 0.4 } }
};

const CartItems = () => {
  const { cartItems, removeFromCart, updateQuantity, getTotalCartAmount } = useContext(CartContext);

  if (cartItems.length === 0) {
    return (
      <>
        <motion.div 
          className="empty-cart-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2>Your Cart is Empty</h2>
          <p>Looks like you haven't added anything to your cart yet.</p>
          <Link to="/product" className="btn-primary">Start Shopping</Link>
        </motion.div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <motion.div 
        className="cart-page-container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="cart-items-section">
          <div className="cart-table-header">
            <p>Product</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
          </div>
          <hr />
          <AnimatePresence>
            {cartItems.map((item) => (
              <motion.div 
                key={item.id} 
                className="cart-item-row"
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                layout 
              >
                <div className="item-product">
                  <img src={item.imageSrc} alt={item.name} />
                </div>
                <p className="item-title">{item.name}</p>
                <p className="item-price">${item.price.toFixed(2)}</p>
                <div className="item-quantity">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)}><FaMinus /></button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)}><FaPlus /></button>
                </div>
                <p className="item-total">${(item.price * item.quantity).toFixed(2)}</p>
                <div className="item-remove">
                  <FaTrash className="remove-icon" onClick={() => removeFromCart(item.id)} />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <motion.div 
          className="cart-summary-section"
          variants={summaryVariants}
        >
          <div className="cart-totals">
            <h2>Cart Totals</h2>
            <div className="total-row">
              <p>Subtotal</p>
              <p>${getTotalCartAmount().toFixed(2)}</p>
            </div>
            <hr />
            <div className="total-row">
              <p>Shipping Fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="total-row total-main">
              <h3>Total</h3>
              <h3>${getTotalCartAmount().toFixed(2)}</h3>
            </div>
            <Link to="/checkout" className="checkout-btn">PROCEED TO CHECKOUT</Link>
          </div>
          
          <div className="promo-code-section">
            <p>If you have a promo code, enter it here:</p>
            <div className="promo-input">
              <input type="text" placeholder="Enter promo code" />
              <button>Submit</button>
            </div>
          </div>
        </motion.div>
      </motion.div>
            <Footer />
    </>
  );
}

export default CartItems;