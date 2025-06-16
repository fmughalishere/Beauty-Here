import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { CartProvider } from './Context/cartContext';    
import { UserProvider } from './Context/UserContext';      
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <UserProvider>   
        <CartProvider>  
          <App />
        </CartProvider>
      </UserProvider>
  </React.StrictMode>
);
