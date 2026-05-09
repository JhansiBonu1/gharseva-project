import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

const AdminDashboard = () => {
  const nav = useNavigate();
  const [data, setData] = useState([]);
  const [stats, setStats] = useState({
    totalWorkers: 0,
    activeWorkers: 0,
    totalCategories: 0,
    totalSubServices: 0
  });

  const [showTable, setShowTable] = useState(false);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 6;

  useEffect(() => {
    axios.get("http://localhost:3019/admin/workers")
      .then((res) => setData(res.data))
      .catch(console.error);

    axios.get("http://localhost:3019/admin/stats")
      .then((res) => setStats(res.data))
      .catch(console.error);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    nav("/login");
  };

  const handleViewAllWorks = () => {
    setShowTable(true);
  };

  const filteredData = data.filter((item) =>
    item.username?.toLowerCase().includes(search.toLowerCase()) ||
    item.skill?.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const currentData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 }
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

        .nav-links {
          display: flex;
          gap: 1.5rem;
          align-items: center;
        }

        .nav-link {
          color: var(--text-primary-dark);
          text-decoration: none;
          font-weight: 500;
          padding: 0.5rem 1rem;
          border-radius: var(--radius-md);
          transition: var(--transition-fast);
        }

        .nav-link:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
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
          font-size: 3rem;
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

        .action-card {
          padding: 2.5rem;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }
      `}</style>

      <div className="dashboard-layout">
        <motion.nav 
          className="top-nav glass-panel"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-gradient" style={{ fontSize: '1.5rem', fontWeight: 'bold', letterSpacing: '1px' }}>
            GHAR SEVA ADMIN
          </div>
          <div className="nav-links">
            <Link to="/add" className="nav-link">Add Worker</Link>
            <Link to="/manageworkers" className="nav-link">Manage Workers</Link>
            <Link to="/admin/categories" className="nav-link">Categories</Link>
            <Link to="/alldetails" className="nav-link">All Details</Link>
            <button className="btn-outline" style={{ borderColor: 'var(--accent-color)', color: 'var(--accent-color)', marginLeft: '1rem' }} onClick={handleLogout}>
              Logout
            </button>
          </div>
        </motion.nav>

        <AnimatePresence mode="wait">
          {!showTable ? (
            <motion.div key="overview" initial="initial" animate="in" exit="out" variants={pageVariants}>
              <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h1 className="text-gradient" style={{ fontSize: '3rem', marginBottom: '1rem' }}>System Overview</h1>
                <p style={{ color: 'var(--text-secondary-dark)', fontSize: '1.25rem' }}>Monitor and manage platform operations efficiently.</p>
              </div>

              <div className="stats-grid">
                <motion.div className="stat-card glass-panel" whileHover={{ scale: 1.05 }}>
                  <div className="stat-value text-gradient">{stats.totalWorkers}</div>
                  <div className="stat-label">Total Workers</div>
                </motion.div>
                
                <motion.div className="stat-card glass-panel" whileHover={{ scale: 1.05 }}>
                  <div className="stat-value" style={{ color: '#10b981' }}>{stats.activeWorkers}</div>
                  <div className="stat-label">Active Workers</div>
                </motion.div>

                <motion.div className="stat-card glass-panel" whileHover={{ scale: 1.05 }}>
                  <div className="stat-value" style={{ color: '#8b5cf6' }}>{stats.totalCategories}</div>
                  <div className="stat-label">Categories</div>
                </motion.div>

                <motion.div className="stat-card glass-panel" whileHover={{ scale: 1.05 }}>
                  <div className="stat-value" style={{ color: '#ec4899' }}>{stats.totalSubServices}</div>
                  <div className="stat-label">Services</div>
                </motion.div>
              </div>

              <div className="action-card glass-panel">
                <div style={{ fontSize: '3rem' }}>📋</div>
                <h3 style={{ fontSize: '1.5rem', color: 'var(--text-primary-dark)', margin: 0 }}>Worker Records</h3>
                <p style={{ color: 'var(--text-secondary-dark)', margin: 0 }}>Access detailed logs of all registered service providers.</p>
                <button className="btn-primary" style={{ marginTop: '1rem' }} onClick={handleViewAllWorks}>
                  View Worker Directory
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div key="table" initial="initial" animate="in" exit="out" variants={pageVariants}>
              <div className="glass-panel" style={{ padding: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                    <button className="btn-secondary" onClick={() => setShowTable(false)}>
                      &larr; Back
                    </button>
                    <h2 className="text-gradient" style={{ fontSize: '2rem', margin: 0 }}>Worker Directory</h2>
                  </div>
                  <input 
                    type="text" 
                    placeholder="Search by name or skill..." 
                    value={search} 
                    onChange={(e) => setSearch(e.target.value)} 
                    className="input-field"
                    style={{ width: '300px' }}
                  />
                </div>
                
                <div style={{ overflowX: 'auto' }}>
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Professional Name</th>
                        <th>Specialty Skill</th>
                        <th>Location</th>
                        <th>Email Contact</th>
                        <th>Current Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentData.map((item) => (
                        <tr key={item.id}>
                          <td style={{ fontWeight: 500, color: 'var(--text-primary-dark)' }}>{item.username}</td>
                          <td>
                            <span style={{ 
                              background: 'var(--bg-primary)', 
                              border: '1px solid var(--border-color)',
                              padding: '0.25rem 0.5rem', 
                              borderRadius: '4px',
                              fontSize: '0.875rem'
                            }}>
                              {item.skill}
                            </span>
                          </td>
                          <td>{item.location}</td>
                          <td style={{ color: 'var(--text-secondary-dark)' }}>{item.email}</td>
                          <td>
                            <span 
                              className="status-badge" 
                              style={{ 
                                backgroundColor: item.available ? 'rgba(16, 185, 129, 0.2)' : 'rgba(244, 63, 94, 0.2)',
                                color: item.available ? '#10b981' : '#f43f5e',
                                border: `1px solid ${item.available ? '#10b981' : '#f43f5e'}50`
                              }}
                            >
                              {item.available ? '● Available' : '○ Busy'}
                            </span>
                          </td>
                        </tr>
                      ))}
                      {currentData.length === 0 && (
                        <tr>
                          <td colSpan="5" style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary-dark)' }}>
                            No professionals found matching your search.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {totalPages > 1 && (
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', marginTop: '2rem' }}>
                    <button className="btn-secondary" onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1}>
                      &larr; Prev
                    </button>
                    <span style={{ color: 'var(--text-secondary-dark)', fontWeight: 600 }}>
                      Page {currentPage} of {totalPages}
                    </span>
                    <button className="btn-secondary" onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages}>
                      Next &rarr;
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AdminDashboard;