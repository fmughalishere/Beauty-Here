import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../Context/cartContext'; 
import './SkinCare.css'; 
import bannerImg from '../../assets/skincare-banner.webp'; 
import drySkinImg from '../../assets/dryskin.jpg';
import oilySkinImg from '../../assets/oilyskin.jpg';
import sensitiveSkinImg from '../../assets/sensitiveskin.jpg';
import product1 from '../../assets/n1.png';
import product2 from '../../assets/serum.jpg';
import product3 from '../../assets/n8.png';
import product4 from '../../assets/skin.jpg';
import { motion } from 'framer-motion';
import Footer from '../Footer';

const featuredProducts = [
  { id: 101, name: 'Gentle Cleansing Facewash', price: 18, imageSrc: product1 },
  { id: 103, name: 'Vitamin C Brightening Serum', price: 35, imageSrc: product2 },
  { id: 107, name: 'Nourishing Night Cream', price: 32, imageSrc: product3 },
  { id: 105, name: 'Exfoliating Scrub', price: 19, imageSrc: product4 },
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
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
};

const headerTextContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5, staggerChildren: 0.3 } },
};

const headerTextItem = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
};

const Skincare = () => {
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = (product) => {
    addToCart(product);
    alert(`${product.name} has been added to the cart!`);
  };

  return (
    // 2. Wrap the component in a React Fragment
    <>
      <div className="skincare-page">
        <header className="skincare-header">
          <div className="skincare-header-bg" style={{ backgroundImage: `url(${bannerImg})` }}></div>
          <motion.div 
            className="header-overlay"
            variants={headerTextContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.h1 variants={headerTextItem}>Your Journey to Radiant Skin</motion.h1>
            <motion.p variants={headerTextItem}>Discover dermatologist-recommended solutions for a healthy, glowing complexion.</motion.p>
          </motion.div>
        </header>

        <motion.section 
          id="shop-by-type"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="section-title">Solutions For Every Skin Type</h2>
          <motion.div 
            className="skin-type-container"
            variants={staggerContainer}
          >
            <motion.div className="skin-type-card" variants={itemVariants}>
              <img src={drySkinImg} alt="Dry Skin" />
              <div className="type-card-content">
                <h3>For Dry Skin</h3>
                <p>Hydrate and nourish with our moisture-rich formulas.</p>
                <Link to="/product?category=skincare&type=dry" className="btn-secondary">Shop Now</Link>
              </div>
            </motion.div>
            <motion.div className="skin-type-card" variants={itemVariants}>
              <img src={oilySkinImg} alt="Oily Skin" />
              <div className="type-card-content">
                <h3>For Oily Skin</h3>
                <p>Balance and purify with our lightweight, non-greasy products.</p>
                <Link to="/product?category=skincare&type=oily" className="btn-secondary">Shop Now</Link>
              </div>
            </motion.div>
            <motion.div className="skin-type-card" variants={itemVariants}>
              <img src={sensitiveSkinImg} alt="Sensitive Skin" />
              <div className="type-card-content">
                <h3>For Sensitive Skin</h3>
                <p>Soothe and protect with our gentle, fragrance-free range.</p>
                <Link to="/product?category=skincare&type=sensitive" className="btn-secondary">Shop Now</Link>
              </div>
            </motion.div>
          </motion.div>
        </motion.section>

        <motion.section 
          id="featured-skincare"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
        >
          <h2 className="section-title">Our Bestselling Skincare</h2>
          <motion.div 
            className="featured-products-grid"
            variants={staggerContainer}
          >
            {featuredProducts.map((product) => (
              <motion.div 
                key={product.id} 
                className="skincare-product-card" 
                variants={itemVariants}
              >
                <div className="card-img-container">
                  <img src={product.imageSrc} alt={product.name} />
                </div>
                <div className="card-text-content">
                  <h3 className="p-name">{product.name}</h3>
                  <p className="p-price">${product.price}</p>
                </div>
                <button className="add-to-cart-btn" onClick={() => handleAddToCart(product)}>
                  Add to Cart
                </button>
              </motion.div>
            ))}
          </motion.div>
          <div className="view-all-container">
            <Link to="/product" className="btn-primary">View All Skincare</Link>
          </div>
        </motion.section>
        
        <motion.section 
          id="routine-guide"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariants}
        >
            <h2 className="section-title">Your 3-Step Daily Ritual</h2>
            <motion.div 
              className="routine-steps-container"
              variants={staggerContainer}
            >
                <motion.div className="routine-step" variants={itemVariants}>
                    <div className="step-number">1</div>
                    <h3>Cleanse</h3>
                    <p>Start with a gentle cleanser to remove impurities and prepare your skin for treatment.</p>
                </motion.div>
                <motion.div className="routine-step" variants={itemVariants}>
                    <div className="step-number">2</div>
                    <h3>Treat</h3>
                    <p>Apply a targeted serum to address specific concerns like fine lines, dark spots, or dullness.</p>
                </motion.div>
                <motion.div className="routine-step" variants={itemVariants}>
                    <div className="step-number">3</div>
                    <h3>Moisturize</h3>
                    <p>Lock in hydration and protect your skin's barrier with a suitable moisturizer.</p>
                </motion.div>
            </motion.div>
        </motion.section>
      </div>
            <Footer />
    </>
  );
};

export default Skincare;