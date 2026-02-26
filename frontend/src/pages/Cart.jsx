import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';

const Cart = () => {
    const { cart, updateQuantity, removeFromCart, cartTotal, clearCart } = useCart();
    const navigate = useNavigate();

    if (cart.length === 0) {
        return (
            <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
                <div style={{ width: '120px', height: '120px', borderRadius: '50%', backgroundColor: 'var(--bg-card)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem', color: 'var(--text-muted)' }}>
                    <ShoppingBag size={50} />
                </div>
                <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Your cart is empty</h2>
                <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Looks like you haven't added anything delicious yet.</p>
                <Link to="/menu" className="btn btn-primary" style={{ borderRadius: '50px' }}>
                    Browse Menu
                </Link>
            </div>
        );
    }

    return (
        <div className="container" style={{ paddingTop: '100px', paddingBottom: '4rem', minHeight: '80vh' }}>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>Your Cart</h1>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem', alignItems: 'start' }}>

                {/* Cart Items List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {cart.map((item, idx) => (
                        <div key={item.id} className="card animate-fade" style={{ display: 'flex', alignItems: 'center', padding: '1rem', gap: '1.5rem', animationDelay: `${idx * 0.1}s`, opacity: 0 }}>
                            <img
                                src={item.image}
                                alt={item.name}
                                style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: 'var(--radius-sm)' }}
                            />

                            <div style={{ flex: '1' }}>
                                <h3 style={{ fontSize: '1.125rem', marginBottom: '0.25rem' }}>{item.name}</h3>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>&#8377; {item.price.toFixed(2)}</p>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', backgroundColor: 'var(--bg-dark)', padding: '0.5rem', borderRadius: '999px', border: '1px solid var(--border)' }}>
                                <button
                                    onClick={() => updateQuantity(item.id, -1)}
                                    disabled={item.quantity <= 1}
                                    style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: 'var(--bg-card)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-main)' }}
                                >
                                    <Minus size={14} />
                                </button>
                                <span style={{ fontWeight: '600', minWidth: '1.5rem', textAlign: 'center' }}>{item.quantity}</span>
                                <button
                                    onClick={() => updateQuantity(item.id, 1)}
                                    style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: 'var(--bg-card)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-main)' }}
                                >
                                    <Plus size={14} />
                                </button>
                            </div>

                            <div style={{ fontWeight: '700', minWidth: '80px', textAlign: 'right', fontSize: '1.125rem' }}>
                                &#8377; {(item.price * item.quantity).toFixed()}
                            </div>

                            <button
                                onClick={() => removeFromCart(item.id)}
                                style={{ color: '#ef4444', padding: '0.5rem', backgroundColor: 'rgba(239,68,68,0.1)', borderRadius: '8px' }}
                                title="Remove item"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    ))}
                </div>

                {/* Order Summary styled to appear below on small screens, beside on large (will use CSS grid via style) */}
                <div className="card" style={{ padding: '2rem', position: 'sticky', top: '100px' }}>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }}>Order Summary</h3>

                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', color: 'var(--text-muted)' }}>
                        <span>Subtotal ({cart.reduce((a, c) => a + c.quantity, 0)} items)</span>
                        <span>&#8377; {cartTotal.toFixed(0)}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', color: 'var(--text-muted)' }}>
                        <span>Taxes & Fees (10%)</span>
                        <span>&#8377; {(cartTotal * 0.1).toFixed(0)}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', color: 'var(--text-muted)' }}>
                        <span>Delivery</span>
                        <span>&#8377; 5</span>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', fontWeight: '700', fontSize: '1.5rem', borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
                        <span>Total</span>
                        <span style={{ color: 'var(--primary)' }}>&#8377; {(cartTotal * 1.1 + 5).toFixed()}</span>
                    </div>

                    <button
                        className="btn btn-primary"
                        style={{ width: '100%', padding: '1rem', fontSize: '1.125rem', justifyContent: 'center' }}
                        onClick={() => navigate('/checkout')}
                    >
                        Proceed to Checkout <ArrowRight size={20} />
                    </button>

                    <button
                        className="btn btn-outline"
                        style={{ width: '100%', marginTop: '1rem', border: 'none', color: 'var(--text-muted)' }}
                        onClick={clearCart}
                    >
                        Clear Cart
                    </button>
                </div>
            </div>

            <style>{`
        @media (min-width: 1024px) {
          .container > div {
            grid-template-columns: 2fr 1fr !important;
          }
        }
      `}</style>
        </div>
    );
};

export default Cart;
