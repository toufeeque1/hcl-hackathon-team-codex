import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Pizza, CupSoda, Cookie } from 'lucide-react';

const Home = () => {
    const categories = [
        { id: 'pizza', name: 'Pizza', icon: <Pizza size={32} />, color: '#FF5A5F', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=80' },
        { id: 'drinks', name: 'Cold Drinks', icon: <CupSoda size={32} />, color: '#00A699', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS519pVuZIWdGAFBn--DLi9JnepJ_mYuWXRfA&s' },
        { id: 'breads', name: 'Fresh Breads', icon: <Cookie size={32} />, color: '#F5A623', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=80' }
    ];

    return (
        <div style={{ paddingTop: '80px' }}>
            {/* Hero Section */}
            <section style={{
                position: 'relative',
                height: '70vh',
                minHeight: '500px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden'
            }}>
                <div style={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0, bottom: 0,
                    backgroundImage: 'url(https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'brightness(0.3)',
                    zIndex: -1
                }} />

                <div className="container" style={{ textAlign: 'center', zIndex: 1 }}>
                    <h1 className="animate-fade" style={{ fontSize: 'clamp(3rem, 8vw, 5rem)', marginBottom: '1.5rem', fontWeight: '800', lineHeight: '1.1' }}>
                        Cravings <span className="gradient-text">Satisfied.</span>
                    </h1>
                    <p className="animate-fade" style={{ fontSize: '1.25rem', color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto 2.5rem', animationDelay: '0.2s', opacity: 0 }}>
                        Premium pizza, refreshing drinks, and warm breads delivered straight to your door with blazing speed.
                    </p>
                    <div className="animate-fade" style={{ animationDelay: '0.4s', opacity: 0 }}>
                        <Link to="/menu" className="btn btn-primary" style={{ padding: '1rem 2.5rem', fontSize: '1.125rem', borderRadius: '50px' }}>
                            Order Now <ArrowRight size={20} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Categories Section */}
            <section className="container" style={{ padding: '6rem 1.5rem' }}>
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Our Menu Categories</h2>
                    <p style={{ color: 'var(--text-muted)' }}>Browse our selection of handcrafted perfection</p>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '2rem'
                }}>
                    {categories.map((cat, idx) => (
                        <Link to={`/menu?category=${cat.id}`} key={cat.id} style={{ textDecoration: 'none' }}>
                            <div
                                className="card animate-fade"
                                style={{
                                    height: '350px',
                                    position: 'relative',
                                    overflow: 'hidden',
                                    animationDelay: `${0.2 * idx}s`,
                                    opacity: 0
                                }}
                            >
                                <div style={{
                                    position: 'absolute',
                                    top: 0, left: 0, right: 0, bottom: 0,
                                    backgroundImage: `url(${cat.image})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    transition: 'transform 0.5s ease',
                                    className: 'cat-bg'
                                }} className="cat-bg" />

                                <div style={{
                                    position: 'absolute',
                                    top: 0, left: 0, right: 0, bottom: 0,
                                    background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.2) 100%)'
                                }} />

                                <div style={{
                                    position: 'absolute',
                                    bottom: 0, left: 0, right: 0,
                                    padding: '2rem',
                                    display: 'flex',
                                    alignItems: 'flex-end',
                                    justifyContent: 'space-between'
                                }}>
                                    <div>
                                        <div style={{ color: cat.color, marginBottom: '0.5rem' }}>{cat.icon}</div>
                                        <h3 style={{ fontSize: '1.75rem', color: 'white' }}>{cat.name}</h3>
                                    </div>
                                    <div style={{
                                        width: '40px', height: '40px',
                                        borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.1)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        backdropFilter: 'blur(4px)'
                                    }}>
                                        <ArrowRight size={20} color="white" />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Trust Section */}
            <section style={{ backgroundColor: 'var(--bg-card)', padding: '5rem 0', borderTop: '1px solid var(--border)' }}>
                <div className="container" style={{ textAlign: 'center' }}>
                    <h2 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Why Choose Us?</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem' }}>
                        <div>
                            <div style={{ width: '64px', height: '64px', borderRadius: '16px', backgroundColor: 'var(--bg-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: 'var(--primary)' }}>
                                <Pizza size={32} />
                            </div>
                            <h3 style={{ marginBottom: '0.5rem' }}>Premium Ingredients</h3>
                            <p style={{ color: 'var(--text-muted)' }}>Sourced locally for maximum freshness.</p>
                        </div>
                        <div>
                            <div style={{ width: '64px', height: '64px', borderRadius: '16px', backgroundColor: 'var(--bg-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: 'var(--secondary)' }}>
                                <CupSoda size={32} />
                            </div>
                            <h3 style={{ marginBottom: '0.5rem' }}>Perfect Pairings</h3>
                            <p style={{ color: 'var(--text-muted)' }}>Curated drinks to elevate every bite.</p>
                        </div>
                        <div>
                            <div style={{ width: '64px', height: '64px', borderRadius: '16px', backgroundColor: 'var(--bg-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: '#F5A623' }}>
                                <Cookie size={32} />
                            </div>
                            <h3 style={{ marginBottom: '0.5rem' }}>Fast Delivery</h3>
                            <p style={{ color: 'var(--text-muted)' }}>Hot out of the oven, straight to you.</p>
                        </div>
                    </div>
                </div>
            </section>

            <style>{`
        .card:hover .cat-bg {
          transform: scale(1.1);
        }
      `}</style>
        </div>
    );
};

export default Home;
