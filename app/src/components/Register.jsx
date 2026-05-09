import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Register() {
    const nav = useNavigate();
    const [form, setform] = useState({
        username: "",
        email: "",
        password: "",
        role: ""
    });
    const [loading, setLoading] = useState(false);

    const change = (e) => {
        setform({ ...form, [e.target.name]: e.target.value });
    };

    const submit = async (e) => {
        e.preventDefault();
        if (!form.username || !form.email || !form.password || !form.role) {
            alert("All fields are required");
            return;
        }
        
        setLoading(true);
        try {
            const res = await axios.post("http://localhost:3019/auth/register", form, { withCredentials: true });
            alert(res.data);
            nav("/login");
        }
        catch (err) {
            if (err.response && err.response.status === 409) {
                alert(err.response.data);
            } else {
                alert("Something went wrong. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-mesh min-h-screen" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <style>{`
                .auth-container {
                  width: 100%;
                  max-width: 420px;
                  padding: 3rem 2.5rem;
                  text-align: center;
                }
                
                .auth-title {
                  font-size: 2rem;
                  margin-bottom: 0.5rem;
                  color: var(--text-primary-dark);
                }
                
                .auth-subtitle {
                  color: var(--text-secondary-dark);
                  margin-bottom: 2.5rem;
                }
                
                .form-group {
                  margin-bottom: 1.5rem;
                  text-align: left;
                }
                
                .form-label {
                  display: block;
                  margin-bottom: 0.5rem;
                  font-size: 0.9rem;
                  color: var(--text-secondary-dark);
                  font-weight: 500;
                }
                
                select.input-field {
                  appearance: none;
                  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
                  background-repeat: no-repeat;
                  background-position: right 1rem center;
                  background-size: 1em;
                }
                
                .auth-footer {
                  margin-top: 2rem;
                  color: var(--text-secondary-dark);
                  font-size: 0.9rem;
                }
                
                .auth-link {
                  color: var(--primary-color);
                  text-decoration: none;
                  font-weight: 600;
                  transition: var(--transition-fast);
                }
                
                .auth-link:hover {
                  color: var(--primary-hover);
                  text-decoration: underline;
                }
            `}</style>

            <motion.div 
                className="auth-container glass-panel"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
            >
                <h1 className="auth-title">Create Account</h1>
                <p className="auth-subtitle">Join the GharSeva community today</p>

                <form onSubmit={submit}>
                    <div className="form-group">
                        <label className="form-label">Full Name</label>
                        <input 
                            className="input-field" 
                            onChange={change} 
                            type="text" 
                            name="username" 
                            value={form.username} 
                            placeholder="John Doe" 
                            required 
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Email Address</label>
                        <input 
                            className="input-field" 
                            onChange={change} 
                            type="email" 
                            name="email" 
                            value={form.email} 
                            placeholder="name@example.com" 
                            required 
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Password</label>
                        <input 
                            className="input-field" 
                            onChange={change} 
                            type="password" 
                            name="password" 
                            value={form.password} 
                            placeholder="••••••••" 
                            required 
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Account Type</label>
                        <select 
                            className="input-field" 
                            name="role" 
                            value={form.role} 
                            onChange={change} 
                            required
                        >
                            <option value="" disabled>Select your role</option>
                            <option value="Worker">Service Professional</option>
                            <option value="User">Customer</option>
                            <option value="Admin">Administrator</option>
                        </select>
                    </div>

                    <button 
                        type="submit" 
                        className="btn-primary" 
                        style={{ width: '100%', marginTop: '1rem', opacity: loading ? 0.7 : 1 }}
                        disabled={loading}
                    >
                        {loading ? 'Creating Account...' : 'Create Account'}
                    </button>
                </form>

                <div className="auth-footer">
                    Already have an account? <Link to="/login" className="auth-link">Sign In</Link>
                </div>
            </motion.div>
        </div>
    );
}

export default Register;