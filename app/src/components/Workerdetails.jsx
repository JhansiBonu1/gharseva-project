import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

function Workerdetails() {
  const { id } = useParams();
  const [worker, setWorker] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:3019/wkdb/details/${id}`)
        .then((res) => {
          setWorker(res.data);
          if (res.data?.phone) {
            localStorage.setItem("phone", res.data.phone);
          }
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching worker details:", err);
          setLoading(false);
        });
    }
  }, [id]);

  const handleSendRequest = () => {
    alert(`Request sent to ${worker?.username}`);
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="bg-mesh min-h-screen flex" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <h2 className="text-gradient">Loading Professional Details...</h2>
      </div>
    );
  }
  
  if (!worker) {
    return (
      <div className="bg-mesh min-h-screen flex" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center' }}>
          <span style={{ fontSize: '3rem', display: 'block', marginBottom: '1rem' }}>⚠️</span>
          <h2 className="text-gradient">Professional Not Found</h2>
          <button className="btn-secondary" style={{ marginTop: '1rem' }} onClick={handleBack}>Go Back</button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-mesh min-h-screen" style={{ padding: "40px 20px" }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2rem', gap: '1rem' }}>
          <button className="btn-secondary" onClick={handleBack}>
            &larr; Back
          </button>
          <h2 className="text-gradient" style={{ fontSize: '2.5rem', margin: 0 }}>
            Professional Profile
          </h2>
        </div>

        <motion.div 
          className="glass-panel"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ padding: '2.5rem', position: 'relative', overflow: 'hidden' }}
        >
          {/* Decorative background element */}
          <div style={{ 
            position: 'absolute', 
            top: 0, 
            right: 0, 
            width: '150px', 
            height: '150px', 
            background: 'var(--gradient-primary)', 
            opacity: 0.1, 
            borderRadius: '0 0 0 100%' 
          }} />

          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '2.5rem' }}>
            <div style={{ 
              width: '80px', 
              height: '80px', 
              borderRadius: '50%', 
              background: 'var(--gradient-secondary)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              color: 'white',
              fontSize: '2.5rem',
              fontWeight: 'bold',
              boxShadow: 'var(--shadow-md)'
            }}>
              {worker.username?.charAt(0).toUpperCase()}
            </div>
            <div>
              <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '2rem', color: 'var(--text-primary-dark)' }}>
                {worker.username}
              </h3>
              <span className="status-badge" style={{ 
                background: worker.available ? 'rgba(16, 185, 129, 0.2)' : 'rgba(244, 63, 94, 0.2)',
                color: worker.available ? '#10b981' : '#f43f5e',
                border: `1px solid ${worker.available ? '#10b981' : '#f43f5e'}`
              }}>
                {worker.available ? '● Available Now' : '○ Currently Unavailable'}
              </span>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2.5rem' }}>
            <div style={{ background: 'var(--bg-primary)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
              <p style={{ margin: '0 0 0.25rem 0', color: 'var(--text-secondary-dark)', fontSize: '0.875rem' }}>Email Address</p>
              <p style={{ margin: 0, color: 'var(--text-primary-dark)', fontWeight: 500 }}>{worker.email || "N/A"}</p>
            </div>
            <div style={{ background: 'var(--bg-primary)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
              <p style={{ margin: '0 0 0.25rem 0', color: 'var(--text-secondary-dark)', fontSize: '0.875rem' }}>Phone Number</p>
              <p style={{ margin: 0, color: 'var(--text-primary-dark)', fontWeight: 500 }}>{worker.phone || "N/A"}</p>
            </div>
            <div style={{ background: 'var(--bg-primary)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
              <p style={{ margin: '0 0 0.25rem 0', color: 'var(--text-secondary-dark)', fontSize: '0.875rem' }}>Location</p>
              <p style={{ margin: 0, color: 'var(--text-primary-dark)', fontWeight: 500 }}>{worker.location || "N/A"}</p>
            </div>
            <div style={{ background: 'var(--bg-primary)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
              <p style={{ margin: '0 0 0.25rem 0', color: 'var(--text-secondary-dark)', fontSize: '0.875rem' }}>Specialty Skill</p>
              <p style={{ margin: 0, color: 'var(--text-primary-dark)', fontWeight: 500 }}>{worker.skill || "N/A"}</p>
            </div>
          </div>

          <div style={{ background: 'var(--bg-primary)', padding: '1.5rem', borderRadius: 'var(--radius-md)', marginBottom: '2.5rem' }}>
            <p style={{ margin: '0 0 0.5rem 0', color: 'var(--text-secondary-dark)', fontSize: '0.875rem' }}>About Professional</p>
            <p style={{ margin: 0, color: 'var(--text-primary-dark)', lineHeight: 1.6 }}>{worker.description || "No description provided."}</p>
          </div>

          <div style={{ display: "flex", gap: "1rem" }}>
            <button 
              className="btn-primary" 
              style={{ flex: 2 }} 
              onClick={handleSendRequest}
              disabled={!worker.available}
            >
              {worker.available ? 'Send Request' : 'Unavailable'}
            </button>
            <button className="btn-outline" style={{ flex: 1 }} onClick={handleBack}>Cancel</button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Workerdetails;
