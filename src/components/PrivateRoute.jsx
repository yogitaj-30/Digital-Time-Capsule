import React from 'react';
import { useAuth } from '../contexts/AuthContext'
import { Navigate, useLocation } from 'react-router-dom';

function PrivateRoute({ children }) {
    const { currentUser, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <div className='text-center mt-10'>Loading...</div>
    }

    if (!currentUser) {
        return <Navigate to="/login" state={{ from: location }} replace />
    }

    return children;
}

export default PrivateRoute