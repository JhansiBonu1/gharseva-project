import { useEffect, useState } from "react";
import axios from "axios";

function AddSubCategory() {
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [subService, setSubService] = useState({ name: "", imageUrl: "" });

  useEffect(() => {
    axios.get("http://localhost:3019/Mapping/admin/categories")
      .then((res) => setCategories(res.data))
      .catch((err) => {
        console.error("Failed to fetch categories", err);
        alert("Could not load categories.");
      });
  }, []);

  const handleChange = (e) => setSubService({ ...subService, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedCategoryId || !subService.name || !subService.imageUrl) {
      alert("Please fill all fields.");
      return;
    }
    const payload = { ...subService, category: { id: selectedCategoryId } };
    try {
      await axios.post("http://localhost:3019/Mapping/admin/subcategory", payload);
      alert("Subcategory added successfully!");
      setSubService({ name: "", imageUrl: "" });
    } catch (err) {
      console.error(err);
      alert("Failed to add subcategory.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Add SubCategory for Existing Category</h2>
      <form onSubmit={handleSubmit}>
        <select value={selectedCategoryId} onChange={(e) => setSelectedCategoryId(e.target.value)}>
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>{cat.catname}</option>
          ))}
        </select><br /><br />
        <input type="text" name="name" placeholder="Subcategory Name" value={subService.name} onChange={handleChange} /><br /><br />
        <input type="text" name="imageUrl" placeholder="Image URL" value={subService.imageUrl} onChange={handleChange} /><br /><br />
        <button type="submit">Add SubCategory</button>
      </form>
    </div>
  );
}

export default AddSubCategory;
