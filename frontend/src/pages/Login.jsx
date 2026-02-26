import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { LogIn } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('user@hackathon.com');
    const [password, setPassword] = useState('password123');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const { addToast } = useToast();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/';

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            addToast('Please fill in all fields', 'error');
            return;
        }

        setLoading(true);
        try {
            await login(email, password);
            addToast('Welcome back!', 'success');
            navigate(from, { replace: true });
        } catch (err) {
            addToast(err.message || 'Login failed', 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh', paddingTop: '80px' }}>
            <div className="card glass animate-fade" style={{ width: '100%', maxWidth: '400px', padding: '2.5rem', borderTop: '4px solid var(--primary)' }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Welcome Back</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Sign in to continue ordering</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label className="input-label" htmlFor="email">Email Address</label>
                        <input
                            id="email"
                            type="email"
                            className="input-field"
                            placeholder="user@hackathon.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="input-group">
                        <label className="input-label" htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            className="input-field"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary"
                        style={{ width: '100%', marginTop: '1rem', padding: '0.875rem' }}
                        disabled={loading}
                    >
                        {loading ? <span className="spinner" style={{ width: '20px', height: '20px', borderWidth: '2px' }}></span> : (
                            <>
                                <LogIn size={20} />
                                Sign In
                            </>
                        )}
                    </button>
                </form>

                <div style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                    Don't have an account? <Link to="/register" style={{ color: 'var(--primary)', fontWeight: '600' }}>Create one</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
