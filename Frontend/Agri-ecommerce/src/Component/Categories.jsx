import { useEffect, useState } from "react";
import { getAllCategories } from "../Service/Api";
import { useNavigate } from "react-router-dom";
const Categories = () => {
  const [categories, setCategories] = useState([]);
const navigate =useNavigate();
  const fetchCategories = async () => {
    try {
      const response = await getAllCategories();
      setCategories(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <section className="categories">
      <h2>Shop By Categories</h2>

      <div className="category-grid">
        {categories.map((category) => (
          <div key={category.id} className="category-card">

            <img
              src={category.image}
              alt={category.name}
            />

            <h3>{category.name}</h3>
            <button className ="explore-btn"
            onClick={()=>
              navigate(`/products?category=${category.id}`)
            }>Explore Products → </button>

          </div>
        ))}
      </div>
    </section>
  );
};

export default Categories;