import React, { useState, useContext } from 'react';
import './Navbar.css';
import logo from '../../assets/Beauty Here.png';
import cartIcon from '../../assets/cart_icon.png';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';
import { CartContext } from '../../Context/cartContext';
import { FaUser, FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const { user, setUser } = useContext(UserContext);
  const { cartItems, clearCart, setUserEmail } = useContext(CartContext);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); 
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;

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

        <ul className={menuOpen ? 'nav-menu active' : 'nav-menu'}>
          <li className={isActive('/') ? 'nav-item active' : 'nav-item'}>
            <Link to="/" onClick={handleLinkClick}>Home</Link>
          </li>
          <li className={isActive('/skincare') ? 'nav-item active' : 'nav-item'}>
            <Link to="/skincare" onClick={handleLinkClick}>Skincare</Link>
          </li>
          <li className={isActive('/product') ? 'nav-item active' : 'nav-item'}>
            <Link to="/product" onClick={handleLinkClick}>All Products</Link>
          </li>
          <li className={isActive('/services') ? 'nav-item active' : 'nav-item'}>
            <Link to="/services" onClick={handleLinkClick}>Services</Link>
          </li>
          <li className={isActive('/makeup') ? 'nav-item active' : 'nav-item'}>
            <Link to="/makeup" onClick={handleLinkClick}>Makeup</Link>
          </li>
          <li className={isActive('/haircare') ? 'nav-item active' : 'nav-item'}>
            <Link to="/haircare" onClick={handleLinkClick}>Haircare</Link>
          </li>
          <li className={isActive('/fragrance') ? 'nav-item active' : 'nav-item'}>
            <Link to="/fragrance" onClick={handleLinkClick}>Fragrance</Link>
          </li>
          <li className={isActive('/about') ? 'nav-item active' : 'nav-item'}>
            <Link to="/about" onClick={handleLinkClick}>About</Link>
          </li>
        </ul>

        <div className="nav-login-cart">
          {user && user.role?.toLowerCase() === 'admin' && (
            <Link to="/admin" className="nav-button admin-button">
              Admin
            </Link>
          )}

          {user ? (
            <div className="user-dropdown">
              <FaUser
                className="user-icon"
                onClick={() => setShowUserDropdown(!showUserDropdown)}
              />
              {showUserDropdown && (
                <div className="dropdown-menu">
                  <Link to="/profile" onClick={() => setShowUserDropdown(false)}>My Account</Link>
                  <button onClick={logout}>Logout</button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="nav-button login-button">
              Login
            </Link>
          )}
          
          <Link to="/cart" className="cart-link">
            <img src={cartIcon} alt="Cart" />
            {cartItems.length > 0 && (
              <div className="nav-cart-count">{cartItems.length}</div>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;