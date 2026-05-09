import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Home() {
    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 }
        }
    };

    return (
        <div className="bg-mesh min-h-screen">
            <style>{`
                .home-container {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 4rem 2rem;
                }
                
                .hero-section {
                    text-align: center;
                    padding: 6rem 2rem;
                    margin-bottom: 5rem;
                }
                
                .hero-title {
                    font-size: 4rem;
                    margin-bottom: 1.5rem;
                }
                
                .hero-subtitle {
                    font-size: 1.25rem;
                    color: var(--text-secondary-dark);
                    max-width: 600px;
                    margin: 0 auto 3rem;
                }
                
                .section-title {
                    text-align: center;
                    font-size: 2.5rem;
                    margin-bottom: 3rem;
                    color: var(--text-primary-dark);
                }
                
                .card-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                    gap: 2rem;
                    margin-bottom: 5rem;
                }
                
                .info-card {
                    padding: 2rem;
                    transition: transform var(--transition-normal);
                }
                
                .info-card:hover {
                    transform: translateY(-10px);
                }
                
                .card-icon {
                    font-size: 2.5rem;
                    margin-bottom: 1.5rem;
                    display: inline-block;
                }
                
                .card-title {
                    font-size: 1.5rem;
                    margin-bottom: 1rem;
                    color: var(--text-primary-dark);
                }
                
                .card-text {
                    color: var(--text-secondary-dark);
                    line-height: 1.6;
                }
                
                @media (max-width: 768px) {
                    .hero-title { font-size: 2.5rem; }
                    .hero-section { padding: 4rem 1rem; }
                }
            `}</style>

            <div className="home-container">
                {/* Hero Section */}
                <motion.div 
                    className="hero-section glass-panel"
                    initial="hidden"
                    animate="visible"
                    variants={fadeIn}
                >
                    <h1 className="hero-title text-gradient">GharSeva</h1>
                    <p className="hero-subtitle">
                        A secure, premium platform connecting you with trusted household professionals. 
                        Experience exceptional service right at your doorstep.
                    </p>
                    <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
                        <Link to="/register" className="btn-primary">
                            Get Started
                        </Link>
                        <Link to="/login" className="btn-outline">
                            Sign In
                        </Link>
                    </div>
                </motion.div>

                {/* How It Works */}
                <motion.div 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeIn}
                >
                    <h2 className="section-title">How It Works</h2>
                    <motion.div className="card-grid" variants={staggerContainer}>
                        <motion.div className="info-card glass-panel" variants={fadeIn}>
                            <span className="card-icon">📝</span>
                            <h3 className="card-title">1. Create Account</h3>
                            <p className="card-text">
                                Sign up instantly as a Customer or Worker. Set up your profile in minutes with our streamlined onboarding.
                            </p>
                        </motion.div>
                        <motion.div className="info-card glass-panel" variants={fadeIn}>
                            <span className="card-icon">🔍</span>
                            <h3 className="card-title">2. Browse & Book</h3>
                            <p className="card-text">
                                Explore a wide range of verified professionals. Compare skills, read reviews, and book with one click.
                            </p>
                        </motion.div>
                        <motion.div className="info-card glass-panel" variants={fadeIn}>
                            <span className="card-icon">✅</span>
                            <h3 className="card-title">3. Secure Service</h3>
                            <p className="card-text">
                                Enjoy peace of mind with our secure OTP verification system. Confirm job completion instantly and safely.
                            </p>
                        </motion.div>
                    </motion.div>
                </motion.div>

                {/* Key Features */}
                <motion.div 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeIn}
                >
                    <h2 className="section-title">Premium Features</h2>
                    <motion.div className="card-grid" variants={staggerContainer}>
                        <motion.div className="info-card glass-panel" variants={fadeIn}>
                            <span className="card-icon">🛡️</span>
                            <h3 className="card-title">Verified Excellence</h3>
                            <p className="card-text">
                                Every professional on our platform undergoes a rigorous background check to ensure your safety and quality of service.
                            </p>
                        </motion.div>
                        <motion.div className="info-card glass-panel" variants={fadeIn}>
                            <span className="card-icon">⚡</span>
                            <h3 className="card-title">Instant Scheduling</h3>
                            <p className="card-text">
                                Book services at your convenience. Our smart system matches you with available professionals immediately.
                            </p>
                        </motion.div>
                        <motion.div className="info-card glass-panel" variants={fadeIn}>
                            <span className="card-icon">📱</span>
                            <h3 className="card-title">Smart Dashboards</h3>
                            <p className="card-text">
                                Track bookings, manage schedules, and review past services through our intuitive, state-of-the-art interface.
                            </p>
                        </motion.div>
                    </motion.div>
                </motion.div>

                {/* Footer CTA */}
                <motion.div 
                    className="hero-section glass-panel"
                    style={{ marginBottom: 0, padding: '4rem 2rem' }}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeIn}
                >
                    <h2 className="section-title" style={{ marginBottom: '1.5rem' }}>Ready to transform your home care?</h2>
                    <p className="hero-subtitle" style={{ marginBottom: '2rem' }}>
                        Join thousands of satisfied users who trust GharSeva for their household needs.
                    </p>
                    <Link to="/register" className="btn-primary" style={{ padding: '1rem 3rem', fontSize: '1.25rem' }}>
                        Join GharSeva Today
                    </Link>
                </motion.div>
            </div>
        </div>
    );
}

export default Home;
