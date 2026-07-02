import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Api from "../../Service/Api";
import "../CSS/CustomerDetails.css";

const CustomerDetails = () => {

  const { id } = useParams();

  const navigate = useNavigate();

  const [customer, setCustomer] = useState(null);

  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(true);

  const fetchCustomer = async () => {

    try {

      const res = await Api.get(
        `/api/user/customers/${id}`
      );

      setCustomer(res.data.customer);

      setOrders(res.data.orders);

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    fetchCustomer();

  }, []);

  if (loading) {

    return <h2>Loading...</h2>;

  }

  const totalSpent = orders.reduce(
    (sum, item) =>
      sum + Number(item.total_amount),
    0
  );

  return (

    <div className="customer-details">

      <button
        className="back-btn"
        onClick={() =>
          navigate("/admin/customers")
        }
      >
        ← Back
      </button>

      <div className="customer-card">

        <h2>{customer.name}</h2>

        <p>{customer.email}</p>

        <div className="stats">

          <div>

            <h3>{orders.length}</h3>

            <span>Total Orders</span>

          </div>

          <div>

            <h3>
              Rs. {totalSpent}
            </h3>

            <span>Total Spent</span>

          </div>

        </div>

      </div>

      <div className="orders-list">

        <h2>Order History</h2>

        <table>

          <thead>

            <tr>

              <th>Order ID</th>

              <th>Total</th>

              <th>Payment</th>

              <th>Status</th>

              <th>Date</th>

            </tr>

          </thead>

          <tbody>

            {orders.map((order) => (

              <tr key={order.id}>

                <td>#{order.id}</td>

                <td>
                  Rs. {order.total_amount}
                </td>

                <td>
                  {order.payment_method}
                </td>

                <td>

                  <span
                    className={`status ${order.order_status.toLowerCase()}`}
                  >

                    {order.order_status}

                  </span>

                </td>

                <td>

                  {new Date(
                    order.created_at
                  ).toLocaleDateString()}

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );

};

export default CustomerDetails;