import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from '../pages/Home';
import Menu from '../pages/Menu';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Cart from '../pages/Cart';
import Checkout from '../pages/Checkout';

import ProtectedRoute from '../components/shared/ProtectedRoute';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected Routes */}
            <Route
                path="/cart"
                element={
                    <ProtectedRoute>
                        <Cart />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/checkout"
                element={
                    <ProtectedRoute>
                        <Checkout />
                    </ProtectedRoute>
                }
            />

            {/* Fallback 404 */}
            <Route
                path="*"
                element={
                    <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '80vh', textAlign: 'center' }}>
                        <h1 className="gradient-text" style={{ fontSize: '4rem', marginBottom: '1rem' }}>404</h1>
                        <h2 style={{ marginBottom: '2rem' }}>Page Not Found</h2>
                        <p style={{ color: 'var(--text-muted)' }}>The page you are looking for doesn't exist.</p>
                    </div>
                }
            />
        </Routes>
    );
};

export default AppRoutes;
