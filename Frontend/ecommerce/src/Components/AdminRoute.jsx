import React, { useContext } from 'react';
import { UserContext } from '../Context/UserContext';
import { Navigate, Outlet } from 'react-router-dom';

const AdminRoute = () => {
    const { user } = useContext(UserContext);

    return user && user.role === 'admin' ? <Outlet /> : <Navigate to="/" />;
};

export default AdminRoute;