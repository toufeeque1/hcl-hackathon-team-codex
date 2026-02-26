import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { UserPlus } from 'lucide-react';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const { register } = useAuth();
    const { addToast } = useToast();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !email || !password) {
            addToast('Please fill in all fields', 'error');
            return;
        }

        setLoading(true);
        try {
            await register(name, email, password);
            addToast('Account created successfully!', 'success');
            navigate('/');
        } catch (err) {
            addToast('Registration failed', 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh', paddingTop: '80px' }}>
            <div className="card glass animate-fade" style={{ width: '100%', maxWidth: '400px', padding: '2.5rem', borderTop: '4px solid var(--secondary)' }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Create Account</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Join us for delicious meals</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label className="input-label" htmlFor="name">Full Name</label>
                        <input
                            id="name"
                            type="text"
                            className="input-field"
                            placeholder="John Doe"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="input-group">
                        <label className="input-label" htmlFor="email">Email Address</label>
                        <input
                            id="email"
                            type="email"
                            className="input-field"
                            placeholder="user@example.com"
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
                        style={{ width: '100%', marginTop: '1rem', padding: '0.875rem', backgroundColor: 'var(--secondary)' }}
                        disabled={loading}
                    >
                        {loading ? <span className="spinner" style={{ width: '20px', height: '20px', borderWidth: '2px' }}></span> : (
                            <>
                                <UserPlus size={20} />
                                Sign Up
                            </>
                        )}
                    </button>
                </form>

                <div style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                    Already have an account? <Link to="/login" style={{ color: 'var(--secondary)', fontWeight: '600' }}>Sign in</Link>
                </div>
            </div>
        </div>
    );
};

export default Register;
