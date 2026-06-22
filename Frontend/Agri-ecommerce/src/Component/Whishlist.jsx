import { useEffect, useState } from "react";
import  "../CSS/Whishlist.css";
import {FaHeart} from "react-icons/fa";

const Wishlist = () => {

  const [wishlistProducts,
    setWishlistProducts] =
    useState([]);

  useEffect(() => {

    const savedWishlist =
      JSON.parse(
        localStorage.getItem("wishlist")
      ) || [];

    setWishlistProducts(
      savedWishlist
    );

  }, []);
  const removeWishlist = (id) => {

  const updatedWishlist =
    wishlistProducts.filter(
      (item) => item.id !== id
    );

  setWishlistProducts(
    updatedWishlist
  );

  localStorage.setItem(
    "wishlist",
    JSON.stringify(updatedWishlist)
  );

  window.dispatchEvent(
    new Event("wishlistUpdated")
  );
};

  return (

    <div className="wishlist-page">

      <h2>
        My Wishlist (
        {wishlistProducts.length}
        )
      </h2>

      <div className="wishlist-grid">
     
        {wishlistProducts.map(
          (product) => (

          <div
            className="wishlist-card"
            
            
            key={product.id}
          >
           <FaHeart
  className="wishlist-heart"
  onClick={() =>
    removeWishlist(product.id)
  }
/>

            <img
              src={product.image}
              alt={product.name}
            />

            <h4>
              {product.name}
            </h4>

            <p>
              Rs. {product.price}
            </p>

            <button>
              Add To Cart
            </button>

          </div>

        ))}
      </div>

    </div>

  );
};

export default Wishlist;