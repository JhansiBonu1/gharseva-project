import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

function UserDashboard() {
  const nav = useNavigate();
  
  const [view, setView] = useState("categories"); 
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubService, setSelectedSubService] = useState(null);
  
  const [form, setForm] = useState({ location: "", phone: "", dateTime: "" });
  const [myData, setMyData] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const email = localStorage.getItem("email");

  const handleLogout = () => {
    localStorage.clear();
    nav("/login");
  };

  useEffect(() => {
    if (view === "categories") {
      axios.get("http://localhost:3019/admin/all-categories", { withCredentials: true })
        .then(res => setCategories(res.data))
        .catch(err => console.error("Failed to fetch categories:", err));
    }
  }, [view]);

  const handleCategoryClick = (cat) => {
    setSelectedCategory(cat);
    axios.get(`http://localhost:3019/admin/subservices/${cat.id}`, { withCredentials: true })
      .then(res => {
        setSubCategories(res.data);
        setView("subcategories");
      })
      .catch(err => console.error("Error fetching sub-services:", err));
  };

  const handleSubServiceClick = (sub) => {
    setSelectedSubService(sub);
    setView("bookingForm");
  };

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submitBooking = async (e) => {
    e.preventDefault();
    try {
      const payload = { 
        workName: selectedSubService?.name,
        userEmail: email,
        userPhone: form.phone,
        dateTime: form.dateTime,
        workStatus: "Assigned",
        moneyStatus: "Pending"
      };

      await axios.post(
        "http://localhost:3019/Mapping/assign",
        payload,
        { withCredentials: true }
      );

      alert("✅ Booking submitted!");
      viewBookings();

    } catch (err) {
      console.error(err);
      alert("❌ Submission failed");
    }
  };

  const viewBookings = () => {
    axios.get(`http://localhost:3019/Mapping/user/${email}`, { withCredentials: true })
      .then((res) => { 
        setMyData(res.data); 
        setView("table"); 
      })
      .catch(err => console.error("Error fetching bookings:", err));
  };

  useEffect(() => {
    let interval;
    if (view === "table") {
      viewBookings();
      interval = setInterval(viewBookings, 10000);
    }
    return () => clearInterval(interval);
  }, [view]);

  const filteredData = myData.filter((item) =>
    [item.workName, item.workerName, item.workStatus].join(" ").toLowerCase().includes(search.toLowerCase())
  );
  const currentData = filteredData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);
  const totalPages = Math.ceil(filteredData.length / rowsPerPage) || 1;

  const getStatusColor = (status) => {
    switch(status?.toLowerCase()) {
      case 'accepted': return '#10b981';
      case 'rejected': return '#ef4444';
      default: return '#f59e0b';
    }
  };

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
          gap: 1rem;
        }
        
        .nav-btn {
          background: transparent;
          color: var(--text-primary-dark);
          font-weight: 600;
          padding: 0.5rem 1rem;
          border-radius: var(--radius-md);
          transition: var(--transition-fast);
        }
        
        .nav-btn:hover, .nav-btn.active {
          background: rgba(15, 23, 42, 0.05);
        }
        
        .grid-container {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 2rem;
        }
        
        .service-card {
          cursor: pointer;
          overflow: hidden;
          transition: transform var(--transition-normal);
        }
        
        .service-card:hover {
          transform: translateY(-8px);
        }
        
        .card-img {
          width: 100%;
          height: 180px;
          object-fit: cover;
          border-bottom: 1px solid var(--border-color);
        }
        
        .card-body {
          padding: 1.5rem;
          text-align: center;
        }
        
        .card-title {
          font-size: 1.25rem;
          color: var(--text-primary-dark);
          margin: 0;
        }
        
        .data-table {
          width: 100%;
          border-collapse: separate;
          border-spacing: 0;
        }
        
        .data-table th {
          text-align: left;
          padding: 1rem;
          border-bottom: 1px solid var(--border-color);
          color: var(--text-secondary-dark);
          font-weight: 600;
        }
        
        .data-table td {
          padding: 1rem;
          border-bottom: 1px solid var(--border-color);
        }
        
        .status-badge {
          padding: 0.25rem 0.75rem;
          border-radius: var(--radius-full);
          font-size: 0.875rem;
          font-weight: 600;
        }
        
        .form-container {
          max-width: 500px;
          margin: 0 auto;
          padding: 2.5rem;
        }
      `}</style>

      <div className="dashboard-layout">
        <motion.nav 
          className="top-nav glass-panel"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-gradient" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
            GharSeva
          </div>
          <div className="nav-links">
            <button 
              className={`nav-btn ${view === 'categories' || view === 'subcategories' ? 'active' : ''}`}
              onClick={() => setView("categories")}
            >
              Services
            </button>
            <button 
              className={`nav-btn ${view === 'table' ? 'active' : ''}`}
              onClick={viewBookings}
            >
              My Bookings
            </button>
          </div>
          <button className="btn-outline" style={{ borderColor: 'var(--accent-color)', color: 'var(--accent-color)' }} onClick={handleLogout}>
            Logout
          </button>
        </motion.nav>

        <AnimatePresence mode="wait">
          {view === "categories" && (
            <motion.div key="categories" initial="initial" animate="in" exit="out" variants={pageVariants}>
              <h2 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>Our Services</h2>
              <div className="grid-container">
                {categories.map(cat => (
                  <motion.div 
                    key={cat.id} 
                    className="service-card glass-panel" 
                    onClick={() => handleCategoryClick(cat)}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <img src={cat.imageUrl || `https://source.unsplash.com/400x300/?${cat.catname}`} alt={cat.catname} className="card-img" />
                    <div className="card-body">
                      <h3 className="card-title">{cat.catname}</h3>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {view === "subcategories" && (
            <motion.div key="subcategories" initial="initial" animate="in" exit="out" variants={pageVariants}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2rem', gap: '1rem' }}>
                <button className="btn-secondary" onClick={() => setView("categories")}>
                  &larr; Back
                </button>
                <h2 className="text-gradient" style={{ fontSize: '2.5rem', margin: 0 }}>
                  {selectedCategory?.catname} Services
                </h2>
              </div>
              <div className="grid-container">
                {subCategories.map(sub => (
                  <motion.div 
                    key={sub.id} 
                    className="service-card glass-panel" 
                    onClick={() => handleSubServiceClick(sub)}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <img src={sub.imageUrl || `https://source.unsplash.com/400x300/?${sub.name}`} alt={sub.name} className="card-img" />
                    <div className="card-body">
                      <h3 className="card-title">{sub.name}</h3>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {view === "bookingForm" && (
            <motion.div key="bookingForm" initial="initial" animate="in" exit="out" variants={pageVariants}>
              <div className="form-container glass-panel">
                <h2 className="text-gradient" style={{ fontSize: '2rem', marginBottom: '2rem', textAlign: 'center' }}>
                  Book {selectedSubService?.name}
                </h2>
                <form onSubmit={submitBooking}>
                  <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary-dark)' }}>Service Address</label>
                    <input className="input-field" type="text" name="location" placeholder="Full Address" onChange={change} required />
                  </div>
                  <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary-dark)' }}>Contact Phone</label>
                    <input className="input-field" type="tel" name="phone" placeholder="Phone Number" onChange={change} required />
                  </div>
                  <div style={{ marginBottom: '2rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary-dark)' }}>Preferred Date & Time</label>
                    <input className="input-field" type="datetime-local" name="dateTime" onChange={change} required style={{ colorScheme: 'dark' }} />
                  </div>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <button type="submit" className="btn-primary" style={{ flex: 1 }}>Confirm Booking</button>
                    <button type="button" className="btn-outline" onClick={() => setView("subcategories")} style={{ flex: 1 }}>Cancel</button>
                  </div>
                </form>
              </div>
            </motion.div>
          )}

          {view === "table" && (
            <motion.div key="table" initial="initial" animate="in" exit="out" variants={pageVariants}>
              <div className="glass-panel" style={{ padding: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                  <h2 className="text-gradient" style={{ fontSize: '2rem', margin: 0 }}>My Active Requests</h2>
                  <input 
                    type="text" 
                    placeholder="Search bookings..." 
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
                        <th>Service Required</th>
                        <th>Assigned Professional</th>
                        <th>Status</th>
                        <th>Scheduled Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentData.map((item) => (
                        <tr key={item.id}>
                          <td style={{ fontWeight: 500 }}>{item.workName}</td>
                          <td>{item.workerName || <span style={{ color: 'var(--text-secondary-dark)' }}>Assigning...</span>}</td>
                          <td>
                            <span 
                              className="status-badge" 
                              style={{ 
                                backgroundColor: `${getStatusColor(item.workStatus)}20`,
                                color: getStatusColor(item.workStatus),
                                border: `1px solid ${getStatusColor(item.workStatus)}50`
                              }}
                            >
                              {item.workStatus}
                            </span>
                          </td>
                          <td>{new Date(item.dateTime).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })}</td>
                        </tr>
                      ))}
                      {currentData.length === 0 && (
                        <tr>
                          <td colSpan="4" style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary-dark)' }}>
                            No bookings found matching your search.
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
}

export default UserDashboard;