import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function WorkerDashboard() {
  const nav = useNavigate();
  const [assignedWork, setAssignedWork] = useState([]);
  const email = localStorage.getItem("email");

  useEffect(() => {
    axios
      .get(`http://localhost:3019/Mapping/worker/${email}`)
      .then((res) => {
        const filtered = res.data.filter(work => work.workStatus !== "Rejected");
        setAssignedWork(filtered);
      })
      .catch((err) => console.error("Error fetching work for worker", err));
  }, [email]);

  const handleLogout = () => {
    localStorage.clear();
    nav("/login");
  };

  const updateStatus = (id, status) => {
    axios
      .put(`http://localhost:3019/Mapping/status/${id}?status=${status}`)
      .then(() => {
        alert(`Work ${status}`);
        setAssignedWork(prev =>
          prev.map(work =>
            work.id === id ? { ...work, workStatus: status } : work
          )
        );
      })
      .catch(() => alert("Error updating work status"));
  };

  const getStatusColor = (status) => {
    switch(status?.toLowerCase()) {
      case 'accepted': return '#10b981';
      case 'rejected': return '#ef4444';
      default: return '#f59e0b';
    }
  };

  return (
    <div className="bg-mesh min-h-screen">
      <style>{`
        .dashboard-layout {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
        }
        
        .top-nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 2rem;
          margin-bottom: 3rem;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
          margin-bottom: 3rem;
        }
        
        .stat-card {
          padding: 2rem;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        
        .stat-value {
          font-size: 3.5rem;
          font-weight: 700;
          font-family: var(--font-heading);
          line-height: 1;
          margin-bottom: 0.5rem;
        }

        .stat-label {
          color: var(--text-secondary-dark);
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 1px;
          font-size: 0.875rem;
        }
        
        .data-table {
          width: 100%;
          border-collapse: separate;
          border-spacing: 0;
        }
        
        .data-table th {
          text-align: left;
          padding: 1.25rem 1rem;
          border-bottom: 1px solid var(--border-color);
          color: var(--text-secondary-dark);
          font-weight: 600;
        }
        
        .data-table td {
          padding: 1rem;
          border-bottom: 1px solid var(--border-color);
          vertical-align: middle;
        }

        .status-badge {
          padding: 0.25rem 0.75rem;
          border-radius: var(--radius-full);
          font-size: 0.875rem;
          font-weight: 600;
          display: inline-block;
        }
        
        .action-buttons {
          display: flex;
          gap: 0.5rem;
        }
        
        .btn-accept {
          background: rgba(16, 185, 129, 0.2);
          color: #10b981;
          border: 1px solid #10b981;
          padding: 0.5rem 1rem;
          border-radius: var(--radius-md);
          font-weight: 600;
          cursor: pointer;
          transition: var(--transition-fast);
        }
        
        .btn-accept:hover {
          background: #10b981;
          color: white;
        }

        .btn-reject {
          background: rgba(244, 63, 94, 0.2);
          color: #f43f5e;
          border: 1px solid #f43f5e;
          padding: 0.5rem 1rem;
          border-radius: var(--radius-md);
          font-weight: 600;
          cursor: pointer;
          transition: var(--transition-fast);
        }
        
        .btn-reject:hover {
          background: #f43f5e;
          color: white;
        }
      `}</style>

      <div className="dashboard-layout">
        <motion.nav 
          className="top-nav glass-panel"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div>
            <div className="text-gradient" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
              GharSeva Professional
            </div>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary-dark)' }}>
              Manage your assigned jobs efficiently
            </div>
          </div>
          <button className="btn-outline" style={{ borderColor: 'var(--accent-color)', color: 'var(--accent-color)' }} onClick={handleLogout}>
            Logout
          </button>
        </motion.nav>

        <motion.div 
          className="stats-grid"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="stat-card glass-panel">
            <div className="stat-value text-gradient">{assignedWork.length}</div>
            <div className="stat-label">Total Assigned</div>
          </div>

          <div className="stat-card glass-panel">
            <div className="stat-value" style={{ color: '#10b981' }}>
              {assignedWork.filter(w => w.workStatus === "Accepted").length}
            </div>
            <div className="stat-label">Accepted</div>
          </div>

          <div className="stat-card glass-panel">
            <div className="stat-value" style={{ color: '#f59e0b' }}>
              {assignedWork.filter(w => w.workStatus === "Assigned").length}
            </div>
            <div className="stat-label">Pending Response</div>
          </div>
        </motion.div>

        <motion.div 
          className="glass-panel" 
          style={{ padding: '2rem' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-gradient" style={{ fontSize: '1.75rem', marginBottom: '1.5rem' }}>Current Tasks</h2>
          
          {assignedWork.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary-dark)' }}>
              <span style={{ fontSize: '3rem', display: 'block', marginBottom: '1rem' }}>📋</span>
              <p>No work assigned yet. Take a break!</p>
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Task Description</th>
                    <th>Customer Name</th>
                    <th>Scheduled Date & Time</th>
                    <th>Current Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {assignedWork.map((work) => (
                    <tr key={work.id}>
                      <td style={{ fontWeight: 500, color: 'var(--text-primary-dark)' }}>{work.workName}</td>
                      <td>{work.userName}</td>
                      <td>{new Date(work.dateTime).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })}</td>
                      <td>
                        <span 
                          className="status-badge" 
                          style={{ 
                            backgroundColor: `${getStatusColor(work.workStatus)}20`,
                            color: getStatusColor(work.workStatus),
                            border: `1px solid ${getStatusColor(work.workStatus)}50`
                          }}
                        >
                          {work.workStatus || "Assigned"}
                        </span>
                      </td>
                      <td>
                        {work.workStatus === "Assigned" && (
                          <div className="action-buttons">
                            <button
                              className="btn-accept"
                              onClick={() => updateStatus(work.id, "Accepted")}
                            >
                              Accept
                            </button>
                            <button
                              className="btn-reject"
                              onClick={() => updateStatus(work.id, "Rejected")}
                            >
                              Reject
                            </button>
                          </div>
                        )}
                        {work.workStatus === "Accepted" && (
                          <span style={{ color: '#10b981', fontWeight: 500 }}>✓ Task Accepted</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default WorkerDashboard;
