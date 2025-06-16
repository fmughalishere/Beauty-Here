import React, { useState, useEffect, useContext } from 'react';
import { CartContext } from '../Context/cartContext'; 
import './Fragrance.css'; 
import fragrance1 from '../assets/perfume.jpg';
import fragrance2 from '../assets/cologne.jpg';
import fragrance3 from '../assets/mist.jpg';
import fragrance4 from '../assets/perfumefra.jpg';
import fragrance5 from '../assets/unisex.jpg';
import fragrance6 from '../assets/cologne.jpg';
import fragrance7 from '../assets/mist2.jpg';
import fragrance8 from '../assets/perfume3.jpg';

const allFragranceProducts = [
  { id: 40, name: 'Midnight Rose Eau de Parfum', category: 'Perfume', price: 85, imageSrc: fragrance1 },
  { id: 41, name: 'Ocean Breeze Cologne', category: 'Cologne', price: 70, imageSrc: fragrance2 },
  { id: 42, name: 'Sweet Vanilla Body Mist', category: 'Body Mist', price: 25, imageSrc: fragrance3 },
  { id: 43, name: 'Jasmine Bloom Eau de Parfum', category: 'Perfume', price: 90, imageSrc: fragrance4 },
  { id: 44, name: 'Citrus & Wood Unisex Scent', category: 'Unisex', price: 78, imageSrc: fragrance5 },
  { id: 45, name: 'Spiced Amber Cologne', category: 'Cologne', price: 75, imageSrc: fragrance6 },
  { id: 46, name: 'Fresh Lavender Body Mist', category: 'Body Mist', price: 22, imageSrc: fragrance7 },
  { id: 47, name: 'Velvet Orchid Perfume', category: 'Perfume', price: 95, imageSrc: fragrance8 },
];

const FragranceComp = () => {
  const { addToCart } = useContext(CartContext);
  const [products, setProducts] = useState(allFragranceProducts);
  const [activeFilter, setActiveFilter] = useState('All');
  const [sortType, setSortType] = useState('default');

  useEffect(() => {
    let filteredProducts = [...allFragranceProducts];

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

  const fragranceCategories = ['All', 'Perfume', 'Cologne', 'Body Mist', 'Unisex'];

  return (
    <div className="fragrance-page">
      <header className="fragrance-header">
        <div className="header-overlay">
          <h1>Find Your Signature Scent</h1>
          <p>Explore our exquisite collection of perfumes and fragrances for every occasion.</p>
        </div>
      </header>

      <section className="controls-section">
        <div className="filter-controls">
          <div className="filter-buttons">
            {fragranceCategories.map(category => (
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

      <main className="fragrance-grid-container">
        {products.length > 0 ? (
          <div className="fragrance-grid">
            {products.map((product) => (
              <div key={product.id} className="fragrance-product-card">
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

export default FragranceComp;