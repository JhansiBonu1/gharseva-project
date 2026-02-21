import React, { useState, useEffect } from "react";
import axios from "axios";

const ManageBookings = () => {
  const [details, setDetails] = useState([]);
  const [workers, setWorkers] = useState([]);
  const [selectedWorker, setSelectedWorker] = useState({});
  const [summary, setSummary] = useState({});
  const [filterStatus, setFilterStatus] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    // Fetch bookings
    axios.get("http://localhost:3019/Mapping/admin/all")
      .then(res => setDetails(res.data))
      .catch(err => console.error(err));

    // Fetch workers
    axios.get("http://localhost:3019/admin/workers")
      .then(res => setWorkers(res.data))
      .catch(err => console.error(err));

    // Fetch summary
    axios.get("http://localhost:3019/Mapping/admin/summary")
      .then(res => setSummary(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  };

  const assignWorker = (bookingId) => {
    const workerId = selectedWorker[bookingId];

    if (!workerId) {
      alert("⚠ Please select a worker first");
      return;
    }

    axios.put(
      `http://localhost:3019/Mapping/assign-worker/${bookingId}/${workerId}`
    )
    .then(() => {
      alert("✅ Worker Assigned Successfully");
      fetchData(); // Refresh data
    })
    .catch(err => {
      console.error(err);
      alert("❌ Assignment failed");
    });
  };

  if (loading) return <p style={{ padding: "40px" }}>Loading dashboard...</p>;

  const cardStyle = {
    flex: 1,
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "15px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
    textAlign: "center"
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed": return "#10B981";
      case "Cancelled": return "#FF4D4D";
      case "InProgress": return "#FBBF24";
      default: return "#3B82F6";
    }
  };

  const getPaymentColor = (moneyStatus) =>
    moneyStatus === "Paid" ? "#10B981" : "#FF4D4D";

  return (
    <div style={{ padding: "40px", backgroundColor: "#F4F7FE", minHeight: "100vh" }}>
      <h2 style={{ color: "#2B3674", marginBottom: "20px" }}>
        📋 Manage Bookings Dashboard
      </h2>

      {/* Summary Cards */}
      <div style={{ display: "flex", gap: "20px", marginBottom: "30px" }}>
        <div style={cardStyle}>
          <h4>Total Bookings</h4>
          <p>{summary.totalBookings || 0}</p>
        </div>
        <div style={cardStyle}>
          <h4>Completed</h4>
          <p>{summary.completed || 0}</p>
        </div>
        <div style={cardStyle}>
          <h4>Cancelled</h4>
          <p>{summary.cancelled || 0}</p>
        </div>
        <div style={cardStyle}>
          <h4>Total Revenue</h4>
          <p>₹{summary.revenue || 0}</p>
        </div>
      </div>

      {/* Filter */}
      <div style={{ marginBottom: "20px" }}>
        <label style={{ marginRight: "10px", fontWeight: "bold" }}>
          Filter by Status:
        </label>
        <select
          value={filterStatus}
          onChange={e => setFilterStatus(e.target.value)}
          style={{ padding: "5px 10px", borderRadius: "5px", border: "1px solid #ccc" }}
        >
          <option value="">All</option>
          <option value="Assigned">Assigned</option>
          <option value="InProgress">InProgress</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      {/* Table */}
      <div style={{
        backgroundColor: "#fff",
        padding: "20px",
        borderRadius: "20px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.05)"
      }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #E9EDF7", textAlign: "left" }}>
              <th>ID</th>
              <th>Customer</th>
              <th>Worker</th>
              <th>Service</th>
              <th>Status</th>
              <th>Payment</th>
              <th>OTP</th>
              <th>Arrived</th>
              <th>Rating</th>
              <th>Assign Worker</th>
            </tr>
          </thead>
          <tbody>
            {details
              .filter(d => !filterStatus || d.workStatus === filterStatus)
              .map(d => (
              <tr key={d.id} style={{ borderBottom: "1px solid #F4F7FE" }}>
                <td>{d.id}</td>
                <td>{d.userName || "Guest"}</td>
                <td>{d.workerName || "Not Assigned"}</td>
                <td>{d.workName}</td>
                <td style={{ color: getStatusColor(d.workStatus), fontWeight: "bold" }}>
                  {d.workStatus}
                </td>
                <td style={{ color: getPaymentColor(d.moneyStatus), fontWeight: "bold" }}>
                  {d.moneyStatus}
                </td>
                <td style={{ color: d.otpVerified ? "#10B981" : "#FF4D4D" }}>
                  {d.otpVerified ? "Verified" : "Pending"}
                </td>
                <td>{d.workerReached ? "✅" : "❌"}</td>
                <td>{d.rating ? d.rating + " ⭐" : "N/A"}</td>

                {/* Assign Worker Column */}
                <td>
                  {d.workerName ? (
                    "Assigned"
                  ) : (
                    <>
                      <select
                        value={selectedWorker[d.id] || ""}
                        onChange={(e) =>
                          setSelectedWorker({
                            ...selectedWorker,
                            [d.id]: e.target.value
                          })
                        }
                      >
                        <option value="">Select Worker</option>
                        {workers
                          .filter(w => w.available)
                          .map(w => (
                            <option key={w.id} value={w.id}>
                              {w.username} ({w.skill})
                            </option>
                          ))}
                      </select>

                      <button
                        onClick={() => assignWorker(d.id)}
                        style={{ marginLeft: "5px" }}
                      >
                        Assign
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageBookings;