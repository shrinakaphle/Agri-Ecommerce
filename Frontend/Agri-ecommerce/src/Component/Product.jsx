import { useEffect, useState } from "react";
import {FaHeart,FaRegHeart,FaSearch} from "react-icons/fa";
import "../CSS/Productpage.css";
import cattlefeed from "../assets/cattlefeed1b.png";
import Henfeed from "../assets/henbanner.jpg";
import fishfeed from "../assets/fishffedb1.jpg";
import Pigfeed from "../assets/pigfeedb1.jpg";

import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  getAllProducts,
  getProductsByCategory,
} from "../Service/Api";



const Products = () => {

  const navigate =
    useNavigate();

  const location =
    useLocation();

  const [products,
    setProducts] =
    useState([]);

  const [search,
    setSearch] =
    useState("");

  const [sort,
    setSort] =
    useState("latest");

  const [priceRange,
    setPriceRange] =
    useState(5000);

  const [stockOnly,
    setStockOnly] =
    useState(false);

  const params =
    new URLSearchParams(
      location.search
    );

  const categoryId =
    params.get(
      "category"
    );
  const [wishlist, setWishlist] = useState([]);
const [selectedCategories, setSelectedCategories] = useState([]);
const [showOutOfStock, setShowOutOfStock] = useState(false);
const toggleWishlist = (product) => {

  let wishlist =
    JSON.parse(
      localStorage.getItem("wishlist")
    ) || [];

  const exists =
    wishlist.find(
      (item) => item.id === product.id
    );

  if (exists) {

    wishlist = wishlist.filter(
      (item) => item.id !== product.id
    );

  } else {

    wishlist.push(product);

  }

  localStorage.setItem(
    "wishlist",
    JSON.stringify(wishlist)
  );

  setWishlist(
    wishlist.map(
      (item) => item.id
    )
  );

  window.dispatchEvent(
    new Event("wishlistUpdated")
  );
};
useEffect(() => {

  const savedWishlist =
    JSON.parse(
      localStorage.getItem("wishlist")
    ) || [];

  setWishlist(
    savedWishlist.map(
      (item) => item.id
    )
  );

}, []);
const categoryNames = {
  1: "CATTLE FEED",
  2: "HEN FEED",
  3: "FISH FEED",
  4: "PIG FEED",
};

const bannerTitle =
  categoryNames[categoryId] || "ALL PRODUCTS";

 
 
  const bannerImages={
    "1": cattlefeed,
     "2": Henfeed,
     "3":fishfeed,
     "4":Pigfeed,
  }
  const bannerImage =
  bannerImages[categoryId] ||
  cattlefeed;

  useEffect(() => {

    const fetchProducts =
      async () => {

        try {

          let response;

          if (
            categoryId
          ) {

            response =
              await getProductsByCategory(
                categoryId
              );

          } else {

            response =
              await getAllProducts();

          }

          setProducts(
            response.data
          );

        } catch (
          error
        ) {

          console.log(
            error
          );

        }
      };

    fetchProducts();

  }, [categoryId]);

  const filteredProducts =
    products
      .filter(
        product =>
          product.name
            .toLowerCase()
            .includes(
              search.toLowerCase()
            )
      )
      .filter(
        product =>
          Number(
            product.price
          ) <=
          priceRange
      )
      .filter(
        product =>
          stockOnly
            ? product.stock > 0
            : true
      )
      .sort(
        (
          a,
          b
        ) => {

          if (
            sort ===
            "low"
          ) {
            return (
              Number(
                a.price
              ) -
              Number(
                b.price
              )
            );
          }

          if (
            sort ===
            "high"
          ) {
            return (
              Number(
                b.price
              ) -
              Number(
                a.price
              )
            );
          }

          return (
            b.id -
            a.id
          );
        }
      );

  return (

    // <div className="products-page">
    <div
  className="products-page"
  style={{
    display: "block",
    width: "100%",
    maxWidth: "1400px",
    margin: "0 auto"
  }}
>
    

      {/* Breadcrumb */}

      <div className="breadcrumb">

        Home /

        Products /

        {
          categoryId
            ? "Category"
            : "All Products"
        }

      </div>

      {/* Banner */}

      <div className="product-banner">
      {/* <div
  className="product-banner"
  style={{
    width: "100%",
    height: "200px",
    background: "green",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  }}
> */}
        <div className="banner-content">

          <h1>

            {bannerTitle}
          </h1>

          <p>

            Premium nutrition
            for healthy livestock

          </p>

        </div>
<div className="banner-image">
  <img
  src={bannerImage}
  alt="Category"/>
</div>
      </div>

      {/* Layout */}

      <div className="products-layout">

        {/* Sidebar */}

        <aside className="sidebar">

          <div className="filter-header">

            <h2>
              Filters
            </h2>

            <button
              onClick={() => {

                setSearch("");

                setSort(
                  "latest"
                );

                setPriceRange(
                  5000
                );

                setStockOnly(
                  false
                );

              }}
            >
              Clear All
            </button>

          </div>

          <div className="filter-group">

            <h4>
              Categories
            </h4>
<label>
  <input
    type="checkbox"
    // checked={selectedCategories.includes(1)}
    checked = {categoryId === "1"}
    onChange={() =>
      navigate("/products?category=1")
    }
  />
  Cattle Feed
</label>

<label>
  <input
    type="checkbox"
      checked = {categoryId === "2"}
    onChange={() =>
      navigate("/products?category=2")
    }
  />
  Poultry Feed
</label>

<label>
  <input
    type="checkbox"
      checked = {categoryId === "3"}
    onChange={() =>
      navigate("/products?category=3")
    }
  />
  Fish Feed
</label>

<label>
  <input
    type="checkbox"
     checked = {categoryId === "4"}
    onChange={() =>
      navigate("/products?category=4")
    }
  />
  Pig Feed
</label>
</div>
           

          <div className="filter-group">

            <h4>
              Price Range
            </h4>

            <input
              type="range"
              min="0"
              max="5000"
              value={
                priceRange
              }
              onChange={
                e =>
                  setPriceRange(
                    e.target
                      .value
                  )
              }
            />

            <p>
              Rs.0 -
              Rs.
              {
                priceRange
              }
            </p>

          </div>

       <div className="filter-group">

  <h4>Availability</h4>

  <label className="filter-checkbox">

    <input
      type="checkbox"
      checked={stockOnly}
      onChange={() => setStockOnly(!stockOnly)}
    />

    <span className="checkmark"></span>

    <span>In Stock</span>

  </label>

  <label className="filter-checkbox">

    <input
      type="checkbox"
      checked={showOutOfStock}
      onChange={() => setShowOutOfStock(!showOutOfStock)}
    />

    <span className="checkmark"></span>

    <span>Out Of Stock</span>

  </label>

</div>

        </aside>

        {/* Content */}
<div className ="products-content">
  <div className = "top-bar">
        <div className="search-box">

  <FaSearch className="search-icon" />

  <input
    type="text"
    placeholder="Search Products"
    value={search}
    onChange={(e) =>
      setSearch(e.target.value)
    }
  />

</div>

            <select
              value={sort}
              onChange={
                e =>
                  setSort(
                    e.target
                      .value
                  )
              }
            >

              <option value="latest">
                Latest
              </option>

              <option value="low">
                Low To High
              </option>

              <option value="high">
                High To Low
              </option>

            </select>

          </div>

          {/* <div className="product-grid">

            {
  filteredProducts.map((product) => (

    <div
      key={product.id}
      className="product-card"
    >

      <div
        className="wishlist-icon"
        onClick={() =>
          toggleWishlist(product)
        }
      >
        {wishlist.includes(product.id)
          ? <FaHeart />
          : <FaRegHeart />}
      </div>

      <img
        src={product.image}
        alt={product.name}
        onClick={() =>
          navigate(`/products/${product.id}`)
        }
      />

      <h3
        onClick={() =>
          navigate(`/products/${product.id}`)
        }
      >
        {product.name}
      </h3>

      <span className="stock-badge">
        In Stock
      </span>

      <p className="price">
        Rs. {product.price}
      </p>

      <div className="product-actions">

        

        <button
          className="details-btn"
          onClick={() =>
            navigate(`/products/${product.id}`)
          }
        >
          Product Details
        </button>

      </div>

    </div>

  ))
}
          </div> */}
<div className="catalog-grid">

{filteredProducts.map((product)=>(

<div
className="catalog-card"
key={product.id}
>

<div
className="catalog-wishlist"
onClick={()=>toggleWishlist(product)}
>

{wishlist.includes(product.id)
?<FaHeart/>
:<FaRegHeart/>}

</div>

<img
className="catalog-image"
 src={`http://localhost:5000/uploads/${product.image}`}
  alt={product.name}
alt={product.name}
onClick={()=>navigate(`/products/${product.id}`)}
/>

<div className="catalog-info">

<h3
className="catalog-title"
onClick={()=>navigate(`/products/${product.id}`)}
>
{product.name}
</h3>

<span
  className={
    product.stock > 0
      ? "catalog-stock in-stock"
      : "catalog-stock out-stock"
  }
>
  {product.stock > 0
    ? "In Stock"
    : "Out of Stock"}
</span>

<p className="catalog-price">
  Rs. {product.price}
</p>

<div className="catalog-actions">

<button
className="catalog-btn"
onClick={()=>
navigate(`/products/${product.id}`)
}
>

View Details

</button>

</div>

</div>

</div>

))}

</div>

          </div>

        </div>

      </div>

  

  );

};

export default Products;
 