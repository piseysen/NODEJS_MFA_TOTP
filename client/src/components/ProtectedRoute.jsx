import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSession } from '../context/SessionContext';

const ProtectedRoute = () => {
    const {isLoggedIn, loading} = useSession();

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!isLoggedIn) {
        return <Navigate to="/login" />;
    }
    return <Outlet />;
};

export default ProtectedRoute;