import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../Context/cartContext';
import { FaLeaf, FaShippingFast, FaLock, FaStar, FaMagic } from 'react-icons/fa';
import { CiInstagram, CiLinkedin, CiMail, CiTwitter } from 'react-icons/ci';
import Img1 from '../assets/Beauty Here.png';
import Img2 from '../assets/main.png';
import Img3 from '../assets/skin.jpg';
import Img4 from '../assets/makeup.jpg';
import Img5 from '../assets/perfumes.jpg';
import Img33 from '../assets/n1.png';
import Img34 from '../assets/x3.jpeg';
import Img35 from '../assets/x22.jpeg';
import Img36 from '../assets/x21.jpeg';
import Img37 from '../assets/n7.jfif';
import Img38 from '../assets/n7.png';
import user1 from '../assets/user1.jpg'
import user2 from '../assets/user2.jpg'; 
import user3 from '../assets/user3.jpg'; 

import './Hero.css';
const popularProducts = [
  { id: 1, name: 'FaceWash', category: 'Skin Products', price: 10, oldPrice: 15, imageSrc: Img33 },
  { id: 2, name: 'Lip Primer', category: 'Lips Products', price: 10, oldPrice: 15, imageSrc: Img34 },
  { id: 3, name: 'Eyeliner Pencil', category: 'Eyes Products', price: 10, oldPrice: 15, imageSrc: Img35 },
  { id: 4, name: 'Nail Polish', category: 'Makeup Products', price: 10, oldPrice: 15, imageSrc: Img36 },
  { id: 5, name: 'Serum', category: 'Skim Products', price: 10, oldPrice: 15, imageSrc: Img37 },
  { id: 6, name: 'Lipstick', category: 'Makeup Products', price: 10, oldPrice: 15, imageSrc: Img38 },
];

const Hero = () => {
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = (product) => {
    addToCart(product);
    alert(`${product.name} has been added to the cart!`);
  };

  return (
    <>
      <section id="main">
        <div className="main-text">
          <span>New Collection 2025</span>
          <h1>Elegance in <font>Every Bottle</font></h1>
          <p>Discover your glow with our premium beauty products — designed to enhance your natural beauty and style. Glow karein apni khoobsurti ke saath.</p>
          <div className="main-buttons">
            <Link to="/product" className="btn-primary">Shop Now</Link>
            <Link to="/ai-assistant" className="btn-ai">
              <FaMagic className="ai-icon" />
              Virtual Try-On
            </Link>
          </div>
        </div>
        <div className="main-imgs">
          <img src={Img2} alt="Main banner for beauty products" />
        </div>
      </section>
      <section id="features">
        <div className="feature-item">
            <FaLeaf className="feature-icon" />
            <h3>Organic Ingredients</h3>
            <p>Made with nature's best for your skin.</p>
        </div>
        <div className="feature-item">
            <FaStar className="feature-icon" />
            <h3>Cruelty-Free</h3>
            <p>We love animals. Our products are never tested on them.</p>
        </div>
        <div className="feature-item">
            <FaShippingFast className="feature-icon" />
            <h3>Fast Shipping</h3>
            <p>Get your favorite products delivered quickly.</p>
        </div>
        <div className="feature-item">
            <FaLock className="feature-icon" />
            <h3>Secure Payments</h3>
            <p>Your transactions are safe and secure with us.</p>
        </div>
      </section>
            <section className="featured-categories">
        <div className="product-grid-box product-grid-box1">
          <img src={Img3} alt="Skincare Collection" />
          <div className="product-grid-text">
            <strong>Complete Skincare</strong>
            <span>For a Flawless Skin</span>
            <a href="/skincare" className="btn-secondary">Explore</a>
          </div>
        </div>
        <div className="product-grid-box product-grid-box2">
          <img src={Img4} alt="Makeup Essentials" />
          <div className="product-grid-text">
            <strong>Makeup Essentials</strong>
            <span>Colors that Define You</span>
            <a href="/services" className="btn-secondary">Discover</a>
          </div>
        </div>
        <div className="product-grid-box product-grid-box3">
          <img src={Img5} alt="Luxury Perfumes" />
          <div className="product-grid-text">
            <strong>Luxury Perfumes</strong>
            <span>Scents of Elegance</span>
            <a href="/product" className="btn-secondary">Shop Now</a>
          </div>
        </div>
      </section>
      <section id="popular-products">
        <div className="popular-heading">
          <h3>Our Popular Products</h3>
          <a href="/product">View All</a>
        </div>
        <div className="popular-container">
          {popularProducts.map((product) => (
            <div key={product.id} className="popular-box">
              <a href="/product" className="popular-box-img">
                <img src={product.imageSrc} alt={product.name} />
              </a>
              <div className="popular-box-text">
                <a href="/product">{product.name}</a>
                <span className="p-category">{product.category}</span>
                <span className="p-price">${product.price} <del>${product.oldPrice}</del></span>
              </div>
              <button className="add-to-cart" onClick={() => handleAddToCart(product)}>Add to Cart</button>
            </div>
          ))}
        </div>
      </section>
            <section id="promo-banner">
          <h2>Get 25% Off On Your First Order!</h2>
          <p>Use code <span className="promo-code">BEAUTY25</span> at checkout to unlock your special discount.</p>
          <a href="/product" className="btn-primary">Shop The Collection</a>
      </section>
      <section id="testimonials">
          <h2 className="section-title">What Our Customers Say</h2>
          <div className="testimonials-container">
              <div className="testimonial-card">
                  <img src={user1} alt="Customer Ayesha Khan" />
                  <p>"Absolutely in love with the quality! The foundation blends perfectly and lasts all day. Highly recommended!"</p>
                  <h4>- Ayesha Khan</h4>
              </div>
              <div className="testimonial-card">
                  <img src={user2} alt="Customer Fatima Ali" />
                  <p>"My skin has never felt better. The organic face serum is a game-changer. Plus, the delivery was super fast!"</p>
                  <h4>- Fatima Ali</h4>
              </div>
              <div className="testimonial-card">
                  <img src={user3} alt="Customer Sara Ahmed" />
                  <p>"Great products and even better customer service. I had a query and they resolved it instantly. Will shop again!"</p>
                  <h4>- Sara Ahmed</h4>
              </div>
          </div>
      </section>
      <section id="newsletter">
          <h2>Join Our Beauty Club</h2>
          <p>Subscribe to our newsletter to get the latest updates, new arrivals, and exclusive offers.</p>
          <form className="newsletter-form">
              <input type="email" placeholder="Enter your email address" required />
              <button type="submit" className="btn-primary">Subscribe</button>
          </form>
      </section>
      <footer>
        <div className="footer-container">
          <div className="footer-company-box">
            <a href="/" className="footer-logo"><img src={Img1} alt="Logo" height={35} width={75} /></a>
            <p>Enhancing your natural beauty with products that care. Premium quality, cruelty-free, and made with love.</p>
            <div className="footer-social">
              <a href="https://x.com/merndevfiza01" aria-label="Twitter"><CiTwitter /></a>
              <a href="https://www.instagram.com/mern_dev_fiza/" aria-label="Instagram"><CiInstagram /></a>
              <a href="https://www.linkedin.com/in/fizza-aa054a316/" aria-label="LinkedIn"><CiLinkedin /></a>
              <a href="fizamuneer0101@gmail.com" aria-label="Email"><CiMail /></a>
            </div>
          </div>
          <div className="footer-link-box">
            <strong>Shop</strong>
            <ul>
              <li><a href="/skincare">Skincare</a></li>
              <li><a href="/makeup">Makeup</a></li>
              <li><a href="/haircare">Haircare</a></li>
              <li><a href="/fragrance">Fragrances</a></li>
            </ul>
          </div>
          <div className="footer-link-box">
            <strong>About Us</strong>
            <ul>
              <li><a href="/about">Our Story</a></li>
              <li><a href="/about">Careers</a></li>
              <li><a href="/about">Press</a></li>
              <li><a href="/about">Contact Us</a></li>
            </ul>
          </div>
          <div className="footer-link-box">
            <strong>Help</strong>
            <ul>
              <li><a href="/">FAQs</a></li>
              <li><a href="/cart">Shipping</a></li>
              <li><a href="/cart">Returns</a></li>
              <li><a href="/cart">Track Order</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span className="copyright">© {new Date().getFullYear()} fmughalishere | All Rights Reserved.</span>
          <span className="footer-owner">Made with ❤️ by Fizza Muneer</span>
        </div>
      </footer>
    </>
  );
};

export default Hero;