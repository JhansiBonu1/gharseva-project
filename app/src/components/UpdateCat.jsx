import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function UpdateCategorySub() {
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [updatedCategory, setUpdatedCategory] = useState({ catname: "", imageUrl: "" });
  const [categoryMsg, setCategoryMsg] = useState("");

  const [subServices, setSubServices] = useState([]);
  const [selectedSubId, setSelectedSubId] = useState(null);
  const [updatedSub, setUpdatedSub] = useState({ name: "", imageUrl: "" });
  const [subMsg, setSubMsg] = useState("");

  const navigate = useNavigate(); // for back button

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    axios.get("http://localhost:3019/usdb/categories")
      .then(res => setCategories(res.data))
      .catch(err => console.log("Error fetching categories", err));
  };

  const handleCategoryEdit = (cat) => {
    setSelectedCategoryId(cat.id);
    setUpdatedCategory({ catname: cat.catname, imageUrl: cat.imageUrl });
    setCategoryMsg("");
    setSelectedSubId(null);
    setSubMsg("");
    setUpdatedSub({ name: "", imageUrl: "" });
    setSubServices([]);
  };

  const updateCategory = () => {
    axios.put(`http://localhost:3019/admin/update-category/${selectedCategoryId}`, updatedCategory)
      .then(() => {
        setCategoryMsg("Category updated successfully!");
        setTimeout(() => setCategoryMsg(""), 2000);
        setSelectedCategoryId(null);
        setUpdatedCategory({ catname: "", imageUrl: "" });
        fetchCategories();
      })
      .catch(err => console.error("Error updating category", err));
  };

  const fetchSubServices = (categoryId) => {
    setSubServices([]);
    axios.get(`http://localhost:3019/usdb/subservices/${categoryId}`)
      .then(res => {
        setSubServices(res.data);
        setSelectedSubId(null);
        setUpdatedSub({ name: "", imageUrl: "" });
        setSubMsg("");
      })
      .catch(err => console.log("Error fetching subservices", err));
  };

  const handleSubEdit = (sub) => {
    setSelectedSubId(sub.id);
    setUpdatedSub({ name: sub.name, imageUrl: sub.imageUrl });
    setSubMsg("");
    setCategoryMsg("");
  };

  const updateSub = () => {
    axios.put(`http://localhost:3019/admin/update-subservice/${selectedSubId}`, updatedSub)
      .then(() => {
        setSubMsg("Subcategory updated successfully!");
        setTimeout(() => setSubMsg(""), 2000);
        const updatedList = subServices.map((s) =>
          s.id === selectedSubId ? { ...s, ...updatedSub } : s
        );
        setSubServices(updatedList);
        setSelectedSubId(null);
        setUpdatedSub({ name: "", imageUrl: "" });
      })
      .catch(err => console.error("Error updating subcategory", err));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Update Categories & Subcategories</h2>

      <button onClick={() => navigate("/admin")} style={{ marginBottom: "20px" }}>
        ← Back to Admin Page
      </button>

      {categories.map(cat => (
        <div key={cat.id} style={{ marginBottom: "10px" }}>
          <strong>{cat.catname}</strong>
          <button onClick={() => handleCategoryEdit(cat)} style={{ marginLeft: "10px" }}>Edit</button>
          <button onClick={() => fetchSubServices(cat.id)} style={{ marginLeft: "10px" }}>Show Subcategories</button>
        </div>
      ))}

      {selectedCategoryId && (
        <div style={{ marginTop: "20px" }}>
          <h4>Edit Category</h4>
          <input
            type="text"
            placeholder="Category Name"
            value={updatedCategory.catname}
            onChange={(e) => setUpdatedCategory({ ...updatedCategory, catname: e.target.value })}
          />
          <input
            type="text"
            placeholder="Image URL"
            value={updatedCategory.imageUrl}
            onChange={(e) => setUpdatedCategory({ ...updatedCategory, imageUrl: e.target.value })}
          />
          <button onClick={updateCategory}>Update Category</button>
          {categoryMsg && <p style={{ color: "green" }}>{categoryMsg}</p>}
        </div>
      )}

      {subServices.length > 0 && (
        <div style={{ marginTop: "30px" }}>
          <h3>Subcategories</h3>
          {subServices.map(sub => (
            <div key={sub.id} style={{ marginBottom: "10px" }}>
              <strong>{sub.name}</strong>
              <button onClick={() => handleSubEdit(sub)} style={{ marginLeft: "10px" }}>Edit</button>
            </div>
          ))}
        </div>
      )}

      {selectedSubId && (
        <div style={{ marginTop: "20px" }}>
          <h4>Edit Subcategory</h4>
          <input
            type="text"
            placeholder="Subcategory Name"
            value={updatedSub.name}
            onChange={(e) => setUpdatedSub({ ...updatedSub, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Image URL"
            value={updatedSub.imageUrl}
            onChange={(e) => setUpdatedSub({ ...updatedSub, imageUrl: e.target.value })}
          />
          <button onClick={updateSub}>Update Subcategory</button>
          {subMsg && <p style={{ color: "green" }}>{subMsg}</p>}
        </div>
      )}
    </div>
  );
}

export default UpdateCategorySub;
