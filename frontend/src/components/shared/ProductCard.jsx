import React from 'react';
import { Plus, ShoppingCart } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();
    const { addToast } = useToast();

    const handleAdd = () => {
        addToCart(product);
        addToast(`${product.name} added to cart!`, 'success');
    };

    const isOutOfStock = product.stock === 0;

    return (
        <div className="card">
            <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
                <img
                    src={product.image}
                    alt={product.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s ease' }}
                    className="product-img"
                />
                <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
                    {isOutOfStock ? (
                        <span className="badge badge-danger glass" style={{ backgroundColor: 'rgba(239, 68, 68, 0.9)' }}>Out of Stock</span>
                    ) : (
                        <span className="badge badge-success glass" style={{ backgroundColor: 'rgba(20, 20, 20, 0.7)' }}>{product.category}</span>
                    )}
                </div>
            </div>

            <div style={{ padding: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>{product.name}</h3>
                    <span style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--primary)' }}>
                        &#8377;{product.price.toFixed(0)}
                    </span>
                </div>

                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1.5rem', minHeight: '40px' }}>
                    {product.description}
                </p>

                <button
                    className="btn btn-primary"
                    style={{ width: '100%', padding: '0.75rem' }}
                    disabled={isOutOfStock}
                    onClick={handleAdd}
                >
                    <ShoppingCart size={18} />
                    {isOutOfStock ? 'Sold Out' : 'Add to Cart'}
                </button>
            </div>

            <style>{`
        .card:hover .product-img {
          transform: scale(1.05);
        }
      `}</style>
        </div>
    );
};

export default ProductCard;
