import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/AllWorkers.css";
function AllWorkers() {
  console.log("AllWorkers component rendered");
  const [workers, setWorkers] = useState([]);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({});
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  // Fetch all workers on mount
  useEffect(() => {
  axios.get("http://localhost:3019/wkdb/workers")
    .then((res) => {
      const unique = Array.from(
        new Map(res.data.map((w) => [w.id, w])).values()
      );
      console.log("Fetched workers (deduped):", unique);
      setWorkers(unique);
    })
    .catch((err) => console.error("Error fetching workers", err));
}, []);

  // Handle delete
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this worker?")) {
      axios.delete(`http://localhost:3019/wkdb/delete-worker/${id}`)
        .then(() => setWorkers((prev) => prev.filter((w) => w.id !== id)));
    }
  };

  // Handle edit initiation
  const handleEdit = (worker) => {
    setEditId(worker.id);
    setForm(worker);
  };

  // Handle update save
  const handleUpdate = () => {
  const completeForm = {
    id: editId,
    username: form.username || "",
    email: form.email || "",
    phone: form.phone || "",
    skill: form.skill || "",
    location: form.location || "",
    description: form.description || "",
    available: form.available || false
  };

  axios.put(`http://localhost:3019/wkdb/update-worker/${editId}`, completeForm)
    .then((res) => {
      const updated = res.data;
      
      // Defensive check: if updated.id is undefined, fallback to editId
      const updatedId = updated?.id ?? editId;

      if (!updated || !updatedId) {
        alert("Update failed: Invalid response from server.");
        return;
      }

      setWorkers((prev) =>
        prev.map((w) => (w.id === updatedId ? { ...updated } : w))
      );
      setEditId(null);
    })
    .catch((err) => {
      console.error("Update error:", err);
      alert("Update failed. Please try again.");
    });
};



  // Filter workers based on search term (search "" matches all)
  const filteredWorkers = workers.filter((w) => 
    w.username.toLowerCase().includes(search.toLowerCase()) ||
    w.skill.toLowerCase().includes(search.toLowerCase()) ||
    w.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
  <div className="all-workers">
    <div className="workers-header">
      <h2>Manage Workers</h2>

      <div className="workers-actions">
        <input
          type="text"
          placeholder="Search by name, skill, or location"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
        <button className="btn-secondary" onClick={() => setSearch("")}>
          Clear
        </button>
        <button className="btn-primary" onClick={() => navigate("/Admin")}>
          Back to Dashboard
        </button>
      </div>
    </div>

    {filteredWorkers.length === 0 ? (
      <p className="no-data">No workers available.</p>
    ) : (
      <div className="worker-grid">
        {filteredWorkers.map((w) => (
          <div key={w.id} className="worker-card">
            {editId === w.id ? (
              <div className="edit-form">
                <input value={form.username}
                  onChange={(e) => setForm({ ...form, username: e.target.value })} />
                <input value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })} />
                <input value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                <input value={form.skill}
                  onChange={(e) => setForm({ ...form, skill: e.target.value })} />
                <input value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })} />
                <textarea value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })} />

                <label className="checkbox">
                  <input
                    type="checkbox"
                    checked={form.available}
                    onChange={(e) =>
                      setForm({ ...form, available: e.target.checked })
                    }
                  />
                  Available
                </label>

                <div className="card-buttons">
                  <button className="btn-success" onClick={handleUpdate}>
                    Save
                  </button>
                  <button className="btn-danger" onClick={() => setEditId(null)}>
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="card-header">
                  <h3>{w.username}</h3>
                  <span className={w.available ? "badge available" : "badge busy"}>
                    {w.available ? "Available" : "Busy"}
                  </span>
                </div>

                <div className="card-body">
                  <p><strong>Email:</strong> {w.email}</p>
                  <p><strong>Phone:</strong> {w.phone}</p>
                  <p><strong>Skill:</strong> {w.skill}</p>
                  <p><strong>Location:</strong> {w.location}</p>
                  <p className="description">{w.description}</p>
                </div>

                <div className="card-buttons">
                  <button className="btn-primary" onClick={() => handleEdit(w)}>
                    Edit
                  </button>
                  <button className="btn-danger" onClick={() => handleDelete(w.id)}>
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    )}
  </div>
);
}

export default AllWorkers;
