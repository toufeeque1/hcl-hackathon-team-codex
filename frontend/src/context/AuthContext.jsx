import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const savedRole = localStorage.getItem('role');

        if (token) {
            setUser({ id: 1, name: 'Demo User', email: 'user@hackathon.com' });
            setRole(savedRole || 'USER');
        }

        setLoading(false);
    }, []);

    const login = (email, password) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {

                // 👑 ADMIN LOGIN
                if (email === 'admin@hackathon.com' && password === 'admin123') {
                    const fakeToken = 'mock-admin-token';
                    localStorage.setItem('token', fakeToken);
                    localStorage.setItem('role', 'ADMIN');

                    setUser({ id: 99, name: 'Admin', email });
                    setRole('ADMIN');

                    resolve({ success: true, token: fakeToken, role: 'ADMIN' });
                }

                // 👤 USER LOGIN
                else if (email === 'user@hackathon.com' && password === 'password123') {
                    const fakeToken = 'mock-user-token';
                    localStorage.setItem('token', fakeToken);
                    localStorage.setItem('role', 'USER');

                    setUser({ id: 1, name: 'Demo User', email });
                    setRole('USER');

                    resolve({ success: true, token: fakeToken, role: 'USER' });
                }

                else {
                    reject(new Error('Invalid email or password'));
                }

            }, 1000);
        });
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        setUser(null);
        setRole(null);
    };

    return (
        <AuthContext.Provider value={{ user, role, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);