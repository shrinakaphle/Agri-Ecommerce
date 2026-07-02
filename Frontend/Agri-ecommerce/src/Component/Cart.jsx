import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/Cart.css";

const Cart = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [cartItems, setCartItems] = useState([]);

  // FETCH CART
  const fetchCart = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/cart/${user.id}`
      );
      const data = await res.json();
      setCartItems(data.cart || []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // UPDATE QTY
  const updateQuantity = async (id, qty) => {
    if (qty < 1) return;

    try {
      await fetch(
        `http://localhost:5000/api/cart/update/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ quantity: qty }),
        }
      );

      fetchCart();
    } catch (err) {
      console.log(err);
    }
  };

  // REMOVE ITEM
  const removeItem = async (id) => {
    try {
      await fetch(
        `http://localhost:5000/api/cart/delete/${id}`,
        { method: "DELETE" }
      );

      fetchCart();
    } catch (err) {
      console.log(err);
    }
  };

  // TOTAL CALCULATION
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const delivery = 100;
  const total = subtotal + delivery;

  return (
    <div className="cart-page">

      {/* TOP */}
      <div className="cart-top">
        <button
          className="continue-shopping"
          onClick={() => navigate("/products")}
        >
          ← Continue Shopping
        </button>

        <h1>Shopping Cart ({cartItems.length})</h1>
      </div>

      {/* EMPTY CART */}
      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <h2>Your cart is empty</h2>
          <button onClick={() => navigate("/products")}>
            Start Shopping
          </button>
        </div>
      ) : (

        <div className="cart-layout">

          {/* LEFT SIDE TABLE */}
          <div className="cart-left">

            <div className="cart-table">

              {/* HEADER */}
              <div className="table-header">
                <div>Product</div>
                <div>Weight</div>
                <div>Price</div>
                <div>Qty</div>
                <div>Total</div>
                <div>Action</div>
              </div>

              {/* ROWS */}
              {cartItems.map((item) => (
                <div className="table-row" key={item.id}>

                  <div className="product-cell">
                    <img
  src={
    item.image?.startsWith("http")
      ? item.image
      : `http://localhost:5000/uploads/${item.image}`
  }
  alt={item.name}
/>
                    <span>{item.name}</span>
                  </div>

                  <div>{item.weight}</div>

                  <div>Rs {item.price}</div>

                  <div className="qty-box">
                    <button
                      onClick={() =>
                        updateQuantity(item.id, item.quantity - 1)
                      }
                    >
                      -
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      onClick={() =>
                        updateQuantity(item.id, item.quantity + 1)
                      }
                    >
                      +
                    </button>
                  </div>

                  <div>
                    Rs {item.price * item.quantity}
                  </div>

                  <div>
                    <button
                      className="remove-btn"
                      onClick={() => removeItem(item.id)}
                    >
                      Remove
                    </button>
                  </div>

                </div>
              ))}

            </div>
          </div>

          {/* RIGHT SIDE SUMMARY */}
          <div className="cart-right">

            <h2>Order Summary</h2>

            <div className="summary-row">
              <span>Subtotal</span>
              <span>Rs {subtotal}</span>
            </div>

            <div className="summary-row">
              <span>Delivery</span>
              <span>Rs {delivery}</span>
            </div>

            <hr />

            <div className="summary-row total-row">
              <span>Total</span>
              <span>Rs {total}</span>
            </div>

            <button
              className="checkout-btn"
              onClick={() => navigate("/checkout")}
            >
              Proceed To Checkout
            </button>

          </div>

        </div>
      )}
    </div>
  );
};

export default Cart;