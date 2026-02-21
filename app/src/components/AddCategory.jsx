import { useState } from "react";
import axios from "axios";

function AddCategory() {
  const [category, setCategory] = useState({ catname: "", imageUrl: "" });
  const [categoryAdded, setCategoryAdded] = useState(false);
  const [subService, setSubService] = useState({ name: "", imageUrl: "" });

  const styles = {
    container: { maxWidth: "500px", margin: "60px auto", padding: "40px", backgroundColor: "#FFFFFF", borderRadius: "20px", boxShadow: "0px 18px 40px rgba(112, 144, 176, 0.12)", fontFamily: "'Plus Jakarta Sans', sans-serif" },
    title: { color: "#2B3674", fontSize: "24px", fontWeight: "700", marginBottom: "10px" },
    subtitle: { color: "#A3AED0", fontSize: "14px", marginBottom: "25px" },
    input: { width: "100%", padding: "12px 16px", borderRadius: "12px", border: "1px solid #E9EDF7", marginBottom: "20px", fontSize: "14px", boxSizing: "border-box" },
    button: { width: "100%", padding: "14px", backgroundColor: "#4318FF", color: "#fff", border: "none", borderRadius: "12px", fontWeight: "700", cursor: "pointer", transition: "0.3s" },
    successBox: { padding: "10px", backgroundColor: "#E2F9EF", color: "#10B981", borderRadius: "8px", marginBottom: "20px", fontSize: "12px", textAlign: "center" }
  };

  const CatChange = (e) => setCategory({ ...category, [e.target.name]: e.target.value });
  const SubChange = (e) => setSubService({ ...subService, [e.target.name]: e.target.value });

  const submitCategory = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3019/Mapping/admin/category", category);
      alert("Category added!");
      localStorage.setItem("catId", res.data.id);
      setCategoryAdded(true);
    } catch (err) {
      console.log(err);
      alert("Error adding category");
    }
  };

  const submitSub = async (e) => {
    e.preventDefault();
    const catId = localStorage.getItem("catId");
    if (!catId) return alert("Category ID missing!");
    try {
      const newSub = { ...subService, category: { id: catId } };
      await axios.post("http://localhost:3019/Mapping/admin/subcategory", newSub);
      alert("Subcategory added!");
      setSubService({ name: "", imageUrl: "" });
    } catch (err) {
      console.log(err);
      alert("Error adding subcategory");
    }
  };

  return (
    <div style={styles.container}>
      {!categoryAdded ? (
        <>
          <h2 style={styles.title}>Add Category</h2>
          <p style={styles.subtitle}>Create a new main service category for Ghar Seva.</p>
          <form onSubmit={submitCategory}>
            <label>Category Name</label>
            <input style={styles.input} type="text" name="catname" placeholder="e.g., Plumbing" value={category.catname} onChange={CatChange} />
            <label>Icon/Image URL</label>
            <input style={styles.input} type="text" name="imageUrl" placeholder="Paste link here" value={category.imageUrl} onChange={CatChange} />
            <button style={styles.button} type="submit">Continue to Subcategories</button>
          </form>
        </>
      ) : (
        <>
          <div style={styles.successBox}>✔ Parent Category "{category.catname}" created</div>
          <h2 style={styles.title}>Add Sub-Service</h2>
          <p style={styles.subtitle}>Define specific tasks under {category.catname}.</p>
          <form onSubmit={submitSub}>
            <label>Sub-Service Name</label>
            <input style={styles.input} type="text" name="name" placeholder="e.g., Leakage Repair" value={subService.name} onChange={SubChange} />
            <label>Service Image URL</label>
            <input style={styles.input} type="text" name="imageUrl" placeholder="Paste link here" value={subService.imageUrl} onChange={SubChange} />
            <button style={{ ...styles.button, backgroundColor: "#10B981" }} type="submit">Add Sub-Service</button>
            <button type="button" onClick={() => setCategoryAdded(false)} style={{ ...styles.button, backgroundColor: "transparent", color: "#A3AED0", marginTop: "10px" }}>
              Add another main category
            </button>
          </form>
        </>
      )}
    </div>
  );
}

export default AddCategory;
