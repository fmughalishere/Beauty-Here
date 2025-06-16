import React, { useContext, useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './profile.css';

import {
  FaUser, FaClipboardList, FaPalette, FaSignOutAlt, FaTachometerAlt,
  FaSave, FaTimes, FaCamera
} from 'react-icons/fa';

import { UserContext } from '../Context/UserContext';

const Profile = () => {
  const { user, setUser, logout: contextLogout } = useContext(UserContext);
  const navigate = useNavigate();

  const [activeSection, setActiveSection] = useState('dashboard');
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({ name: '', email: '' });
  const [orders, setOrders] = useState([]);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      setEditedUser({ name: user.name, email: user.email });

      const fetchUserOrders = async () => {
        try {
          const token = localStorage.getItem('auth-token');
          if (token) {
            const response = await axios.get('http://localhost:5000/api/order/user-orders', {
              headers: { Authorization: `Bearer ${token}` }
            });
            if (response.data.success) {
              setOrders(response.data.data);
            }
          }
        } catch (error) {
          console.error("Failed to fetch orders:", error);
        }
      };

      fetchUserOrders();
    }
  }, [user, navigate]);

  const handleLogout = () => {
    contextLogout();
    navigate('/login');
  };

  const handleChange = (e) => {
    setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('auth-token');
      if (!token) return;

      const res = await axios.put(
        'http://localhost:5000/api/user/update',
        editedUser,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setUser(res.data.user);
      setIsEditing(false);
    } catch (err) {
      console.error("Profile update failed:", err.response?.data?.message || err.message);
      alert("Failed to update profile. " + (err.response?.data?.message || "Please try again."));
    }
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <DashboardSection user={user} ordersCount={orders.length} />;
      case 'profile-settings':
        return (
          <ProfileSettingsSection
            user={user}
            isEditing={isEditing}
            editedUser={editedUser}
            handleChange={handleChange}
            handleSave={handleSave}
            setIsEditing={setIsEditing}
            setUser={setUser}
          />
        );
      case 'order-history':
        return <OrderHistorySection orders={orders} />;
      case 'appearance':
        return <AppearanceSection theme={theme} setTheme={setTheme} />;
      default:
        return <DashboardSection user={user} ordersCount={orders.length} />;
    }
  };

  if (!user) return null;

  return (
    <div className="profile-page-container">
      <div className="profile-dashboard">
        <aside className="profile-sidebar">
          <div className="sidebar-header">
            <div className="profile-avatar">
              {user.name ? user.name.charAt(0).toUpperCase() : 'F'}
            </div>
            <h3>{user.name}</h3>
            <p>{user.email}</p>
          </div>
          <nav className="sidebar-nav">
            <a onClick={() => setActiveSection('dashboard')} className={activeSection === 'dashboard' ? 'active' : ''}>
              <FaTachometerAlt /> Dashboard
            </a>
            <a onClick={() => setActiveSection('profile-settings')} className={activeSection === 'profile-settings' ? 'active' : ''}>
              <FaUser /> Profile Settings
            </a>
            <a onClick={() => setActiveSection('order-history')} className={activeSection === 'order-history' ? 'active' : ''}>
              <FaClipboardList /> Order History
            </a>
            <a onClick={() => setActiveSection('appearance')} className={activeSection === 'appearance' ? 'active' : ''}>
              <FaPalette /> Appearance
            </a>
            <a onClick={handleLogout} className="logout-btn">
              <FaSignOutAlt /> Logout
            </a>
          </nav>
        </aside>
        <main className="profile-main-content">{renderSection()}</main>
      </div>
    </div>
  );
};

const DashboardSection = ({ user, ordersCount }) => (
  <div className="dashboard-section card">
    <h2>Welcome to Your Dashboard, {user.name}!</h2>
    <p>From here, you can manage your profile, view your orders, and customize your experience.</p>
    <div className="dashboard-stats">
      <div className="stat-card">
        <h4>Total Orders</h4>
        <p>{ordersCount}</p>
      </div>
      <div className="stat-card">
        <h4>Wishlist Items</h4>
        <p>0</p>
      </div>
      <div className="stat-card">
        <h4>Last Login</h4>
        <p>Today</p>
      </div>
    </div>
  </div>
);

const ProfileSettingsSection = ({ user, isEditing, editedUser, handleChange, handleSave, setIsEditing, setUser }) => {
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState('');
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (user?.avatar) {
      setAvatarPreview(`http://localhost:5000/images/${user.avatar}`);
    }
  }, [user]);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleSaveChanges = async () => {
    if (avatarFile) {
      const formData = new FormData();
      formData.append('avatar', avatarFile);

      try {
        const token = localStorage.getItem('auth-token');
        const uploadRes = await axios.post('http://localhost:5000/api/user/upload-avatar', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
          }
        });

        if (uploadRes.data.success) {
          setUser(prevUser => ({ ...prevUser, avatar: uploadRes.data.filename }));
        }
      } catch (err) {
        console.error("Avatar upload failed:", err);
        alert("Could not upload avatar.");
        return;
      }
    }
    handleSave();
  };

  if (!user) return <div>Loading profile...</div>;

  return (
    <div className="profile-settings-section card">
      <h2>Profile Settings</h2>
      {isEditing ? (
        <div className="profile-edit-form">
          <div className="avatar-upload">
            <div className="profile-avatar-large" style={{ backgroundImage: `url(${avatarPreview})` }}>
              {!avatarPreview && user.name?.charAt(0).toUpperCase()}
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleAvatarChange}
              style={{ display: 'none' }}
              accept="image/png, image/jpeg, image/jpg"
            />
            <button className="upload-btn" onClick={handleUploadClick}>
              <FaCamera /> Change Photo
            </button>
          </div>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input id="name" type="text" name="name" value={editedUser.name || ''} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input id="email" type="email" name="email" value={editedUser.email || ''} disabled />
          </div>
          <div className="form-actions">
            <button className="save-btn" onClick={handleSaveChanges}><FaSave /> Save Changes</button>
            <button className="cancel-btn" onClick={() => setIsEditing(false)}><FaTimes /> Cancel</button>
          </div>
        </div>
      ) : (
        <div className="profile-view">
          <div className="avatar-upload">
            <div className="profile-avatar-large" style={{ backgroundImage: `url(${avatarPreview})` }}>
              {!avatarPreview && user.name?.charAt(0).toUpperCase()}
            </div>
          </div>
          <div className="info-group">
            <strong>Name:</strong>
            <p>{user.name}</p>
          </div>
          <div className="info-group">
            <strong>Email:</strong>
            <p>{user.email}</p>
          </div>
          <div className="form-actions">
            <button className="edit-btn" onClick={() => setIsEditing(true)}>Edit Profile</button>
          </div>
        </div>
      )}
    </div>
  );
};

const OrderHistorySection = ({ orders }) => (
  <div className="order-history-section card">
    <h2>Your Order History</h2>
    {orders.length > 0 ? (
      orders.map(order => (
        <div key={order._id} className="order-item">
          <div className="order-details">
            <span className="order-id">#{order._id.slice(-6)}</span>
            <span className="order-date">{new Date(order.date).toLocaleDateString()}</span>
          </div>
          <div className="order-items-summary">
            {order.items.map(item => item.name).join(', ')}
          </div>
          <div className={`order-status ${order.status.toLowerCase().replace(' ', '-')}`}>
            {order.status}
          </div>
          <div className="order-total">${order.amount.toFixed(2)}</div>
        </div>
      ))
    ) : (
      <p>You have not placed any orders yet.</p>
    )}
  </div>
);

const AppearanceSection = ({ theme, setTheme }) => (
  <div className="appearance-section card">
    <h2>Appearance Settings</h2>
    <p>Choose how BeautyHere looks to you. Select a theme below.</p>
    <div className="theme-options">
      <div className={`theme-card ${theme === 'light' ? 'active' : ''}`} onClick={() => setTheme('light')}>
        <div className="light-preview"></div>
        <h4>Light Mode</h4>
      </div>
      <div className={`theme-card ${theme === 'dark' ? 'active' : ''}`} onClick={() => setTheme('dark')}>
        <div className="dark-preview"></div>
        <h4>Dark Mode</h4>
      </div>
    </div>
  </div>
);

export default Profile;
