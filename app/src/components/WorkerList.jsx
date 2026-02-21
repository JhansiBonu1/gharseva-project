import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const WorkerList = () => {
  const { skill } = useParams();
  const [workers, setWorkers] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3019/admin/workers/skill/${skill}`, { withCredentials: true })
      .then(res => setWorkers(res.data))
      .catch(err => console.error(err));
  }, [skill]);

  return (
    <div style={{ padding: "40px" }}>
      <h2>Available {skill} Experts</h2>
      {workers.length > 0 ? workers.map(w => (
        <div key={w.id} style={{ padding: "20px", marginBottom: "15px", backgroundColor: "#fff", borderRadius: "15px", display: "flex", justifyContent: "space-between", alignItems: "center", boxShadow: "0 5px 15px rgba(0,0,0,0.05)" }}>
          <div>
            <h3 style={{ margin: 0 }}>{w.username}</h3>
            <p style={{ color: "#A3AED0" }}>Location: {w.location}</p>
          </div>
          <button style={{ backgroundColor: "#0fb78d", color: "#fff", border: "none", padding: "10px 20px", borderRadius: "8px", cursor: "pointer", fontWeight: "bold" }}
                  onClick={() => alert("OTP has been sent to your mobile for confirmation!")}>
            Book Now
          </button>
        </div>
      )) : <p>Currently no workers available for {skill}. Try again later!</p>}
    </div>
  );
};

export default WorkerList;