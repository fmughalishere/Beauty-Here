import React, { useState, useContext } from 'react';
import './Login.css';
import axios from 'axios';
import { UserContext } from '../Context/UserContext';
import { CartContext } from '../Context/cartContext';
import { useNavigate } from 'react-router-dom';
import loginBg from '../assets/login-banner.png';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { login } = useContext(UserContext);
  const { setUserEmail } = useContext(CartContext);
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [agreed, setAgreed] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!agreed) {
      setError("Please agree to the terms and policy.");
      return;
    }

    if (isLogin) {
      if (!email || !password) {
        setError("Please enter both email and password.");
        return;
      }

      try {
        const res = await axios.post('http://localhost:5000/api/user/login', { email, password });

        login(res.data, res.data.token); 
        setUserEmail(res.data.email);
        navigate('/profile');
      } catch (err) {
        setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
      }

    } else {
      if (!name || !email || !password) {
        setError("Please fill in all fields.");
        return;
      }

      try {
        const res = await axios.post('http://localhost:5000/api/user/register', { name, email, password });

        login(res.data, res.data.token); 
        setUserEmail(res.data.email);
        navigate('/');
      } catch (err) {
        setError(err.response?.data?.message || 'Signup failed. Please try again.');
      }
    }
  };

  return (
    <div className='auth-page'>
      <div className="auth-container">
        <div className="auth-panel" style={{ backgroundImage: `url(${loginBg})` }}>
          <div className="panel-overlay">
            <h2>Welcome to BeautyHere</h2>
            <p>Your journey to radiant beauty begins here. Log in or create an account to get started.</p>
          </div>
        </div>

        <div className="auth-form-container">
          <form className="auth-form" onSubmit={handleSubmit}>
            <h1>{isLogin ? 'Welcome Back!' : 'Create Your Account'}</h1>
            <p className="form-subtitle">
              {isLogin ? 'Log in to continue your beauty journey.' : 'Join us and discover a world of beauty.'}
            </p>

            {!isLogin && (
              <div className="input-group">
                <input id="name" type="text" placeholder=" " value={name} onChange={e => setName(e.target.value)} required />
                <label htmlFor="name">Your Name</label>
              </div>
            )}

            <div className="input-group">
              <input id="email" type="email" placeholder=" " value={email} onChange={e => setEmail(e.target.value)} required />
              <label htmlFor="email">Your Email</label>
            </div>

            <div className="input-group">
              <input id="password" type="password" placeholder=" " value={password} onChange={e => setPassword(e.target.value)} required />
              <label htmlFor="password">Your Password</label>
            </div>

            {error && <p className="auth-error">{error}</p>}

            <div className="auth-agree">
              <input id="agree" type="checkbox" checked={agreed} onChange={() => setAgreed(!agreed)} />
              <label htmlFor="agree">By continuing, I agree to the <a href="#">terms of use</a> & <a href="#">privacy policy</a>.</label>
            </div>

            <button type="submit" className="auth-button">
              {isLogin ? 'Login' : 'Create Account'}
            </button>

            <p className="auth-switch">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <span onClick={() => { setIsLogin(!isLogin); setError(''); }}>
                {isLogin ? 'Sign Up' : 'Log In'}
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
