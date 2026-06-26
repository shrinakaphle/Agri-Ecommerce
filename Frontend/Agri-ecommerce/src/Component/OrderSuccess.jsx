import { useNavigate } from "react-router-dom";
import "../CSS/OrderSuccess.css";
import { FaCheckCircle } from "react-icons/fa";

const OrderSuccess = () => {

  const navigate = useNavigate();

  const orderId =
    "AGR" + Math.floor(Math.random() * 90000 + 10000);

  return (

    <div className="success-page">

      <div className="success-card">

        <FaCheckCircle className="success-icon" />

        <h1>Order Placed Successfully!</h1>

        <p>
          Thank you for shopping with
          <strong> AMARSIDDHI Krishi Udhyog</strong>
        </p>

        <div className="order-info">

          <div>
            <span>Order ID</span>
            <strong>#{orderId}</strong>
          </div>

          <div>
            <span>Estimated Delivery</span>
            <strong>2 - 4 Days</strong>
          </div>

        </div>

        <div className="success-buttons">

          <button
            onClick={() => navigate("/products")}
          >
            Continue Shopping
          </button>

          <button
            className="secondary-btn"
            onClick={() => navigate("/my-orders")}
          >
            My Orders
          </button>

        </div>

      </div>

    </div>

  );

};

export default OrderSuccess;