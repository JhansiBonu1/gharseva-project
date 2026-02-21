import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/AddWorker.css";
function AddWorker() {
  const nav = useNavigate();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    location: "",
    skill: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  const payload = {
    ...form,
    account: { id: localStorage.getItem("userid") || 1 }
  };

  try {
    const res = await axios.post("http://localhost:3019/wkdb/worker", payload, {
      withCredentials: true 
    });
    console.log("Response:", res.data); // Fixed 'res' warning
    alert("✅ Worker added successfully!");
    nav("/admin");
  } catch (err) {
    if (!err.response) {
      // This happens if the server is NOT RUNNING
      alert("❌ Connection Refused: Please start your Spring Boot application.");
    } else {
      // This happens if the email is a duplicate or data is bad
      alert("❌ " + (err.response.data || "Error adding worker"));
    }
  }
};

  /*return (
    <div style={containerStyle}>
      <h2 style={{ color: "#10B981", textAlign: "center" }}>👷 Add New Worker</h2>
      <form onSubmit={handleSubmit}>
        <input style={inputStyle} name="username" placeholder="Full Name" onChange={handleChange} required />
        <input style={inputStyle} name="email" type="email" placeholder="Email Address" onChange={handleChange} required />
        <input style={inputStyle} name="location" placeholder="City/Location" onChange={handleChange} required />
        <input style={inputStyle} name="skill" placeholder="Skill (e.g. Plumber)" onChange={handleChange} required />
        <button style={btnStyle} type="submit">Add Worker</button>
      </form>
    </div>
  );*/

  return (
  <div className="add-worker-page">
    <div className="add-worker-card">
      <h2>👷 Add New Worker</h2>

      <div className="form-group">
        <input
          name="username"
          placeholder="Full Name"
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <input
          name="email"
          type="email"
          placeholder="Email Address"
          onChange={handleChange}
        />
      </div>
      
      <div className="form-group">
  <input
    name="password"
    type="password"
    placeholder="Password"
    onChange={handleChange}
    required
  />
</div>

      <div className="form-group">
        <input
          name="location"
          placeholder="City / Location"
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <input
          name="skill"
          placeholder="Skill (e.g. Plumber)"
          onChange={handleChange}
        />
      </div>

      <button className="add-worker-btn" onClick={handleSubmit}>
        Add Worker
      </button>
    </div>
  </div>
);

}


export default AddWorker;