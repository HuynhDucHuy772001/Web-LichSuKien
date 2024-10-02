import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    const tokenExpiration = localStorage.getItem('tokenExpiration');

    if (!token || !tokenExpiration) {
        return <Navigate to="/login" replace />;
    }

    if (new Date().getTime() > parseInt(tokenExpiration)) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('tokenExpiration');
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;