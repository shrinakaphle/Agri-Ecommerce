import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/Orders.css";

const MyOrders = () => {

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(true);

  
  const fetchOrders = async () => {
    try {

      const res = await fetch(
        `http://localhost:5000/api/order/user/${user.id}`
      );

      const data = await res.json();

      setOrders(data.orders || []);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    fetchOrders();

  }, []);


  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (

    <div className="orders-page">

      <h1>My Orders</h1>

      {
        orders.length === 0 ?

        <div className="empty-orders">

          <h2>No Orders Yet</h2>

          <button
            onClick={() => navigate("/products")}
          >
            Start Shopping
          </button>

        </div>

        :

        orders.map((order) => (

          <div
            className="order-card"
            key={order.id}
          >

            <div className="order-top">

              <div>

                <h3>
                  Order #{order.id}
                </h3>

                <p>
                  {new Date(order.created_at).toLocaleDateString()}
                </p>

              </div>

              <span
                className={`status ${order.order_status.toLowerCase()}`}
              >
                {order.order_status}
              </span>

            </div>

            <div className="order-bottom">

              <div>

                <strong>Total</strong>

                <p>
                  Rs. {order.total_amount}
                </p>

              </div>

              <div>

                <strong>Payment</strong>

                <p>
                  {order.payment_method}
                </p>

              </div>

              <button
                onClick={() =>
                  navigate(`/order/${order.id}`)
                }
              >
                View Details
              </button>

            </div>

          </div>

        ))

      }

    </div>

  );

};

export default MyOrders;