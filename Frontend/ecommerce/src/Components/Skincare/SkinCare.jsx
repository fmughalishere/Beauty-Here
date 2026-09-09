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

const featuredProducts = [
  { id: 101, name: 'Gentle Cleansing Facewash', price: 18, imageSrc: product1 },
  { id: 103, name: 'Vitamin C Brightening Serum', price: 35, imageSrc: product2 },
  { id: 107, name: 'Nourishing Night Cream', price: 32, imageSrc: product3 },
  { id: 105, name: 'Exfoliating Scrub', price: 19, imageSrc: product4 },
];

const SkinCare = () => {
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = (product) => {
    addToCart(product);
    alert(`${product.name} has been added to the cart!`);
  };

  return (
    <div className="skincare-page">
      <header className="skincare-header" style={{ backgroundImage: `url(${bannerImg})` }}>
        <div className="header-overlay">
          <h1>Your Journey to Radiant Skin</h1>
          <p>Discover dermatologist-recommended solutions for a healthy, glowing complexion.</p>
        </div>
      </header>

      <section id="shop-by-type">
        <h2 className="section-title">Solutions For Every Skin Type</h2>
        <div className="skin-type-container">
          <div className="skin-type-card">
            <img src={drySkinImg} alt="Dry Skin" />
            <div className="type-card-content">
              <h3>For Dry Skin</h3>
              <p>Hydrate and nourish with our moisture-rich formulas.</p>
              <Link to="/product?category=skincare&type=dry" className="btn-secondary">Shop Now</Link>
            </div>
          </div>
          <div className="skin-type-card">
            <img src={oilySkinImg} alt="Oily Skin" />
            <div className="type-card-content">
              <h3>For Oily Skin</h3>
              <p>Balance and purify with our lightweight, non-greasy products.</p>
              <Link to="/product?category=skincare&type=oily" className="btn-secondary">Shop Now</Link>
            </div>
          </div>
          <div className="skin-type-card">
            <img src={sensitiveSkinImg} alt="Sensitive Skin" />
            <div className="type-card-content">
              <h3>For Sensitive Skin</h3>
              <p>Soothe and protect with our gentle, fragrance-free range.</p>
              <Link to="/product?category=skincare&type=sensitive" className="btn-secondary">Shop Now</Link>
            </div>
          </div>
        </div>
      </section>

      <section id="featured-skincare">
        <h2 className="section-title">Our Bestselling Skincare</h2>
        <div className="featured-products-grid">
          {featuredProducts.map((product) => (
            <div key={product.id} className="skincare-product-card">
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
            </div>
          ))}
        </div>
        <div className="view-all-container">
          <Link to="/product" className="btn-primary">View All Skincare</Link>
        </div>
      </section>
      
      <section id="routine-guide">
          <h2 className="section-title">Your 3-Step Daily Ritual</h2>
          <div className="routine-steps-container">
              <div className="routine-step">
                  <div className="step-number">1</div>
                  <h3>Cleanse</h3>
                  <p>Start with a gentle cleanser to remove impurities and prepare your skin for treatment.</p>
              </div>
              <div className="routine-step">
                  <div className="step-number">2</div>
                  <h3>Treat</h3>
                  <p>Apply a targeted serum to address specific concerns like fine lines, dark spots, or dullness.</p>
              </div>
              <div className="routine-step">
                  <div className="step-number">3</div>
                  <h3>Moisturize</h3>
                  <p>Lock in hydration and protect your skin's barrier with a suitable moisturizer.</p>
              </div>
          </div>
      </section>
    </div>
  );
};

export default SkinCare;
