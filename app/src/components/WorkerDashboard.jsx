import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/WorkerDashboard.css";



function WorkerDashboard() {
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

  const updateStatus = (id, status) => {
  axios
    .put(`http://localhost:3019/Mapping/status/${id}?status=${status}`)
    .then(() => {
      alert(`Work ${status}`);
      // Update status in local state instead of reloading
      setAssignedWork(prev =>
        prev.map(work =>
          work.id === id ? { ...work, workStatus: status } : work
        )
      );
    })
    .catch(() => alert("Error updating work status"));
};

  return (
  <div className="worker-dashboard">
    <div className="dashboard-header">
      <h2>Worker Dashboard</h2>
      <p className="sub-text">Manage your assigned jobs efficiently</p>
    </div>

    {/* Stats Section */}
    <div className="stats-container">
      <div className="stat-card">
        <h3>{assignedWork.length}</h3>
        <p>Total Assigned</p>
      </div>

      <div className="stat-card">
        <h3>
          {assignedWork.filter(w => w.workStatus === "Accepted").length}
        </h3>
        <p>Accepted</p>
      </div>

      <div className="stat-card">
        <h3>
          {assignedWork.filter(w => w.workStatus === "Rejected").length}
        </h3>
        <p>Rejected</p>
      </div>
    </div>

    {/* Table Section */}
    <div className="table-container">
      {assignedWork.length === 0 ? (
        <p className="no-work">No work assigned yet.</p>
      ) : (
        <table className="modern-table">
          <thead>
            <tr>
              <th>Work</th>
              <th>User</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {assignedWork.map((work) => (
              <tr key={work.id}>
                <td>{work.workName}</td>
                <td>{work.userName}</td>
                <td>{new Date(work.dateTime).toLocaleString()}</td>
                <td>
                  <span className={`status-badge ${work.workStatus?.toLowerCase() || "assigned"}`}>
                    {work.workStatus || "Assigned"}
                  </span>
                </td>
                <td>
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  </div>
);
}

export default WorkerDashboard;
