import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Api from "../../Service/Api";
import "../CSS/OrderDetailsAdmin.css";
import { toast } from "react-toastify";

const OrderDetailsAdmin = () => {

  const { id } = useParams();

  const navigate = useNavigate();

  const [order, setOrder] = useState(null);

  const [items, setItems] = useState([]);
  const [status, setStatus] = useState("");

  const [loading, setLoading] = useState(true);

  const loadOrder = async () => {

    try {

      const res = await Api.get(`/api/order/details/${id}`);

      if (res.data.success) {

        setOrder(res.data.order);

        setItems(res.data.items);

        setStatus(res.data.order.order_status);

      }

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    loadOrder();

  }, []);

  if (loading) {

    return <h2>Loading...</h2>;

  }
  const updateStatus = async () => {

  try {

    await Api.put(
      `/api/order/status/${id}`,
      {
        status: status
      }
    );

    toast.success(
      "Order Status Updated Successfully"
    );

    loadOrder();

  } catch (err) {

    console.log(err);

    toast.error(
      "Failed To Update Status"
    );

  }

};

  return (

    <div className="admin-order-details">

      <button
        className="back-btn"
        onClick={() => navigate("/admin/orders")}
      >
        ← Back
      </button>

      <h1>Order #{order.id}</h1>

      <div className="order-info">

        <p><strong>Customer :</strong> {order.name}</p>

        <p><strong>Email :</strong> {order.email}</p>

        <p><strong>Payment :</strong> {order.payment_method}</p>

        <p><strong>Payment Status :</strong> {order.payment_status}</p>

        <p><strong>Shipping :</strong> {order.shipping_address}</p>

        <p><strong>Total :</strong> Rs {order.total_amount}</p>
<div className="status-update">

  <label>
    <strong>Status :</strong>
  </label>

  <select
    value={status}
    onChange={(e) =>
      setStatus(e.target.value)
    }
  >

    <option value="Processing">
      Processing
    </option>

    <option value="Shipped">
      Shipped
    </option>

    <option value="Delivered">
      Delivered
    </option>

    <option value="Cancelled">
      Cancelled
    </option>

  </select>

  <button
    className="update-btn"
    onClick={updateStatus}
  >
    Update Status
  </button>

</div>

      </div>

      <h2>Ordered Products</h2>

      <div className="products-list">

        {items.map(item => (

          <div
            className="product-card"
            key={item.id}
          >

            <img
              src={`http://localhost:5000/uploads/${item.image}`}
              alt={item.product_name}
            />

            <div>

              <h3>{item.product_name}</h3>

              <p>Weight : {item.weight}</p>

              <p>Quantity : {item.quantity}</p>

              <p>Price : Rs {item.price}</p>

            </div>

          </div>

        ))}

      </div>

    </div>

  );

};

export default OrderDetailsAdmin;
