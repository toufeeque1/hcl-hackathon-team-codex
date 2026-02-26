import React, { useEffect } from 'react';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';

import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { ToastProvider } from './context/ToastContext';

import Navbar from './components/layout/Navbar';
import AppRoutes from './routes/AppRoutes';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <ToastProvider>
          <Router>
            <ScrollToTop />
            <div className="app-container" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
              <Navbar />

              <main style={{ flex: '1 0 auto' }}>
                <AppRoutes />
              </main>

              <footer style={{ backgroundColor: 'var(--bg-card)', borderTop: '1px solid var(--border)', padding: '2rem 0', marginTop: 'auto' }}>
                <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', fontWeight: '700' }}>
                    CodeX<span style={{ color: 'var(--primary)' }}>-</span>Retail
                  </h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                    © {new Date().getFullYear()} CodeX-Retail. Built for speed and flavor.
                  </p>
                </div>
              </footer>
            </div>
          </Router>
        </ToastProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
