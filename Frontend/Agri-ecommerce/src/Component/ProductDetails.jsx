import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { getProductById } from "../Service/Api";
import "../CSS/ProductDetails.css";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedWeight,setSelectedWeight]=
  useState("50kg");
 const[showPopup,setShowPopup]=useState(false);
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getProductById(id);
        setProduct(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      <Navbar />

      <div className="product-details-page">

        {/* Breadcrumb */}
        <div className="breadcrumb">
          Home / Products / {product.name}
        </div>

        <div className="product-details-container">

          {/* Left Side Image */}
          <div className="product-gallery">

            <div className="main-image">
              <img
                src={product.image}
                alt={product.name}
              />
            </div>

            {/* <div className="thumbnail-list">
              <img src={product.image} alt="" />
              <img src={product.image} alt="" />
              <img src={product.image} alt="" />
              <img src={product.image} alt="" />
            </div> */}

          </div>

          {/* Right Side Details */}
          <div className="product-info">

            <h1>{product.name}</h1>

            <h2 className="price">
              Rs. {product.price}
            </h2>

            <p className="description">
              {product.description}
            </p>

            <div className="details-box">
              <h3>Ingredients</h3>
              <p>{product.ingredients}</p>
            </div>

            <div className="details-box">
              <h3>Feeding Guide</h3>
              <p>{product.feeding_guide}</p>
            </div>

            <div className="stock-box">
              <strong>Stock:</strong>{" "}
              {product.stock > 0
                ? `${product.stock} Bags Available`
                : "Out Of Stock"}
            </div>

            <div className="weight-section">

  <h3>Weight</h3>

  <div className="weight-options">

    <button
      className={
        selectedWeight === "25kg"
          ? "weight-btn active"
          : "weight-btn"
      }
      onClick={() =>
        setSelectedWeight("25kg")
      }
    >
      25kg
    </button>

    <button
      className={
        selectedWeight === "50kg"
          ? "weight-btn active"
          : "weight-btn"
      }
      onClick={() =>
        setSelectedWeight("50kg")
      }
    >
      50kg
    </button>

    <button
      className={
        selectedWeight === "100kg"
          ? "weight-btn active"
          : "weight-btn"
      }
      onClick={() =>
        setSelectedWeight("100kg")
      }
    >
      100kg
    </button>

  </div>

</div>

            {/* Quantity */}
            <div className="quantity-section">

  <h3>Quantity</h3>

  <div className="quantity-box">

    <button
      onClick={() =>
        quantity > 1 &&
        setQuantity(quantity - 1)
      }
    >
      -
    </button>

    <span>{quantity}</span>

    <button
      onClick={() =>
        setQuantity(quantity + 1)
      }
    >
      +
    </button>

  </div>

</div>
            {/* Buttons */}

            <button
              className="buy-btn"
              onClick={() => {
                const token =
                  localStorage.getItem("token");

                if (!token) {
                  setShowPopup(true);
                  return;
                }

                navigate("/checkout");
              }}
            >
              Buy Now
            </button>

            <button
              className="wishlist-btn"
            >
              Add To Wishlist
            </button>

          </div>

        </div>

      </div>
      {showPopup && (

  <div className="popup-overlay">

    <div className="popup-box">

      <h3>
        Please Login First
      </h3>

      <p>
        You must login before purchasing products.
      </p>

      <button
        className="popup-btn"
        onClick={() =>
          navigate("/login")
        }
      >
        Login
      </button>

      <button
        className="close-btn"
        onClick={() =>
          setShowPopup(false)
        }
      >
        Close
      </button>

    </div>

  </div>

)}
    </>
  );
};

export default ProductDetails;