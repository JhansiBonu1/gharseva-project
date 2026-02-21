import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function AvailableWorkers() {
  const { skill } = useParams();
  const [workers, setWorkers] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3019/wkdb/search/skill", {
        params: { skill: skill },
      })
      .then((res) => {
        setWorkers(res.data);
      })
      .catch((err) => console.error("Error fetching workers by skill", err));
  }, [skill]);

  const filteredWorkers = workers.filter((w) =>
    w.location?.toLowerCase().includes(search.toLowerCase())
  );
  const sendOtpToWorker = (id) => {
  axios.post(`http://localhost:3019/Mapping/send-otp/${id}`)
    .then(res => {
      alert(res.data); // should say "OTP sent to worker"
    })
    .catch(err => {
      console.error("Error sending OTP:", err);
      alert("Failed to send OTP");
    });
};
 const assignWork = (worker) => {
  const workDetails = {
    workName: skill,
    userName: localStorage.getItem("username"),
    userEmail: localStorage.getItem("email"),
    userPhone: localStorage.getItem("phone"),
    workerName: worker.username,
    workerEmail: worker.email,
    workerPhone: worker.phone,
    workStatus: "Assigned",
    moneyStatus: "Pending",
    isAcceptedByUser: true,
    isAcceptedByWorker: false,
    isCompleted: false,
    isCancelled: false,
    dateTime: new Date().toISOString()
  };
  axios
    .post("http://localhost:3019/Mapping/assign", workDetails)
    .then((res) => {
      alert("Work has been assigned. Please wait for response.");
      console.log(res);

      // ✅ After assigning, send WhatsApp message
      const message = `Hello ${worker.username},\nYou have a new work assigned for: ${skill}.\nPlease check your dashboard and click on accept or reject and if any queries please contact to this number.`;

      axios
        .post("http://localhost:3019/api/whatsapp/send", null, {
          params: {
            number: `+91${worker.phone}`,
            message: message
          }
        })
        .then((response) => {
          console.log("WhatsApp sent:", response.data);
        })
        .catch((error) => {
          console.error("WhatsApp error:", error);
        });

    })
    .catch((err) => {
      alert("Failed to assign work.");
      console.error(err);
    });
};


  return (
    <div style={{ padding: "20px" }}>
      <h2>Available Workers for "{skill}"</h2>

      <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
        <input
          type="text"
          placeholder="Search by location"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={() => setSearch("")}> Clear</button>
        <button onClick={() => navigate("/cat")}>← Back to Categories</button>
      </div>

      {filteredWorkers.length === 0 ? (
        <p>No workers found for this skill and location.</p>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
          {filteredWorkers.map((worker) => (
            <div
              key={worker.id}
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                width: "250px",
                background: "#f3f3f3",
              }}
            >
              <p><strong>Name:</strong> {worker.username}</p>
              <p><strong>Location:</strong> {worker.location}</p>
              <p><strong>Skill:</strong> {worker.skill}</p>
              <p><strong>Available:</strong> {worker.available ? "Yes" : "No"}</p>

              <button
                onClick={() => navigate(`/worker/details/${worker.id}`)}
                style={{ marginRight: "10px" }}
              >
                View Details
              </button>

              <button onClick={() => assignWork(worker)}>
                Assign Work
              </button>
              <button onClick={() => sendOtpToWorker(worker.id)}>
                Worker Arrived
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AvailableWorkers;
