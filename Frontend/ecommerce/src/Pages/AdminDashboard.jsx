import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('/api/admin/dashboard', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setData(res.data))
    .catch(err => console.log(err));
  }, []);

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <p>Total Users: {data.users}</p>
      <p>Total Products: {data.products}</p>
      <p>Total Orders: {data.orders}</p>
    </div>
  );
};

export default AdminDashboard;
