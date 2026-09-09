import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CartContext } from '../../Context/cartContext';
import { FaLeaf, FaShippingFast, FaLock, FaStar, FaMagic } from 'react-icons/fa';
import Img2 from '../../assets/main.png';
import Img3 from '../../assets/skin.jpg';
import Img4 from '../../assets/makeup.jpg';
import Img5 from '../../assets/perfumes.jpg';
import Img33 from '../../assets/n1.png';
import Img34 from '../../assets/x3.jpeg';
import Img35 from '../../assets/x22.jpeg';
import Img36 from '../../assets/x21.jpeg';
import Img37 from '../../assets/n7.jfif';
import Img38 from '../../assets/n7.png';
import user1 from '../../assets/user1.jpg'
import user2 from '../../assets/user2.jpg'; 
import user3 from '../../assets/user3.jpg'; 
import './Hero.css';

import Footer from '../Footer';

const popularProducts = [
  { id: 1, name: 'FaceWash', category: 'Skin Products', price: 10, oldPrice: 15, imageSrc: Img33 },
  { id: 2, name: 'Lip Primer', category: 'Lips Products', price: 10, oldPrice: 15, imageSrc: Img34 },
  { id: 3, name: 'Eyeliner Pencil', category: 'Eyes Products', price: 10, oldPrice: 15, imageSrc: Img35 },
  { id: 4, name: 'Nail Polish', category: 'Makeup Products', price: 10, oldPrice: 15, imageSrc: Img36 },
  { id: 5, name: 'Serum', category: 'Skim Products', price: 10, oldPrice: 15, imageSrc: Img37 },
  { id: 6, name: 'Lipstick', category: 'Makeup Products', price: 10, oldPrice: 15, imageSrc: Img38 },
];

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: "easeOut" } 
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};


const Hero = () => {
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = (product) => {
    addToCart(product);
    alert(`${product.name} has been added to the cart!`);
  };

  return (
    <>
      <section id="main">
        <motion.div 
          className="main-text"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
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
        </motion.div>
        <motion.div 
          className="main-imgs"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <img src={Img2} alt="Main banner for beauty products" />
        </motion.div>
      </section>
       <motion.section 
        id="features"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
      >
        <motion.div className="feature-item" variants={itemVariants}>
            <FaLeaf className="feature-icon" />
            <h3>Organic Ingredients</h3>
            <p>Made with nature's best for your skin.</p>
        </motion.div>
        <motion.div className="feature-item" variants={itemVariants}>
            <FaStar className="feature-icon" />
            <h3>Cruelty-Free</h3>
            <p>We love animals. Our products are never tested on them.</p>
        </motion.div>
        <motion.div className="feature-item" variants={itemVariants}>
            <FaShippingFast className="feature-icon" />
            <h3>Fast Shipping</h3>
            <p>Get your favorite products delivered quickly.</p>
        </motion.div>
        <motion.div className="feature-item" variants={itemVariants}>
            <FaLock className="feature-icon" />
            <h3>Secure Payments</h3>
            <p>Your transactions are safe and secure with us.</p>
        </motion.div>
      </motion.section>

      <motion.section 
        className="featured-categories"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
      >
        <motion.div className="product-grid-box product-grid-box1" variants={itemVariants}>
          <img src={Img3} alt="Skincare Collection" />
          <div className="product-grid-text">
            <strong>Complete Skincare</strong>
            <span>For a Flawless Skin</span>
            <a href="/skincare" className="btn-secondary">Explore</a>
          </div>
        </motion.div>
        <motion.div className="product-grid-box product-grid-box2" variants={itemVariants}>
          <img src={Img4} alt="Makeup Essentials" />
          <div className="product-grid-text">
            <strong>Makeup Essentials</strong>
            <span>Colors that Define You</span>
            <a href="/services" className="btn-secondary">Discover</a>
          </div>
        </motion.div>
        <motion.div className="product-grid-box product-grid-box3" variants={itemVariants}>
          <img src={Img5} alt="Luxury Perfumes" />
          <div className="product-grid-text">
            <strong>Luxury Perfumes</strong>
            <span>Scents of Elegance</span>
            <a href="/product" className="btn-secondary">Shop Now</a>
          </div>
        </motion.div>
      </motion.section>
      
      <motion.section 
        id="popular-products"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <div className="popular-heading">
          <h3>Our Popular Products</h3>
          <a href="/product">View All</a>
        </div>
        <motion.div 
          className="popular-container"
          variants={staggerContainer}
        >
          {popularProducts.map((product) => (
            <motion.div 
              key={product.id} 
              className="popular-box"
              variants={itemVariants}
              whileHover={{ y: -10, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
              transition={{ duration: 0.3 }}
            >
              <a href="/product" className="popular-box-img">
                <img src={product.imageSrc} alt={product.name} />
              </a>
              <div className="popular-box-text">
                <a href="/product">{product.name}</a>
                <span className="p-category">{product.category}</span>
                <span className="p-price">${product.price} <del>${product.oldPrice}</del></span>
              </div>
              <button className="add-to-cart" onClick={() => handleAddToCart(product)}>Add to Cart</button>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      <motion.section 
        id="promo-banner"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={sectionVariants}
      >
          <h2>Get 25% Off On Your First Order!</h2>
          <p>Use code <span className="promo-code">BEAUTY25</span> at checkout to unlock your special discount.</p>
          <a href="/product" className="btn-primary">Shop The Collection</a>
      </motion.section>

      <motion.section 
        id="testimonials"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
          <h2 className="section-title">What Our Customers Say</h2>
          <motion.div 
            className="testimonials-container"
            variants={staggerContainer}
          >
              <motion.div className="testimonial-card" variants={itemVariants}>
                  <img src={user1} alt="Customer Ayesha Khan" />
                  <p>"Absolutely in love with the quality! The foundation blends perfectly and lasts all day. Highly recommended!"</p>
                  <h4>- Ayesha Khan</h4>
              </motion.div>
              <motion.div className="testimonial-card" variants={itemVariants}>
                  <img src={user2} alt="Customer Fatima Ali" />
                  <p>"My skin has never felt better. The organic face serum is a game-changer. Plus, the delivery was super fast!"</p>
                  <h4>- Fatima Ali</h4>
              </motion.div>
              <motion.div className="testimonial-card" variants={itemVariants}>
                  <img src={user3} alt="Customer Sara Ahmed" />
                  <p>"Great products and even better customer service. I had a query and they resolved it instantly. Will shop again!"</p>
                  <h4>- Sara Ahmed</h4>
              </motion.div>
          </motion.div>
      </motion.section>
      
      <motion.section 
        id="newsletter"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={sectionVariants}
      >
          <h2>Join Our Beauty Club</h2>
          <p>Subscribe to our newsletter to get the latest updates, new arrivals, and exclusive offers.</p>
          <form className="newsletter-form">
              <input type="email" placeholder="Enter your email address" required />
              <button type="submit" className="btn-primary">Subscribe</button>
          </form>
      </motion.section>
      <Footer />
    </>
  );
};

export default Hero;