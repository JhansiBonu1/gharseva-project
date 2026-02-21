import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

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
          console.log("Worker details response:", res.data);
          setWorker(res.data);
          localStorage.setItem("phone", res.data.phone);
          console.log(res.data.phone);
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
    // You can replace this with your actual request logic
  };

  const handleBack = () => {
    navigate(-1); // Go back to previous page (subcategory list)
  };

  if (loading) return <p>Loading...</p>;
  if (!worker) return <p>No worker found.</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Worker Details</h2>
      <div
        style={{
          border: "1px solid #ccc",
          padding: "20px",
          width: "300px",
          background: "#f9f9f9",
        }}
      >
        <p><strong>Name:</strong> {worker.username || "N/A"}</p>
        <p><strong>Email:</strong> {worker.email || "N/A"}</p>
        <p><strong>Phone:</strong> {worker.phone || "N/A"}</p>
        <p><strong>Location:</strong> {worker.location || "N/A"}</p>
        <p><strong>Skill:</strong> {worker.skill || "N/A"}</p>
        <p><strong>Available:</strong> {worker.available ? "Yes" : "No"}</p>
        <p><strong>Description:</strong> {worker.description || "N/A"}</p>

        {/* Buttons */}
        <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
          <button onClick={handleSendRequest}>Send Request</button>
          <button onClick={handleBack}>← Back</button>
        </div>
      </div>
    </div>
  );
}

export default Workerdetails;
