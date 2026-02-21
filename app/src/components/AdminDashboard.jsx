import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/AdminDashboard.css";

const AdminDashboard = () => {
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

  return (
    <div className="dashboard">
      
      {/* Top Navbar */}
      <header className="navbar">
        <div className="brand">GHAR SEVA</div>
        <nav className="nav-links">
          <Link to="/add">Add Worker</Link>
          <Link to="/manageworkers">Manage Workers</Link>
          <Link to="/admin/categories">Categories</Link>
           <Link to="/alldetails" className="nav-link">All Details</Link>
        </nav>
      </header>

      <div className="container">
        {!showTable ? (
          <>
            <div className="header-section">
              <h1>Admin Overview</h1>
              <p>Monitor and manage platform operations efficiently.</p>
            </div>

            <div className="stats">
              <div className="stat-box">
                <span>Total Workers</span>
                <h2>{stats.totalWorkers}</h2>
              </div>
              <div className="stat-box">
                <span>Active Workers</span>
                <h2>{stats.activeWorkers}</h2>
              </div>
              <div className="stat-box">
                <span>Total Categories</span>
                <h2>{stats.totalCategories}</h2>
              </div>
              <div className="stat-box">
                <span>Total SubServices</span>
                <h2>{stats.totalSubServices}</h2>
              </div>
            </div>

            <div className="action-card">
              <h3>Worker Records</h3>
              <p>Access detailed logs of registered service providers.</p>
              <button className="btn-primary" onClick={handleViewAllWorks}>
                View Worker Log
              </button>
            </div>
          </>
        ) : (
          <div className="table-wrapper">
            <div className="table-header">
              <button
                className="btn-secondary"
                onClick={() => setShowTable(false)}
              >
                ← Back
              </button>

              <input
                type="text"
                placeholder="Search by name or skill"
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Skill</th>
                  <th>Location</th>
                  <th>Email</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {currentData.map((item) => (
                  <tr key={item.id}>
                    <td>{item.username}</td>
                    <td>{item.skill}</td>
                    <td>{item.location}</td>
                    <td>{item.email}</td>
                    <td>
                      <span className={item.available ? "status active" : "status busy"}>
                        {item.available ? "Available" : "Busy"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="pagination">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(p => p - 1)}
              >
                Prev
              </button>

              <span>
                Page {currentPage} of {totalPages || 1}
              </span>

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(p => p + 1)}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;