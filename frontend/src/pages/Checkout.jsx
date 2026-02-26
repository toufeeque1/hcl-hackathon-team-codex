import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { api } from '../api';
import { CheckCircle, Truck } from 'lucide-react';

const Checkout = () => {
    const { cart, cartTotal, clearCart } = useCart();
    const { addToast } = useToast();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [orderDetails, setOrderDetails] = useState({
        userId: 1,
        items: cart.map(item => ({ id: item.id, quantity: item.quantity })),
        total: cartTotal * 1.1 + 5,
        address: 'Galgotias University', // Mocked address
    });

    const [success, setSuccess] = useState(null);

    if (cart.length === 0 && !success) {
        navigate('/cart');
        return null;
    }

    const handlePlaceOrder = async () => {
        setLoading(true);
        try {
            const result = await api.createOrder(orderDetails);
            setSuccess(result.data.orderId);
            clearCart();
            addToast('Order successfully placed!', 'success');
        } catch (err) {
            addToast('Failed to place order. Please try again.', 'error');
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
                <div className="animate-fade" style={{ textAlign: 'center' }}>
                    <div style={{ color: '#22c55e', marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>
                        <CheckCircle size={80} />
                    </div>
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Order Confirmed!</h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.125rem', marginBottom: '2rem' }}>
                        Your order <strong>#{success}</strong> has been received and is being prepared.
                    </p>
                    <button onClick={() => navigate('/')} className="btn btn-primary">
                        Return Home
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="container" style={{ paddingTop: '100px', paddingBottom: '4rem', maxWidth: '800px' }}>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem', textAlign: 'center' }}>Checkout</h1>

            <div className="card padding-lg animate-fade">
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', borderBottom: '1px solid var(--border)', paddingBottom: '1.5rem', marginBottom: '1.5rem' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'rgba(56, 189, 248, 0.1)', color: '#38bdf8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Truck size={24} />
                    </div>
                    <div>
                        <h3 style={{ fontSize: '1.25rem', margin: 0 }}>Delivery Details</h3>
                        <p style={{ color: 'var(--text-muted)', margin: 0 }}>Delivering to: {orderDetails.address}</p>
                    </div>
                </div>

                <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Order Summary</h3>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
                    {cart.map(item => (
                        <li key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                <span style={{ fontWeight: '600', color: 'var(--primary)' }}>{item.quantity}x</span>
                                <span>{item.name}</span>
                            </div>
                            <span style={{ color: 'var(--text-muted)' }}>&#8377; {(item.price * item.quantity).toFixed(0)}</span>
                        </li>
                    ))}
                </ul>

                <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1.5rem', marginBottom: '2rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.5rem', fontWeight: '700' }}>
                        <span>Final Total</span>
                        <span className="gradient-text">&#8377; {orderDetails.total.toFixed(0)}</span>
                    </div>
                </div>

                <button
                    className="btn btn-primary"
                    style={{ width: '100%', padding: '1.25rem', fontSize: '1.125rem' }}
                    disabled={loading}
                    onClick={handlePlaceOrder}
                >
                    {loading ? <span className="spinner" style={{ width: '24px', height: '24px', borderWidth: '3px' }}></span> : 'Confirm & Place Order'}
                </button>
            </div>

            <style>{`
        .padding-lg {
          padding: 2.5rem;
        }
        @media (max-width: 640px) {
          .padding-lg { padding: 1.5rem; }
        }
      `}</style>
        </div>
    );
};

export default Checkout;
