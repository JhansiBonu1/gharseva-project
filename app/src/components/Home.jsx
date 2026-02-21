import { Link } from "react-router-dom";

function Home() {
    return (
        <>
            <style>{`
                body {
                    margin: 0;
                    font-family: 'Segoe UI', sans-serif;
                    background: #f0f2f5;
                    color: #2c2c2c;
                }

                .container {
                    max-width: 1200px;
                    margin: auto;
                    padding: 40px 20px;
                }

                .hero {
                    background: linear-gradient(135deg, #2e3b55, #1c1f2f);
                    padding: 80px 40px;
                    text-align: center;
                    border-radius: 20px;
                    margin-bottom: 60px;
                    color: #ffffff;
                    box-shadow: 0 10px 40px rgba(0,0,0,0.3);
                    backdrop-filter: blur(6px);
                }

                .hero h1 {
                    font-size: 46px;
                    font-weight: 700;
                    margin-bottom: 20px;
                    color: #ffffff;
                    letter-spacing: 1px;
                }

                .hero p {
                    font-size: 20px;
                    max-width: 700px;
                    margin: auto;
                    margin-bottom: 35px;
                    line-height: 1.7;
                    color: #cccccc;
                }

                .btn-group {
                    display: flex;
                    justify-content: center;
                    gap: 20px;
                    flex-wrap: wrap;
                }

                .btn {
                    padding: 14px 28px;
                    font-size: 17px;
                    border: none;
                    border-radius: 8px;
                    cursor: pointer;
                    text-decoration: none;
                    font-weight: 600;
                    transition: all 0.3s ease;
                }

                .btn-register {
                    background-color: #0fb78d;
                    color: #fff;
                }

                .btn-login {
                    background-color: #e23d3d;
                    color: #fff;
                }

                .btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 22px rgba(0,0,0,0.3);
                    opacity: 0.95;
                }

                .section {
                    margin-bottom: 70px;
                }

                .section h2 {
                    font-size: 32px;
                    text-align: center;
                    margin-bottom: 40px;
                    color: #1e1e1e;
                }

                .card-grid {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: center;
                    gap: 30px;
                }

                .card {
                    width: 290px;
                    background: #ffffff;
                    border-radius: 14px;
                    box-shadow: 0 8px 24px rgba(0,0,0,0.08);
                    overflow: hidden;
                    transition: transform 0.3s ease;
                }

                .card:hover {
                    transform: translateY(-5px);
                }

                .card-header {
                    background-color: #303c54;
                    color: #ffffff;
                    padding: 18px;
                    font-size: 18px;
                    font-weight: bold;
                    text-align: center;
                    width: 100%;
                }

                .card-body {
                    padding: 20px;
                    font-size: 15px;
                    color: #333;
                    background: #fafafa;
                    text-align: center;
                }

                .footer-cta {
                    text-align: center;
                    margin-top: 60px;
                }

                .footer-cta h2 {
                    font-size: 28px;
                    margin-bottom: 25px;
                    color: #1e1e1e;
                }

                @media (max-width: 600px) {
                    .card {
                        width: 100%;
                    }

                    .hero h1 {
                        font-size: 30px;
                    }

                    .hero p {
                        font-size: 16px;
                    }

                    .btn {
                        width: 100%;
                    }
                }
            `}</style>

            <div className="container">
                {/* Hero Section */}
                <div className="hero">
                    <h1>WorkerAtHome</h1>
                    <p>
                        A secure and reliable platform to connect customers with trusted household workers. 
                        Empowering every home with efficiency and care.
                    </p>
                    <div className="btn-group">
                        <Link to="/register" className="btn btn-register">Register</Link>
                        <Link to="/login" className="btn btn-login">Login</Link>
                    </div>
                </div>

                {/* How It Works */}
                <div className="section">
                    <h2>How It Works</h2>
                    <div className="card-grid">
                        <div className="card">
                            <div className="card-header">1. Register</div>
                            <div className="card-body">
                                Sign up as Customer, Worker, or Admin quickly with basic details.
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-header">2. Book a Worker</div>
                            <div className="card-body">
                                Customers can send requests to verified workers as per their needs.
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-header">3. Confirm via OTP</div>
                            <div className="card-body">
                                Workers accept the task, and customers confirm service via OTP.
                            </div>
                        </div>
                    </div>
                </div>

                {/* Key Features */}
                <div className="section">
                    <h2>Key Features</h2>
                    <div className="card-grid">
                        <div className="card">
                            <div className="card-header">Verified Profiles</div>
                            <div className="card-body">
                                Admins add only trusted workers after a proper background check.
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-header">Smart Scheduling</div>
                            <div className="card-body">
                                Customers choose convenient time slots and get instant confirmation.
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-header">Role-Based Dashboard</div>
                            <div className="card-body">
                                Clean UI for each role — Worker, Customer, Admin — with OTP-based security.
                            </div>
                        </div>
                    </div>
                </div>

                {/* Who Can Use */}
                <div className="section">
                    <h2>Who Can Use This?</h2>
                    <div className="card-grid">
                        <div className="card">
                            <div className="card-header">Customers</div>
                            <div className="card-body">
                                Anyone looking for domestic help can register and request verified workers.
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-header">Workers</div>
                            <div className="card-body">
                                Gain visibility and accept job requests with flexibility and control.
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-header">Admins</div>
                            <div className="card-body">
                                Oversee the platform, add trusted workers, and manage customer requests.
                            </div>
                        </div>
                    </div>
                </div>

                {/* Final Call to Action */}
                <div className="footer-cta">
                    <h2>Join the community today</h2>
                    <div className="btn-group">
                        <Link to="/register" className="btn btn-register">Get Started</Link>
                        <Link to="/login" className="btn btn-login">Login</Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;
