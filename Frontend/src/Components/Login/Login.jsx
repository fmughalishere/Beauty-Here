import {React, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';
import { CartContext } from '../../Context/cartContext';
import { motion, AnimatePresence } from 'framer-motion';
import Footer from '../Footer';

import './Login.css';
import loginBg from '../../assets/login-banner.png';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { GoogleLogin } from '@react-oauth/google';
import { API_BASE_URL } from '../../api/config';

const containerVariants = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } }
};

const formVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  exit: { opacity: 0, x: -20, transition: { duration: 0.3, ease: 'easeIn' } }
};

const imagePanelVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: 'easeOut' } }
};


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
  const [showPassword, setShowPassword] = useState(false);

  const handleGoogleSuccess = async (credentialResponse) => {
    const token = credentialResponse.credential;
    try {
      const res = await axios.post(`${API_BASE_URL}/api/user/google-login`, { token });
      login(res.data, res.data.token);
      setUserEmail(res.data.email);
      navigate('/profile');
    } catch (err) {
      setError(err.response?.data?.message || 'Google login failed. Please try again.');
    }
  };

  const handleGoogleError = () => {
    setError('Google login was unsuccessful. Please try again.');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!isLogin && !agreed) { 
      setError("Please agree to the terms of use & privacy policy to create an account.");
      return;
    }

    if (isLogin) {
      if (!email || !password) {
        setError("Please enter both email and password.");
        return;
      }
      try {
        const res = await axios.post(`${API_BASE_URL}/api/user/login`, { email, password });
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
        const res = await axios.post(`${API_BASE_URL}/api/user/register`, { name, email, password });
        login(res.data, res.data.token);
        setUserEmail(res.data.email);
        navigate('/'); 
      } catch (err) {
        setError(err.response?.data?.message || 'Signup failed. Please try again.');
      }
    }
  };

  return (
    <>
      <div className='auth-page'>
        <motion.div 
          className="auth-container"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div 
            className="auth-panel" 
            style={{ backgroundImage: `url(${loginBg})` }}
            variants={imagePanelVariants}
          >
            <div className="panel-overlay">
              <h2>Welcome to BeautyHere</h2>
              <p>Your journey to radiant beauty begins here. Log in or create an account to get started.</p>
            </div>
          </motion.div>

          <div className="auth-form-container">
            <AnimatePresence mode="wait">
              <motion.form 
                key={isLogin ? 'login' : 'signup'}
                className="auth-form" 
                onSubmit={handleSubmit}
                variants={formVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
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
                
                <div className="input-group password-group">
                  <input 
                    id="password" 
                    type={showPassword ? "text" : "password"} 
                    placeholder=" " 
                    value={password} 
                    onChange={e => setPassword(e.target.value)} 
                    required 
                  />
                  <label htmlFor="password">Your Password</label>
                  <div className="password-icon" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </div>
                </div>

                {error && <p className="auth-error">{error}</p>}

                {!isLogin && ( 
                  <div className="auth-agree">
                    <input id="agree" type="checkbox" checked={agreed} onChange={() => setAgreed(!agreed)} />
                    <label htmlFor="agree">By continuing, I agree to the <a href="/terms" target="_blank">terms of use</a> & <a href="/privacy" target="_blank">privacy policy</a>.</label>
                  </div>
                )}

                <button type="submit" className="auth-button">
                  {isLogin ? 'Login' : 'Create Account'}
                </button>

                <div className="divider">
                  <span>OR</span>
                </div>
                
                <div className="google-login-button">
                  <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={handleGoogleError}
                    useOneTap 
                  />
                </div>

                <p className="auth-switch">
                  {isLogin ? "Don't have an account? " : "Already have an account? "}
                  <span onClick={() => { setIsLogin(!isLogin); setError(''); }}>
                    {isLogin ? 'Sign Up' : 'Log In'}
                  </span>
                </p>
              </motion.form>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
      <Footer />
    </>
  );
};

export default Login;