import React, { createContext, useContext, useState, useCallback } from 'react';

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const addToast = useCallback((message, type = 'success') => {
        const id = Math.random().toString(36).substr(2, 9);
        setToasts((prev) => [...prev, { id, message, type }]);

        setTimeout(() => {
            setToasts((prev) => prev.filter(toast => toast.id !== id));
        }, 3000);
    }, []);

    return (
        <ToastContext.Provider value={{ addToast }}>
            {children}
            <div style={{
                position: 'fixed',
                bottom: '20px',
                right: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                zIndex: 9999
            }}>
                {toasts.map(toast => (
                    <div key={toast.id} className={`toast-message animate-fade glass`} style={{
                        padding: '1rem 1.5rem',
                        borderRadius: '8px',
                        borderLeft: `4px solid ${toast.type === 'error' ? '#ef4444' : '#22c55e'}`,
                        display: 'flex',
                        alignItems: 'center',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                    }}>
                        {toast.message}
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
};

export const useToast = () => useContext(ToastContext);
