import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/categoriesDashboard.css";

function CategoriesDashboard() {
  const [categories, setCategories] = useState([]);
  const [expandedId, setExpandedId] = useState(null);

  const [newCategory, setNewCategory] = useState("");
  const [newCategoryImage, setNewCategoryImage] = useState("");

  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [editingSubId, setEditingSubId] = useState(null);

  const [editName, setEditName] = useState("");
  const [editImage, setEditImage] = useState("");

  const [newSub, setNewSub] = useState("");
  const [newSubImage, setNewSubImage] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const res = await axios.get(
      "http://localhost:3019/Mapping/admin/categories"
    );
    setCategories(res.data);
  };

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  // ================= CATEGORY =================

  const addCategory = async () => {
    if (!newCategory.trim()) return;

    await axios.post(
      "http://localhost:3019/Mapping/admin/category",
      {
        catname: newCategory,
        imageUrl: newCategoryImage,
      }
    );

    setNewCategory("");
    setNewCategoryImage("");
    fetchCategories();
  };

  const deleteCategory = async (id) => {
    if (!window.confirm("Delete this category?")) return;

    await axios.delete(
      `http://localhost:3019/Mapping/admin/category/${id}`
    );

    fetchCategories();
  };

  const updateCategory = async (id) => {
    await axios.put(
      `http://localhost:3019/Mapping/admin/category/${id}`,
      {
        catname: editName,
        imageUrl: editImage,
      }
    );

    setEditingCategoryId(null);
    fetchCategories();
  };

  // ================= SUBCATEGORY =================

  const addSubcategory = async (categoryId) => {
    if (!newSub.trim()) return;

    await axios.post(
      `http://localhost:3019/Mapping/admin/subcategory/${categoryId}`,
      {
        name: newSub,
        imageUrl: newSubImage,
      }
    );

    setNewSub("");
    setNewSubImage("");
    fetchCategories();
  };

  const deleteSubcategory = async (subId) => {
    if (!window.confirm("Delete this subcategory?")) return;

    await axios.delete(
      `http://localhost:3019/Mapping/admin/subcategory/${subId}`
    );

    fetchCategories();
  };

  const updateSubcategory = async (subId) => {
    await axios.put(
      `http://localhost:3019/Mapping/admin/subcategory/${subId}`,
      {
        name: editName,
        imageUrl: editImage,
      }
    );

    setEditingSubId(null);
    fetchCategories();
  };

  return (
    <div className="admin-container">
      <h2 className="admin-title">Category Management Dashboard</h2>

      {/* ADD CATEGORY */}
      <div className="add-section">
        <input
          type="text"
          placeholder="Category Name"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
        <input
          type="text"
          placeholder="Image URL"
          value={newCategoryImage}
          onChange={(e) => setNewCategoryImage(e.target.value)}
        />
        <button className="btn primary" onClick={addCategory}>
          + Add Category
        </button>
      </div>

      <div className="category-grid">
        {categories.map((cat) => (
          <div key={cat.id} className="category-card">
            {cat.imageUrl && (
              <img
                src={cat.imageUrl}
                alt={cat.catname}
                className="category-image"
              />
            )}

            {/* CATEGORY HEADER */}
            {editingCategoryId === cat.id ? (
              <div className="edit-container">
                <input
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  placeholder="Category Name"
                />
                <input
                  value={editImage}
                  onChange={(e) => setEditImage(e.target.value)}
                  placeholder="Image URL"
                />

                <div className="edit-buttons">
                  <button
                    className="btn success"
                    onClick={() => updateCategory(cat.id)}
                  >
                    Save
                  </button>
                  <button
                    className="btn secondary"
                    onClick={() => setEditingCategoryId(null)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="category-header">
                <h3 onClick={() => toggleExpand(cat.id)}>
                  {cat.catname}
                </h3>

                <div className="action-buttons">
                  <button
                    className="btn warning"
                    onClick={() => {
                      setEditingCategoryId(cat.id);
                      setEditName(cat.catname);
                      setEditImage(cat.imageUrl || "");
                    }}
                  >
                    Edit
                  </button>

                  <button
                    className="btn danger"
                    onClick={() => deleteCategory(cat.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}

            {/* SUBCATEGORIES */}
            {expandedId === cat.id && (
              <div className="subcategory-section">
                <h4>Subcategories</h4>

                {cat.subServices?.map((sub) => (
                  <div key={sub.id} className="subcategory-item">
                    {editingSubId === sub.id ? (
                      <div className="edit-container">
                        <input
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                        />
                        <input
                          value={editImage}
                          onChange={(e) => setEditImage(e.target.value)}
                        />

                        <div className="edit-buttons">
                          <button
                            className="btn success small"
                            onClick={() =>
                              updateSubcategory(sub.id)
                            }
                          >
                            Save
                          </button>
                          <button
                            className="btn secondary small"
                            onClick={() => setEditingSubId(null)}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="sub-info">
                          {sub.imageUrl && (
                            <img
                              src={sub.imageUrl}
                              alt={sub.name}
                              className="sub-image"
                            />
                          )}
                          <span>{sub.name}</span>
                        </div>

                        <div className="action-buttons">
                          <button
                            className="btn warning small"
                            onClick={() => {
                              setEditingSubId(sub.id);
                              setEditName(sub.name);
                              setEditImage(sub.imageUrl || "");
                            }}
                          >
                            Edit
                          </button>

                          <button
                            className="btn danger small"
                            onClick={() =>
                              deleteSubcategory(sub.id)
                            }
                          >
                            Delete
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                ))}

                {/* ADD SUBCATEGORY */}
                <div className="add-sub">
                  <input
                    type="text"
                    placeholder="Subcategory Name"
                    value={newSub}
                    onChange={(e) => setNewSub(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Image URL"
                    value={newSubImage}
                    onChange={(e) => setNewSubImage(e.target.value)}
                  />
                  <button
                    className="btn primary"
                    onClick={() => addSubcategory(cat.id)}
                  >
                    Add
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoriesDashboard;
