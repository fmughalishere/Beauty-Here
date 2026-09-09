import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Footer.css'; 
import Img1 from '../assets/Beauty Here.png';
import { CiInstagram, CiLinkedin, CiMail, CiTwitter } from 'react-icons/ci';

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8 }}
    >
      <div className="footer-container">
        <div className="footer-company-box">
          <Link to="/" className="footer-logo">
            <img src={Img1} alt="BeautyHere Logo" />
          </Link>
          <p>Enhancing your natural beauty with products that care. Premium quality, cruelty-free, and made with love.</p>
          <div className="footer-social">
            <a href="https://x.com/merndevfiza01" aria-label="Twitter" target="_blank" rel="noopener noreferrer"><CiTwitter /></a>
            <a href="https://www.instagram.com/mern_dev_fiza/" aria-label="Instagram" target="_blank" rel="noopener noreferrer"><CiInstagram /></a>
            <a href="https://www.linkedin.com/in/fizza-aa054a316/" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer"><CiLinkedin /></a>
            <a href="mailto:fizamuneer0101@gmail.com" aria-label="Email"><CiMail /></a>
          </div>
        </div>
        <div className="footer-link-box">
          <strong>Shop</strong>
          <ul>
            <li><Link to="/skincare">Skincare</Link></li>
            <li><Link to="/makeup">Makeup</Link></li>
            <li><Link to="/haircare">Haircare</Link></li>
            <li><Link to="/fragrance">Fragrances</Link></li>
          </ul>
        </div>
        <div className="footer-link-box">
          <strong>About Us</strong>
          <ul>
            <li><Link to="/about">Our Story</Link></li>
            <li><Link to="/about">Careers</Link></li>
            <li><Link to="/about">Press</Link></li>
            <li><Link to="/about">Contact Us</Link></li>
          </ul>
        </div>
        <div className="footer-link-box">
          <strong>Help</strong>
          <ul>
            <li><Link to="/">FAQs</Link></li>
            <li><Link to="/cart">Shipping</Link></li>
            <li><Link to="/cart">Returns</Link></li>
            <li><Link to="/cart">Track Order</Link></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <span className="copyright">© {new Date().getFullYear()} fmughalishere | All Rights Reserved.</span>
        <span className="footer-owner">Made with ❤️ by Fizza Muneer</span>
      </div>
    </motion.footer>
  );
};

export default Footer;