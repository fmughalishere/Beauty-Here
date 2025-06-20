import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { CartProvider } from './Context/cartContext';    
import { UserProvider } from './Context/UserContext';      
import './index.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe('pk_test_51RbnfWPnrhQzQkBVA0YDo1uCiHIDcCP55IvhnuNnQ5rlSmBW72n7dwPLjCzkD67FGj0MDB2766IVN0KHyqYoSurW00vjqv54PG');

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Elements stripe={stripePromise}>
      <UserProvider>   
        <CartProvider> 
          <GoogleOAuthProvider clientId="612684450723-fp4flbm1firicar0r9n1c0qt7ggnt42g.apps.googleusercontent.com">
          <App />
          </GoogleOAuthProvider> 
        </CartProvider>
      </UserProvider>
      </Elements>
  </React.StrictMode>
);
