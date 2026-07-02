import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaEye } from "react-icons/fa";
import Api from "../../Service/Api";
import "../CSS/OrderAdmin.css";

const Orders = () => {

  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);

  const loadOrders = async () => {

    try {

      const res = await Api.get("/api/order");

      setOrders(res.data.orders);

      setLoading(false);

    } catch (err) {

      console.log(err);

      setLoading(false);

    }

  };

  useEffect(() => {

    loadOrders();

  }, []);

  const filteredOrders = orders.filter((order) =>
  order.name
    ?.toLowerCase()
    .includes(search.toLowerCase())
);

  return (

    <div className="admin-orders">

      <div className="orders-header">

        <h1>Orders</h1>

      </div>

      <div className="search-box">

        <FaSearch />

        <input
          type="text"
          placeholder="Search Customer..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

      </div>

      <div className="orders-table">

        {

          loading ?

            <h2>Loading...</h2>

            :

            <table>

              <thead>

                <tr>

                  <th>Order ID</th>

                  <th>Customer</th>

                  <th>Total</th>

                  <th>Payment</th>

                  <th>Status</th>

                  <th>Date</th>

                  <th>Action</th>

                </tr>

              </thead>

              <tbody>

                {

                  filteredOrders.map((order) => (

                    <tr key={order.id}>

                      <td>
                        #{order.id}
                      </td>

                      <td>
                        {order.name}
                      </td>

                      <td>
                        Rs {order.total_amount}
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

                        {
                          new Date(order.created_at)
                            .toLocaleDateString()
                        }

                      </td>

                      <td>

                        <button
                          className="view-btn"
                          onClick={() =>
                            navigate(
                              `/admin/ordersAdmin/${order.id}`
                            )
                          }
                        >

                          <FaEye />

                        </button>

                      </td>

                    </tr>

                  ))

                }

              </tbody>

            </table>

        }

      </div>

    </div>

  );

};

export default Orders;