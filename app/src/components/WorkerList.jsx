import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

const WorkerList = () => {
  const { skill } = useParams();
  const nav = useNavigate();
  const [workers, setWorkers] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3019/admin/workers/skill/${skill}`, { withCredentials: true })
      .then(res => setWorkers(res.data))
      .catch(err => console.error(err));
  }, [skill]);

  return (
    <div className="bg-mesh min-h-screen" style={{ padding: "40px 20px" }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2rem', gap: '1rem' }}>
          <button className="btn-secondary" onClick={() => nav(-1)}>
            &larr; Back
          </button>
          <h2 className="text-gradient" style={{ fontSize: '2.5rem', margin: 0 }}>
            Available {skill} Professionals
          </h2>
        </div>

        {workers.length > 0 ? workers.map((w, index) => (
          <motion.div 
            key={w.id} 
            className="glass-panel"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            style={{ 
              padding: "24px", 
              marginBottom: "20px", 
              display: "flex", 
              justifyContent: "space-between", 
              alignItems: "center" 
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <div style={{ 
                width: '60px', 
                height: '60px', 
                borderRadius: '50%', 
                background: 'var(--gradient-primary)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                color: 'white',
                fontSize: '1.5rem',
                fontWeight: 'bold'
              }}>
                {w.username.charAt(0).toUpperCase()}
              </div>
              <div>
                <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.25rem', color: 'var(--text-primary-dark)' }}>
                  {w.username}
                </h3>
                <p style={{ margin: 0, color: 'var(--text-secondary-dark)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span>📍</span> {w.location}
                </p>
              </div>
            </div>
            
            <button 
              className="btn-primary"
              onClick={() => alert("OTP has been sent to your mobile for confirmation!")}
            >
              Book Professional
            </button>
          </motion.div>
        )) : (
          <motion.div 
            className="glass-panel" 
            style={{ padding: '3rem', textAlign: 'center' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <span style={{ fontSize: '3rem', display: 'block', marginBottom: '1rem' }}>🔍</span>
            <h3 style={{ color: 'var(--text-primary-dark)', marginBottom: '0.5rem' }}>No Professionals Found</h3>
            <p style={{ color: 'var(--text-secondary-dark)' }}>
              Currently no workers available for {skill}. Try again later!
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default WorkerList;