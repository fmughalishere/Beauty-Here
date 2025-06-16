import React, { useState, useEffect, useContext } from 'react';
import { CartContext } from '../Context/cartContext'; 
import './Haircare.css';
import haircare1 from '../assets/shampoo.jpg';
import haircare2 from '../assets/conditioner.jpg';
import haircare3 from '../assets/serum.jpg';
import haircare4 from '../assets/oil.jpg';
import haircare5 from '../assets/mask.jpg';
import haircare6 from '../assets/hair shampoo.jpg';
import haircare7 from '../assets/haircond.jpg';
import haircare8 from '../assets/hairoil.jpg';

const allHaircareProducts = [
  { id: 30, name: 'Argan Oil Repair Shampoo', category: 'Shampoo', price: 25, imageSrc: haircare1 },
  { id: 31, name: 'Keratin Smooth Conditioner', category: 'Conditioner', price: 28, imageSrc: haircare2 },
  { id: 32, name: 'Anti-Frizz Hair Serum', category: 'Serum', price: 30, imageSrc: haircare3 },
  { id: 33, name: 'Herbal Strengthening Oil', category: 'Oil', price: 22, imageSrc: haircare4 },
  { id: 34, name: 'Deep Hydration Hair Mask', category: 'Mask', price: 35, imageSrc: haircare5 },
  { id: 35, name: 'Sulfate-Free Volume Shampoo', category: 'Shampoo', price: 27, imageSrc: haircare6 },
  { id: 36, name: 'Coconut Milk Conditioner', category: 'Conditioner', price: 26, imageSrc: haircare7 },
  { id: 37, name: 'Almond & Amla Hair Oil', category: 'Oil', price: 20, imageSrc: haircare8 },
];

const Haircare = () => {
  const { addToCart } = useContext(CartContext);
  const [products, setProducts] = useState(allHaircareProducts);
  const [activeFilter, setActiveFilter] = useState('All');
  const [sortType, setSortType] = useState('default');
  useEffect(() => {
    let filteredProducts = [...allHaircareProducts];

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

  const haircareCategories = ['All', 'Shampoo', 'Conditioner', 'Serum', 'Oil', 'Mask'];

  return (
    <div className="haircare-page">
      <header className="haircare-header">
        <div className="header-overlay">
          <h1>Love is in the Hair</h1>
          <p>Discover professional haircare products for salon-quality results at home.</p>
        </div>
      </header>
      <section className="controls-section">
        <div className="filter-controls">
          <div className="filter-buttons">
            {haircareCategories.map(category => (
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
      <main className="haircare-grid-container">
        {products.length > 0 ? (
          <div className="haircare-grid">
            {products.map((product) => (
              <div key={product.id} className="haircare-product-card">
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

export default Haircare;