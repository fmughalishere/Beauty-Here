import React, { useState, useEffect, useContext } from 'react';
import { CartContext } from '../../Context/cartContext'; 
import './Makeup.css';
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
    <div className="makeup-page">
      <header className="makeup-header">
        <div className="header-overlay">
          <h1>Unleash Your Inner Artist</h1>
          <p>Discover our vibrant collection of makeup to express your unique style.</p>
        </div>
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
      <main className="makeup-grid-container">
        {products.length > 0 ? (
          <div className="makeup-grid">
            {products.map((product) => (
              <div key={product.id} className="makeup-product-card">
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
              </div>
            ))}
          </div>
        ) : (
          <div className="no-products-found">
            <p>No products found for "{activeFilter}" category.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Makeup;