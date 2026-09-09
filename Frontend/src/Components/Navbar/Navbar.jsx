import React, { useState, useContext, useRef, useEffect } from 'react';
import './Navbar.css';
import logo from '../../assets/Beauty Here.png';
import cartIcon from '../../assets/cart_icon.png';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';
import { CartContext } from '../../Context/cartContext';
import { FaUser, FaBars, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { resolveImageUrl } from '../../api/config';

const dropdownVariants = {
  hidden: { opacity: 0, y: -10, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.2, ease: 'easeOut' } },
  exit: { opacity: 0, y: -10, scale: 0.95, transition: { duration: 0.15, ease: 'easeIn' } },
};

const mobileMenuVariants = {
  closed: { x: '-100%', transition: { duration: 0.4, ease: 'easeInOut' } },
  open: { x: 0, transition: { duration: 0.4, ease: 'easeInOut', staggerChildren: 0.05 } },
};

const mobileMenuItemVariants = {
  closed: { opacity: 0, x: -20 },
  open: { opacity: 1, x: 0 },
};

const cartCountVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { type: 'spring', stiffness: 500, damping: 20 } },
  exit: { scale: 0, opacity: 0 },
};

const Navbar = () => {
  const { user, setUser } = useContext(UserContext);
  const { cartItems, clearCart, setUserEmail } = useContext(CartContext);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  const dropdownRef = useRef(null);

  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowUserDropdown(false); 
      }
    };

    if (showUserDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showUserDropdown]); 


  const logout = () => {
    clearCart();
    setUser(null);
    setUserEmail(null);
    setShowUserDropdown(false);
    navigate('/login');
  };

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="nav-logo" onClick={handleLinkClick}>
          <img src={logo} alt="Beauty Here Logo" />
          <p>BeautyHere</p>
        </Link>

        <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.ul
              className="nav-menu"
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              {[
                { label: 'Home', path: '/' },
                { label: 'All Products', path: '/product' },
                { label: 'Skincare', path: '/product?category=Skincare' },
                { label: 'Makeup', path: '/product?category=Makeup' },
                { label: 'Haircare', path: '/product?category=Haircare' },
                { label: 'Fragrance', path: '/product?category=Fragrance' },
                { label: 'Services', path: '/services' },
                { label: 'About', path: '/about' },
              ].map(({ label, path }) => (
                  <motion.li
                    key={label}
                    className={isActive(path.split('?')[0]) ? 'nav-item active' : 'nav-item'}
                    variants={mobileMenuItemVariants}
                  >
                    <Link to={path} onClick={handleLinkClick}>{label}</Link>
                  </motion.li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
        
        <ul className='nav-menu-desktop'>
          <li className={isActive('/') ? 'nav-item active' : 'nav-item'}>
            <Link to="/">Home</Link>
          </li>
          <li className={isActive('/product') ? 'nav-item active' : 'nav-item'}>
            <Link to="/product">All Products</Link>
          </li>
          <li className="nav-item nav-item-dropdown">
            <span>Shop by Category</span>
            <div className="nav-dropdown-menu">
              <Link to="/product?category=Skincare">Skincare</Link>
              <Link to="/product?category=Makeup">Makeup</Link>
              <Link to="/product?category=Haircare">Haircare</Link>
              <Link to="/product?category=Fragrance">Fragrance</Link>
              <Link to="/product?category=Nails">Nails</Link>
            </div>
          </li>
          <li className={isActive('/services') ? 'nav-item active' : 'nav-item'}>
            <Link to="/services">Services</Link>
          </li>
           <li className={isActive('/about') ? 'nav-item active' : 'nav-item'}>
            <Link to="/about" >About</Link>
          </li>
        </ul>

        <div className="nav-login-cart">
          {user && user.role?.toLowerCase() === 'admin' && (
            <Link to="/admin" className="nav-button admin-button">
              Admin
            </Link>
          )}

          {user ? (
            <div className="user-dropdown" ref={dropdownRef}>
              <motion.div 
                className="nav-user-avatar-container" 
                onClick={() => setShowUserDropdown(!showUserDropdown)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {user && user.avatar ? (
                  <img src={resolveImageUrl(user.avatar)} alt="User Avatar" className="nav-user-avatar" />
                ) : (
                  <FaUser className="user-icon" />
                )}
              </motion.div>

              <AnimatePresence>
                {showUserDropdown && (
                  <motion.div
                    className="dropdown-menu"
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <Link to="/profile" onClick={() => setShowUserDropdown(false)}>My Account</Link>
                    <button onClick={logout}>Logout</button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Link to="/login" className="nav-button login-button">
              Login
            </Link>
          )}

          <Link to="/cart" className="cart-link">
            <img src={cartIcon} alt="Cart" />
            <AnimatePresence>
              {cartItems.length > 0 && (
                <motion.div
                  className="nav-cart-count"
                  key={cartItems.length} 
                  variants={cartCountVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  {cartItems.length}
                </motion.div>
              )}
            </AnimatePresence>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;