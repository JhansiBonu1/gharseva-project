import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const SubServiceView = () => {
  const { catId } = useParams();
  const { state } = useLocation(); 
  const [subs, setSubs] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3019/admin/subservices/${catId}`, { withCredentials: true })
      .then(res => setSubs(res.data))
      .catch(err => console.error(err));
  }, [catId]);

  return (
    <div style={{ padding: "40px", backgroundColor: "#F4F7FE", minHeight: "100vh" }}>
      <h2 style={{ color: "#2B3674" }}>Available {state?.name} Services</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", marginTop: "20px" }}>
        {subs.map(sub => (
          <div key={sub.id} onClick={() => nav(`/workers/${state.name}`)} // Filtering by Category Name (Skill)
               style={{ width: "180px", padding: "20px", background: "#fff", borderRadius: "20px", textAlign: "center", cursor: "pointer" }}>
            <img src={sub.imageUrl} alt={sub.name} style={{ width: "80px", height: "80px", borderRadius: "50%" }} />
            <h4 style={{ color: "#4318FF" }}>{sub.name}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubServiceView;