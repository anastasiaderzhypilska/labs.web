import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
const userEmail = localStorage.getItem('userEmail');
const isLoggedIn = localStorage.getItem('isLoggedIn');

if (!userEmail || !isLoggedIn) {
    localStorage.removeItem('userEmail');
    localStorage.removeItem('isLoggedIn');
    return <Navigate to="/login" />;
}

return children;
};

export default ProtectedRoute;