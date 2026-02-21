import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/UserDashboard.css";

function UserDashboard() {
  const nav = useNavigate();
  
  // Views: 'categories', 'subcategories', 'bookingForm', or 'table'
  const [view, setView] = useState("categories"); 
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubService, setSelectedSubService] = useState(null);
  
  // Form & Data States
  const [form, setForm] = useState({ location: "", phone: "", dateTime: "" });
  const [myData, setMyData] = useState([]);
  const [search, setSearch] = useState("");      // Error fixed: Ensure unique declaration
  const [currentPage, setCurrentPage] = useState(1);
  //const [otpMap, setOtpMap] = useState({});
  const rowsPerPage = 5;

  const email = localStorage.getItem("email");

  // --- Functions ---
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

  // Pagination Logic
  const filteredData = myData.filter((item) =>
    [item.workName, item.workerName, item.workStatus].join(" ").toLowerCase().includes(search.toLowerCase())
  );
  const currentData = filteredData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);
  const totalPages = Math.ceil(filteredData.length / rowsPerPage) || 1;

  return (
    <div className="user-dashboard-wrapper">
      <div className="dashboard-header">
        <div className="dashboard-nav">
           <button onClick={() => setView("categories")}>🏠 Services</button>
           <button onClick={viewBookings}>📋 My Bookings</button>
        </div>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>

      {view === "categories" && (
        <div className="category-section">
          <h1 className="section-title">Select a Service Category</h1>
          <div className="category-grid">
            {categories.map(cat => (
              <div key={cat.id} className="category-card" onClick={() => handleCategoryClick(cat)}>
                <div className="card-image-wrapper">
                  <img src={cat.imageUrl} alt={cat.catname} className="service-img" />
                </div>
                <div className="card-content"><h3>{cat.catname}</h3></div>
              </div>
            ))}
          </div>
        </div>
      )}

      {view === "subcategories" && (
        <div className="category-section">
          <h1 className="section-title">Available Tasks in {selectedCategory?.catname}</h1>
          <button className="back-btn" onClick={() => setView("categories")}>← Back</button>
          <div className="category-grid">
            {subCategories.map(sub => (
              <div key={sub.id} className="category-card" onClick={() => handleSubServiceClick(sub)}>
                <div className="card-image-wrapper">
                  <img src={sub.imageUrl} alt={sub.name} className="service-img" />
                </div>
                <div className="card-content"><h3>{sub.name}</h3></div>
              </div>
            ))}
          </div>
        </div>
      )}

      {view === "bookingForm" && (
        <div className="booking-form-container">
          <h1>Requesting {selectedSubService?.name}</h1>
          <form onSubmit={submitBooking} className="dashboard-form">
            <input type="text" name="location" placeholder="Address" onChange={change} required />
            <input type="text" name="phone" placeholder="Phone" onChange={change} required />
            <input type="datetime-local" name="dateTime" onChange={change} required />
            <div className="form-btns">
                <button type="submit" className="submit-btn">Confirm</button>
                <button type="button" onClick={() => setView("subcategories")}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      {view === "table" && (
        <div className="bookings-table-container">
          <h2>My Active Requests</h2>
          <input 
            type="text" 
            placeholder="Search..." 
            value={search} 
            onChange={(e) => setSearch(e.target.value)} 
            className="table-search"
          />
          <table className="bookings-table">
            <thead>
              <tr><th>Service</th><th>Worker</th><th>Status</th><th>Time</th></tr>
            </thead>
            <tbody>
              {currentData.map((item) => (
                <tr key={item.id}>
                  <td>{item.workName}</td>
                  <td>{item.workerName || "Pending"}</td>
                  <td>{item.workStatus}</td>
                  <td>{new Date(item.dateTime).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination">
            <button onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1}>Prev</button>
            <span> {currentPage} / {totalPages} </span>
            <button onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages}>Next</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserDashboard;