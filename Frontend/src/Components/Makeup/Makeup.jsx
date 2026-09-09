import React, { useState, useEffect, useContext } from 'react';
import { CartContext } from '../../Context/cartContext'; 
import './Makeup.css';
import { motion, AnimatePresence } from 'framer-motion';
import Footer from '../Footer';

import makeup1 from '../../assets/lipsticks.webp';
import makeup2 from '../../assets/foundation.avif';
import makeup3 from '../../assets/eyeshadow.jpg';
import makeup4 from '../../assets/lip-sticks.webp';
import makeup5 from '../../assets/mascara.jpg';
import makeup6 from '../../assets/blush.jpg';
import makeup7 from '../../assets/liquid.webp';
import makeup8 from '../../assets/eyeshades.jpg';

const allMakeupProducts = [
  { id: 20, name: 'Velvet Matte Lipstick', category: 'Lipstick', price: 18, imageSrc: makeup1 },
  { id: 21, name: 'Flawless Finish Foundation', category: 'Foundation', price: 35, imageSrc: makeup2 },
  { id: 22, name: 'Galaxy Eyeshadow Palette', category: 'Eyeshadow', price: 45, imageSrc: makeup3 },
  { id: 23, name: 'Hydrating Shine Lipstick', category: 'Lipstick', price: 22, imageSrc: makeup4 },
  { id: 24, name: 'Volumizing Lash Mascara', category: 'Mascara', price: 15, imageSrc: makeup5 },
  { id: 25, name: 'Rose Petal Blush', category: 'Blush', price: 28, imageSrc: makeup6 },
  { id: 26, name: '24-Hour Wear Foundation', category: 'Foundation', price: 40, imageSrc: makeup7 },
  { id: 27, name: 'Desert Sunset Palette', category: 'Eyeshadow', price: 50, imageSrc: makeup8 },
];

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: "easeOut" } 
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4 } },
  exit: { opacity: 0, y: -20, scale: 0.95, transition: { duration: 0.3 } }
};

const headerTextContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5, staggerChildren: 0.3 } },
};

const headerTextItem = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
};

const Makeup = () => {
  const { addToCart } = useContext(CartContext);
  const [products, setProducts] = useState(allMakeupProducts);
  const [activeFilter, setActiveFilter] = useState('All');
  const [sortType, setSortType] = useState('default');

  useEffect(() => {
    let filteredProducts = [...allMakeupProducts];
    if (activeFilter !== 'All') {
      filteredProducts = filteredProducts.filter(p => p.category === activeFilter);
    }
    if (sortType === 'price-asc') {
      filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortType === 'price-desc') {
      filteredProducts.sort((a, b) => b.price - a.price);
    }
    setProducts(filteredProducts);
  }, [activeFilter, sortType]);


  const handleAddToCart = (product) => {
    addToCart(product);
    alert(`${product.name} has been added to the cart!`);
  };

  const makeupCategories = ['All', 'Lipstick', 'Foundation', 'Eyeshadow', 'Mascara', 'Blush'];

  return (
    <>
      <div className="makeup-page">
        <header className="makeup-header">
          <motion.div 
            className="header-overlay"
            variants={headerTextContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.h1 variants={headerTextItem}>Unleash Your Inner Artist</motion.h1>
            <motion.p variants={headerTextItem}>Discover our vibrant collection of makeup to express your unique style.</motion.p>
          </motion.div>
        </header>
        <section className="controls-section">
          <div className="filter-controls">
            <div className="filter-buttons">
              {makeupCategories.map(category => (
                <button
                  key={category}
                  className={activeFilter === category ? 'active' : ''}
                  onClick={() => setActiveFilter(category)}
                >
                  {category}
                </button>
              ))}
            </div>
            <div className="sort-dropdown">
              <select value={sortType} onChange={(e) => setSortType(e.target.value)}>
                <option value="default">Sort by: Default</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>
        </section>
        <motion.main 
          className="makeup-grid-container"
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {products.length > 0 ? (
            <motion.div 
              className="makeup-grid"
              layout 
            >
              <AnimatePresence>
                {products.map((product) => (
                  <motion.div 
                    key={product.id} 
                    className="makeup-product-card"
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    layout
                  >
                    <div className="card-img-container">
                      <img src={product.imageSrc} alt={product.name} />
                    </div>
                    <div className="card-text-content">
                      <span className="p-category">{product.category}</span>
                      <h3 className="p-name">{product.name}</h3>
                      <p className="p-price">${product.price}</p>
                    </div>
                    <button className="add-to-cart-btn" onClick={() => handleAddToCart(product)}>
                      Add to Cart
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <div className="no-products-found">
              <p>No products found for "{activeFilter}" category.</p>
            </div>
          )}
        </motion.main>
      </div>

      <Footer />
    </>
  );
};

export default Makeup;