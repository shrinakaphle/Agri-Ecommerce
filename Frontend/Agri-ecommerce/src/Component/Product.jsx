// import {
//   useEffect,
//   useState,
// } from "react";

// import {
//   useParams,
//   useNavigate,
// } from "react-router-dom";

// import Api from "../Service/Api";

// const Products = () => {

//   const [products,
//     setProducts] =
//       useState([]);

//   const { id } =
//     useParams();

//   const navigate =
//     useNavigate();

//   useEffect(() => {

//     if (id) {

//       Api.get(
//         `/api/products/category/${id}`
//       )
//       .then((res) =>
//         setProducts(
//           res.data
//         )
//       );

//     } else {

//       Api.get(
//         "/api/products"
//       )
//       .then((res) =>
//         setProducts(
//           res.data
//         )
//       );

//     }

//   }, [id]);

//   return (
    

//     <div className="products-page">

//       <div className="products-grid">

//         {products.map(
//           (product) => (

//           <div
//             key={product.id}
//             className="product-card"
//           >

//             <img
//               src={product.image}
//               alt=""
//             />

//             <h3>
//               {product.name}
//             </h3>

//             <p>
//               Rs. {product.price}
//             </p>

//             <button
//               onClick={() =>
//                 navigate(
//                   `/product/${product.id}`
//                 )
//               }
//             >
//               View Details
//             </button>

//           </div>

//         ))}

//       </div>

//     </div>

//   );
// };

// export default Products;
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Api from "../Service/Api";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      Api.get(`/api/products/category/${id}`).then((res) =>
        setProducts(res.data)
      );
    } else {
      Api.get("/api/products").then((res) => setProducts(res.data));
    }
  }, [id]);

  // 🔍 SEARCH FILTER
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  // 📊 SORT LOGIC
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sort === "low") return a.price - b.price;
    if (sort === "high") return b.price - a.price;
    return 0;
  });

  return (
    <div className="products-page">

      {/* SIDEBAR */}
      <div className="sidebar">
        <h3>Filters</h3>

        <div className="filter-group">
          <h4>Animal Type</h4>

          <label><input type="checkbox" /> Cow/Buffalo</label>
          <label><input type="checkbox" /> Pig</label>
          <label><input type="checkbox" /> Fish</label>
          <label><input type="checkbox" /> Poultry</label>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="products-content">

        {/* TOP BAR */}
        <div className="products-top">
          <h2>Our Feed Products</h2>

          {/* SEARCH */}
          <input
            type="text"
            placeholder="Search Feed..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* SORT */}
          <select onChange={(e) => setSort(e.target.value)}>
            <option value="">Latest</option>
            <option value="low">Price Low To High</option>
            <option value="high">Price High To Low</option>
          </select>
        </div>

        {/* PRODUCTS GRID */}
        <div className="products-grid">
          {sortedProducts.map((product) => (
            <div key={product.id} className="product-card">

              <img src={product.image} alt={product.name} />

              <h3>{product.name}</h3>

              <p>Rs. {product.price}</p>

              <button
                onClick={() =>
                  navigate(`/product/${product.id}`)
                }
              >
                View Details
              </button>

            </div>
          ))}
        </div>

      </div>

    </div>
  );
};

export default Products;