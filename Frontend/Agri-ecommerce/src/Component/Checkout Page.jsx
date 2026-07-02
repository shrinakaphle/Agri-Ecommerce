import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import{useLocation} from "react-router-dom";
import { loadStripe }from "@stripe/stripe-js";
import {Elements}from "@stripe/react-stripe-js";
import StripeCheckoutForm from "./StripeCheckoutForm";
import { toast } from "react-toastify";
import "../CSS/Checkout.css";

const stripePromise =
loadStripe(
import.meta.env
.VITE_STRIPE_PUBLISHABLE_KEY
);
const Checkout = () => {
  const navigate = useNavigate();
const location = useLocation();
const buyNowData = location.state;
  const [cartItems, setCartItems] = useState([]);
  const [isBuyNow, setIsBuyNow] =
useState(false);
  const [loading,setLoading] =useState(true);
  const [paymentMethod, setPaymentMethod] =
    useState("cod");

  const user =
    JSON.parse(localStorage.getItem("user"));

  const [shippingInfo, setShippingInfo] =
    useState({
      fullName: user?.name || "",
      phone: user?.phone || "",
      address: "",
      city: "",
      state: "",
      zip: ""
    });

  


  const subtotal = cartItems.reduce(
    (acc, item) =>
      acc + item.price * item.quantity,
    0
  );
 useEffect(() => {

  const fetchCart = async () => {

    try {

      const res = await fetch(
        `http://localhost:5000/api/cart/${user.id}`
      );

      const data = await res.json();

      setCartItems(
        data.cart || []
      );

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  // BUY NOW FLOW

  if (buyNowData?.buyNow) {

    setIsBuyNow(true);

    setCartItems([
      {
        ...buyNowData.product,
        quantity:
          buyNowData.quantity,

        weight:
          buyNowData.weight
      }
    ]);

    setLoading(false);

  }

  // CART FLOW

  else {

    fetchCart();

  }

}, []);



const deliveryCharge =
  subtotal > 3000 ? 0 : 100;

const total =
  subtotal + deliveryCharge;


 const validateCheckout = () => {

  if (!shippingInfo.fullName.trim()) {

    toast.error("Full Name is required");
    return false;

  }

  if (!shippingInfo.phone.trim()) {

    toast.error("Phone Number is required");
    return false;

  }

  if (!/^[0-9]{10}$/.test(shippingInfo.phone)) {

    toast.error("Phone Number must be 10 digits");
    return false;

  }

  if (!shippingInfo.address.trim()) {

    toast.error("Address is required");
    return false;

  }

  if (!shippingInfo.city.trim()) {

    toast.error("City is required");
    return false;

  }

  if (!shippingInfo.state.trim()) {

    toast.error("State is required");
    return false;

  }

  if (!shippingInfo.zip.trim()) {

    toast.error("ZIP Code is required");
    return false;

  }

  return true;

};
  
const handlePlaceOrder = async () => {
   if (!validateCheckout()) {

    return;
   }

  try {

    const orderData = {

      user_id: user.id,

      total_amount: total,

     payment_method:
     paymentMethod === "cod"
       ? "COD"
       : "Stripe",
     payment_status:
        paymentMethod === "cod"
        ? "Pending"
        : "Paid",
      shipping_address:
        `${shippingInfo.address}, ${shippingInfo.city}`,

     items: cartItems.map((item) => ({
  product_id: item.product_id || item.id,
  quantity: item.quantity,
  weight: item.weight,
  price: item.price
}))

    };

    const res = await fetch(
      "http://localhost:5000/api/order/create",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify(orderData)
      }
    );

    const data = await res.json();

    if (res.ok) {

  // Clear cart only if order came from Cart
  if (!isBuyNow) {

    await fetch(
      `http://localhost:5000/api/cart/clear/${user.id}`,
      {
        method: "DELETE"
      }
    );

  }

  toast.success("Order Placed Successfully!");

  navigate("/order-success",{
    state:{
      order:data.order
    }
  });

}else {

      toast.error(
  data.message
);

    }

  } catch (error) {

    console.log(error);

    toast.error(
  "Order Failed"
);

  }

};
  

  
  return (
  
    <div className="checkout-page">

<div className="checkout-header">

  <button
    className="back-btn"
    onClick={() => navigate("/cart")}
  >
    ← Back To Cart
  </button>

</div>

<div className="checkout-top">

  <h2>Checkout</h2>

  <div className="checkout-steps">

    <div className="step active">
      Shipping
    </div>

    <div className="step-line"></div>

    <div className="step active">
      Payment
    </div>

    <div className="step-line"></div>

    <div className="step">
      Review
    </div>

  </div>

</div>

      <div className="checkout-container">

        {/* SHIPPING */}

        <div className="shipping-card">

          <h3>Shipping Information</h3>

          <input
            placeholder="Full Name"
            value={shippingInfo.fullName}
            onChange={(e) =>
              setShippingInfo({
                ...shippingInfo,
                fullName: e.target.value
              })
            }
          />

          <input
          type="tel"
          maxLength="10"
          placeholder="98XXXXXXXX"
          value={shippingInfo.phone}
          onChange={(e)=>
          setShippingInfo({

         ...shippingInfo,

     phone:e.target.value.replace(/\D/g,"")

})
}
/>

          <textarea
            placeholder="Address"
            value={shippingInfo.address}
            onChange={(e) =>
              setShippingInfo({
                ...shippingInfo,
                address: e.target.value
              })
            }
          />

          <input
            placeholder="City"
            value={shippingInfo.city}
            onChange={(e) =>
              setShippingInfo({
                ...shippingInfo,
                city: e.target.value
              })
            }
          />

          <input
            placeholder="State"
            value={shippingInfo.state}
            onChange={(e) =>
              setShippingInfo({
                ...shippingInfo,
                state: e.target.value
              })
            }
          />

          <input
            placeholder="ZIP Code"
            value={shippingInfo.zip}
            onChange={(e) =>
              setShippingInfo({
                ...shippingInfo,
                zip: e.target.value
              })
            }
          />

        </div>

        {/* PAYMENT */}

        <div className="payment-card">

          <h3>Payment Method</h3>

          <label>
            <input
              type="radio"
              checked={paymentMethod === "cod"}
              onChange={() =>
                setPaymentMethod("cod")
              }
            />
            Cash On Delivery
          </label>

          <label>
            <input
              type="radio"
              checked={paymentMethod === "stripe"}
              onChange={() =>
                setPaymentMethod("stripe")
              }
            />
            Stripe Card Payment
          </label>

          <label className="coming-soon">
            <input
              type="radio"
              disabled
            />
            eSewa (Coming Soon)
          </label>

          <label className="coming-soon">
            <input
              type="radio"
              disabled
            />
            Khalti (Coming Soon)
          </label>

        </div>

        {/* ORDER SUMMARY */}

        <div className="summary-card">

          <h3>Order Summary</h3>

          {cartItems.map((item) => (
            <div
              className="summary-item"
              key={item.id}
            >
             <div>

             <strong>
          {item.name}
              </strong>

            <br />

          <small>
          {item.weight}
            </small>

</div>

              <span>
                Rs.
                {item.price *
                  item.quantity}
              </span>
            </div>
          ))}

          <hr />

          <div className="summary-item">
            <span>Subtotal</span>
            <span>
              Rs.{subtotal}
            </span>
          </div>

          <div className="summary-item">
            <span>Delivery</span>
            <span>
              Rs.{deliveryCharge}
            </span>
          </div>

          <div className="summary-total">
            <span>Total</span>
            <span>
              Rs.{total}
            </span>
          </div>

         {
paymentMethod === "stripe"

?

<Elements
stripe={stripePromise}
>
<StripeCheckoutForm

total={total}

cartItems={cartItems}

shippingInfo={shippingInfo}

user={user}

onSuccess={handlePlaceOrder}

/>


</Elements>

:
<button
className="place-order-btn"
onClick={handlePlaceOrder}
disabled={loading}
>

{
loading
?
"Placing Order..."
:
"Place Order"
}

</button>

}

        </div>

      </div>
      <div className="checkout-features">

  <div className="feature-box">
    🚚
    <h4>Fast Delivery</h4>
    <p>Delivery across Nepal</p>
  </div>

  <div className="feature-box">
    🔒
    <h4>Secure Payment</h4>
    <p>Stripe Protected Checkout</p>
  </div>

  <div className="feature-box">
    ⭐
    <h4>Premium Quality</h4>
    <p>Trusted Feed Products</p>
  </div>

</div>

    </div>
    
  );
};

export default Checkout;