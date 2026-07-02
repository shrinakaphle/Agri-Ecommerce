
import { useLocation, useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import "../CSS/OrderSuccess.css";

const OrderSuccess = () => {

  const navigate = useNavigate();

  const location = useLocation();

  const order = location.state?.order;

  return (

    <div className="success-page">

      <div className="success-card">

        <FaCheckCircle className="success-icon"/>

        <h1>Order Placed Successfully!</h1>

        <p>

          Thank you for shopping with Amar Siddhi Feed.

        </p>

        {
          order &&

          <div className="order-info">

            <div>

              <span>Order ID</span>

              <strong>#{order.id}</strong>

            </div>

            <div>

              <span>Payment</span>

              <strong>{order.payment_method}</strong>

            </div>

            <div>

              <span>Status</span>

              <strong>{order.order_status}</strong>

            </div>

            <div>

              <span>Total</span>

              <strong>Rs. {order.total_amount}</strong>

            </div>

          </div>

        }

        <div className="success-buttons">

          <button
            onClick={() => navigate("/Orders")}
          >
            View My Orders
          </button>

          <button
            className="shop-btn"
            onClick={() => navigate("/productS")}
          >
            Continue Shopping
          </button>

        </div>

      </div>

    </div>

  );

};

export default OrderSuccess;