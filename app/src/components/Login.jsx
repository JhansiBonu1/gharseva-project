import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";

function Login() {
  const nav = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
    role: ""
  });
  const [loading, setLoading] = useState(false);

  const change = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault(); 
    if (!form.email || !form.password || !form.role) {
      alert("All fields are required");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post("http://localhost:3019/auth/login", form, { 
        withCredentials: true 
      });

      localStorage.setItem("userid", res.data.id); 
      localStorage.setItem("email", res.data.email);
      localStorage.setItem("role", res.data.role);

      const role = res.data.role.toLowerCase();
      if (role === "admin") nav("/Admin");
      else if (role === "user") nav("/User");
      else if (role === "worker") nav("/Worker");
      else nav("/");
    } catch (err) {
      if (err.response) {
         alert(err.response.data || "Invalid Credentials");
      } else {
         alert("Network Error: Check if server is running.");
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
        <h1 className="auth-title">Welcome Back</h1>
        <p className="auth-subtitle">Sign in to your GharSeva account</p>

        <form onSubmit={submit}>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              className="input-field"
              type="email"
              name="email"
              value={form.email}
              placeholder="name@example.com"
              onChange={change}
              autoComplete="email"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              className="input-field"
              type="password"
              name="password"
              value={form.password}
              placeholder="••••••••"
              onChange={change}
              autoComplete="current-password"
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
              <option value="User">Customer</option>
              <option value="Worker">Service Professional</option>
              <option value="Admin">Administrator</option>
            </select>
          </div>

          <button 
            type="submit" 
            className="btn-primary" 
            style={{ width: '100%', marginTop: '1rem', opacity: loading ? 0.7 : 1 }}
            disabled={loading}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <div className="auth-footer">
          Don't have an account? <Link to="/register" className="auth-link">Create one</Link>
        </div>
      </motion.div>
    </div>
  );
}

export default Login;