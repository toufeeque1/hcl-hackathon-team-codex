import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu as MenuIcon, X, LogOut, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';

const Navbar = () => {
    const { user, logout } = useAuth();
    const { cartCount } = useCart();
    const { addToast } = useToast();
    const navigate = useNavigate();
    const location = useLocation();

    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        logout();
        addToast('Logged out successfully', 'success');
        navigate('/');
        setMobileMenuOpen(false);
    };

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Menu', path: '/menu' },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <header className={`navbar ${isScrolled ? 'scrolled glass' : ''}`} style={{
            position: 'fixed',
            top: 0,
            width: '100%',
            zIndex: 50,
            transition: 'all 0.3s ease',
            borderBottom: isScrolled ? '1px solid var(--border)' : '1px solid transparent',
            padding: '1rem 0',
            backgroundColor: isScrolled ? 'rgba(10, 10, 10, 0.8)' : 'var(--bg-dark)'
        }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

                {/* Logo */}
                <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', zIndex: 60 }} onClick={() => setMobileMenuOpen(false)}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'linear-gradient(135deg, var(--primary) 0%, #FF9B9F 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                        <ShoppingBag size={20} />
                    </div>
                    <span style={{ fontSize: '1.25rem', fontWeight: '700', letterSpacing: '-0.025em' }}>
                        CodeX<span style={{ color: 'var(--primary)' }}>-</span>Retail
                    </span>
                </Link>

                {/* Desktop Nav */}
                <nav style={{ display: 'none' }} className="desktop-nav">
                    <ul style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                        {navLinks.map((link) => (
                            <li key={link.name}>
                                <Link
                                    to={link.path}
                                    style={{
                                        fontWeight: '500',
                                        color: isActive(link.path) ? 'var(--primary)' : 'var(--text-muted)',
                                        transition: 'color 0.2s ease'
                                    }}
                                    onMouseEnter={(e) => {
                                        if (!isActive(link.path)) e.target.style.color = 'var(--text-main)';
                                    }}
                                    onMouseLeave={(e) => {
                                        if (!isActive(link.path)) e.target.style.color = 'var(--text-muted)';
                                    }}
                                >
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Right Actions */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', zIndex: 60 }}>
                    <Link to="/cart" className="cart-btn" style={{ position: 'relative', padding: '0.5rem', color: 'var(--text-main)' }}>
                        <ShoppingBag size={22} />
                        {cartCount > 0 && (
                            <span style={{
                                position: 'absolute',
                                top: '-2px',
                                right: '-5px',
                                backgroundColor: 'var(--primary)',
                                color: 'white',
                                fontSize: '0.7rem',
                                fontWeight: 'bold',
                                width: '18px',
                                height: '18px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: '50%',
                                border: '2px solid var(--bg-dark)'
                            }}>
                                {cartCount}
                            </span>
                        )}
                    </Link>

                    <div className="desktop-nav">
                        {user ? (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <span className="badge badge-success" style={{ backgroundColor: 'rgba(255, 90, 95, 0.1)', color: 'var(--primary)', border: 'none' }}>
                                    <User size={14} style={{ marginRight: '4px' }} /> {user.name.split(' ')[0]}
                                </span>
                                <button onClick={handleLogout} className="btn-outline" style={{ padding: '0.5rem', borderRadius: '8px', color: 'var(--text-muted)' }} title="Logout">
                                    <LogOut size={18} />
                                </button>
                            </div>
                        ) : (
                            <Link to="/login" className="btn btn-primary" style={{ padding: '0.5rem 1.25rem', fontSize: '0.9rem' }}>
                                Login
                            </Link>
                        )}
                    </div>

                    <button
                        className="mobile-toggle"
                        style={{ display: 'none', color: 'var(--text-main)', padding: '0.5rem' }}
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="mobile-menu glass" style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100vh',
                    backgroundColor: 'rgba(10, 10, 10, 0.95)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '2rem',
                    zIndex: 40
                }}>
                    <ul style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center', textAlign: 'center' }}>
                        {navLinks.map((link) => (
                            <li key={link.name}>
                                <Link
                                    to={link.path}
                                    style={{ fontSize: '1.5rem', fontWeight: '600', color: isActive(link.path) ? 'var(--primary)' : 'var(--text-main)' }}
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                        {user ? (
                            <>
                                <li>
                                    <span style={{ fontSize: '1.25rem', color: 'var(--text-muted)' }}>Hi, {user.name}</span>
                                </li>
                                <li>
                                    <button onClick={handleLogout} className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <LogOut size={18} /> Logout
                                    </button>
                                </li>
                            </>
                        ) : (
                            <li>
                                <Link to="/login" className="btn btn-primary" onClick={() => setMobileMenuOpen(false)}>
                                    Login / Register
                                </Link>
                            </li>
                        )}
                    </ul>
                </div>
            )}

            <style>{`
        @media (min-width: 768px) {
          .desktop-nav { display: flex !important; }
        }
        @media (max-width: 767px) {
          .mobile-toggle { display: block !important; }
        }
      `}</style>
        </header>
    );
};

export default Navbar;
