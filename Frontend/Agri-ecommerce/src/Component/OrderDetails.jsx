import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../CSS/OrderDetails.css";

const OrderDetails = () => {

  const { id } = useParams();

  const navigate = useNavigate();

  const [order, setOrder] = useState(null);

  const [items, setItems] = useState([]);

  const [loading, setLoading] = useState(true);

  
  const fetchOrder = async () => {

    try {

      const res = await fetch(
        `http://localhost:5000/api/order/details/${id}`
      );

      const data = await res.json();

      if (data.success) {

        setOrder(data.order);

        setItems(data.items);

      }

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    fetchOrder();

  }, []);
  
  if (loading) {

    return <h2>Loading...</h2>;

  }
  if (!order) {
  return (
    <div className="order-details-page">
      <h2>Order not found</h2>
    </div>
  );
}

  return (

    <div className="order-details-page">

      <button
        className="back-btn"
        onClick={() => navigate("/Orders")}
      >
        ← Back To My Orders
      </button>

      <div className="order-header">
<div>

    <h1>
      Order #{order.id}
    </h1>

    <p className="order-date">

      Placed on:

      {new Date(order.created_at).toLocaleDateString()}

    </p>

  </div>

  <span className={`status ${order.order_status.toLowerCase()}`}>

    {order.order_status}

  </span>
        
      </div>

      <div className="info-grid">

        <div className="info-card">

          <h3>Shipping Address</h3>

          <p>{order.shipping_address}</p>

        </div>

        <div className="info-card">

          <h3>Payment</h3>

          <p>{order.payment_method}</p>

          <p>{order.payment_status}</p>

        </div>

      </div>

      <div className="products-card">

        <h2>Ordered Products</h2>

        {items.map((item) => (

  <div className="product-card" key={item.id}>

    <img
  className="product-image"
  src={
    item.image?.startsWith("http")
      ? item.image
      : `http://localhost:5000/uploads/${item.image}`
  }
  alt={item.product_name}
/>
    <div className="product-details">

      <h3>{item.product_name}</h3>

      <p>Weight : {item.weight}</p>

      <p>Quantity : {item.quantity}</p>

    </div>

    <div className="product-price">

      Rs. {item.price}

    </div>

  </div>

))}

      </div>

      <div className="total-card">

        <h2>

          Total :
          Rs {order.total_amount}

        </h2>

      </div>

    </div>

  );

};

export default OrderDetails;