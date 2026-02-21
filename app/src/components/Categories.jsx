import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/categories.css";

function Categories() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [subServices, setSubServices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3019/usdb/categories")
      .then((res) => setCategories(res.data))
      .catch((err) => console.log("Error fetching categories", err));
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    axios
      .get(`http://localhost:3019/usdb/subservices/${category.id}`)
      .then((res) => setSubServices(res.data))
      .catch((err) => console.log("Error fetching subservices", err));
  };

  const clearSelection = () => {
    setSelectedCategory(null);
    setSubServices([]);
  };

  const handleSubcategoryClick = (sub) => {
    const location = localStorage.getItem("location");
    if (!location) {
      alert("Please set your location first.");
      return;
    }
    navigate(`/avworks/${encodeURIComponent(sub.name)}`, {
      state: { fromSubcategory: true },
    });
  };

  return (
    <div className="categories-page">
      {!selectedCategory ? (
        <>
          <h2 className="page-title">Service Categories</h2>
          <div className="card-container">
            {categories.map((cat) => (
              <div
                className="card"
                key={cat.id}
                onClick={() => handleCategoryClick(cat)}
              >
                <img
                  src={cat.imageUrl || "https://via.placeholder.com/300"}
                  alt={cat.catname}
                  className="card-image"
                />
                <h3>{cat.catname}</h3>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="fade-slide">
          <button className="back-btn" onClick={clearSelection}>
            ← Back to Categories
          </button>

          <h2 className="page-title">
            {selectedCategory.catname} Services
          </h2>

          {subServices.length === 0 ? (
            <p className="empty-text">
              No subcategories found for this category.
            </p>
          ) : (
            <div className="card-container">
              {subServices.map((sub) => (
                <div
                  className="card"
                  key={sub.id}
                  onClick={() => handleSubcategoryClick(sub)}
                >
                  <img
                    src={sub.imageUrl || "https://via.placeholder.com/300"}
                    alt={sub.name}
                    className="card-image"
                  />
                  <h4>{sub.name}</h4>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Categories;
