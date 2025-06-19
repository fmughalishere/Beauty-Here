import React, { useState, useEffect, useContext } from 'react';
import { CartContext } from '../../Context/cartContext';
import './ProductsPage.css';
import axios from 'axios';
import n1 from '../../assets/n1.png';
import n2 from '../../assets/n2.png';
import n3 from '../../assets/n3.png';
import n4 from '../../assets/n4.png';
import n5 from '../../assets/n5.png';
import n6 from '../../assets/n6.png';
import n8 from '../../assets/n8.png';
import n9 from '../../assets/n9.png';
import n10 from '../../assets/n10.png';
import serum from '../../assets/serum.jpg';
import skin from '../../assets/skin.jpg';
import s1 from '../../assets/s1.jpg';
import lipsticks from '../../assets/lip-sticks.webp';
import eyeshadows from '../../assets/eyeshades.jpg';
import mascara from '../../assets/mascara.jpg';
import foundation from '../../assets/foundation.avif';
import blush from '../../assets/blush.jpg';
import hairshampoo from '../../assets/hair shampoo.jpg';
import haircond from '../../assets/haircond.jpg';
import hairoil from '../../assets/hairoil.jpg';
import hairmask from '../../assets/mask.jpg';
import perfume from '../../assets/perfume.jpg';
import cologne from '../../assets/cologne.jpg';
import mist from '../../assets/mist.jpg';
import unisex from '../../assets/unisex.jpg';

const staticProducts = [
  { id: 101, name: 'Gentle Cleansing Facewash', category: 'Skincare', price: 18, imageSrc: n1 },
  { id: 102, name: 'Hydrating Face Cream', category: 'Skincare', price: 22, imageSrc: n2 },
  { id: 103, name: 'Vitamin C Brightening Serum', category: 'Skincare', price: 35, imageSrc: serum },
  { id: 104, name: 'Exfoliating Scrub', category: 'Skincare', price: 19, imageSrc: skin },
  { id: 105, name: 'Soothing Green Lotion', category: 'Skincare', price: 28, imageSrc: s1 },
  { id: 106, name: 'Nourishing Night Cream', category: 'Skincare', price: 32, imageSrc: n8 },
  { id: 107, name: 'Clarifying Toner', category: 'Skincare', price: 17, imageSrc: n9 },
  { id: 201, name: 'Matte Lipstick Set (5-in-1)', category: 'Makeup', price: 45, imageSrc: lipsticks },
  { id: 202, name: 'Vibrant Eyeshadow Palette', category: 'Makeup', price: 40, imageSrc: eyeshadows },
  { id: 203, name: 'Lengthening Mascara', category: 'Makeup', price: 15, imageSrc: mascara },
  { id: 204, 'name': 'Full Coverage Foundation', category: 'Makeup', price: 38, imageSrc: foundation },
  { id: 205, name: 'Rosy Cheeks Blush', category: 'Makeup', price: 20, imageSrc: blush },
  { id: 206, name: 'Pan Cake Face Powder', category: 'Makeup', price: 12, imageSrc: n10 },
  { id: 207, name: 'EyeLashes Extension Kit', category: 'Makeup', price: 25, imageSrc: n5 },
  { id: 301, name: 'Glossy Red Nail Polish', category: 'Nails', price: 8, imageSrc: n4 },
  { id: 302, name: 'Quick-Dry Top Coat', category: 'Nails', price: 10, imageSrc: n6 },
  { id: 303, name: 'Nails Extension', category: 'Nails', price: 10, imageSrc: n3 },
  { id: 401, name: 'Nourishing Shampoo', category: 'Haircare', price: 24, imageSrc: hairshampoo },
  { id: 402, name: 'Silky Smooth Conditioner', category: 'Haircare', price: 26, imageSrc: haircond },
  { id: 403, name: 'Revitalizing Hair Oil', category: 'Haircare', price: 30, imageSrc: hairoil },
  { id: 404, name: 'Intensive Repair Hair Mask', category: 'Haircare', price: 35, imageSrc: hairmask },
  { id: 501, name: 'Floral Eau de Parfum', category: 'Fragrance', price: 80, imageSrc: perfume },
  { id: 502, name: 'Woody Cologne for Men', category: 'Fragrance', price: 75, imageSrc: cologne },
  { id: 503, name: 'Refreshing Body Mist', category: 'Fragrance', price: 25, imageSrc: mist },
  { id: 504, name: 'Elegant Unisex Perfume', category: 'Fragrance', price: 88, imageSrc: unisex },
];


const ProductsPage = () => {
  const { addToCart } = useContext(CartContext);
  
  const [allProducts, setAllProducts] = useState([]);
  
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortType, setSortType] = useState('default');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  
  const baseURL = "http://localhost:5000/images/";

  useEffect(() => {
    const fetchAndCombineProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5000/api/product/list');
        
        let dynamicProducts = [];
        if (response.data.success) {
          dynamicProducts = response.data.data.map(product => ({
            id: product._id,
            name: product.name,
            category: product.category,
            price: product.price,
            imageSrc: baseURL + product.image 
          }));
        }

        const combinedProducts = [...staticProducts, ...dynamicProducts];
        
        setAllProducts(combinedProducts);
        setDisplayedProducts(combinedProducts);

      } catch (error) {
        console.error("Error fetching dynamic products:", error);
        setAllProducts(staticProducts);
        setDisplayedProducts(staticProducts);
      } finally {
        setLoading(false);
      }
    };

    fetchAndCombineProducts();
  }, []); 
  useEffect(() => {
    let filteredProducts = [...allProducts];

    if (searchTerm) {
      filteredProducts = filteredProducts.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (activeCategory !== 'All') {
      filteredProducts = filteredProducts.filter(p => p.category === activeCategory);
    }

    const sortedProducts = [...filteredProducts];
    if (sortType === 'price-asc') {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (sortType === 'price-desc') {
      sortedProducts.sort((a, b) => b.price - a.price);
    }
    
    setDisplayedProducts(sortedProducts);
  }, [searchTerm, activeCategory, sortType, allProducts]);

  const handleAddToCart = (product) => {
    addToCart(product);
    alert(`${product.name} has been added to the cart!`);
  };

  const categories = ['All', 'Skincare', 'Makeup', 'Haircare', 'Fragrance', 'Nails'];

  return (
    <div className="all-products-page">
      <header className="all-products-header">
        <div className="header-overlay">
          <h1>Our Entire Collection</h1>
          <p>Explore every treasure we have to offer. Your next favorite is waiting.</p>
        </div>
      </header>

      <section className="controls-section">
        <div className="filter-controls">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search for products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="filter-buttons">
            {categories.map(category => (
              <button
                key={category}
                className={activeCategory === category ? 'active' : ''}
                onClick={() => setActiveCategory(category)}
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

      <main className="products-grid-container">
        {loading ? (
          <div className="loading-spinner"></div>
        ) : displayedProducts.length > 0 ? (
          <div className="products-grid">
            {displayedProducts.map((product) => (
              <div key={product.id} className="product-card">
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
            <h2>No Products Found</h2>
            <p>Try adjusting your search or filter settings.</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default ProductsPage;