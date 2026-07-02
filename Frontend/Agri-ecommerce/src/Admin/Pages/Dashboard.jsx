import { useEffect, useState } from "react";
import {
  FaBoxOpen,
  FaClipboardList,
  FaUsers,
  FaDollarSign
} from "react-icons/fa";

import {
  getAllProducts,
  getAllOrders,
  getAllUsers
} from "../../Service/Api";

import "../CSS/Dashboard.css";

const Dashboard = () => {

  const [stats,setStats]=useState({

products:0,

orders:0,

customers:0,

revenue:0,

ordersList:[]

});
  

  const loadDashboard = async () => {

    try {

      const [

        productRes,

        orderRes,

        userRes

      ] = await Promise.all([

        getAllProducts(),

        getAllOrders(),

        getAllUsers()

      ]);

      const products = productRes.data;

      const orders = orderRes.data.orders;

      const customers = userRes.data.users;

      let revenue = 0;

      orders.forEach((order) => {

        revenue += Number(order.total_amount);

      });

    setStats({

products:products.length,

orders:orders.length,

customers:customers.length,

revenue,

ordersList:orders

});

    }

    catch (error) {

      console.log(error);

    }

  };
 useEffect(() => {

    loadDashboard();

  }, []);
  return (

    <div className="dashboard">

      <div className="dashboard-header">

        <div>

          <h1>Dashboard</h1>

          <p>Welcome back Admin 👋</p>

        </div>

      </div>

      <div className="dashboard-cards">

        <div className="dashboard-card products">

          <div className="card-icon">

            <FaBoxOpen />

          </div>

          <div>

            <h2>{stats.products}</h2>

            <p>Total Products</p>

          </div>

        </div>

        <div className="dashboard-card orders">

          <div className="card-icon">

            <FaClipboardList />

          </div>

          <div>

            <h2>{stats.orders}</h2>

            <p>Total Orders</p>

          </div>

        </div>

        <div className="dashboard-card customers">

          <div className="card-icon">

            <FaUsers />

          </div>

          <div>

            <h2>{stats.customers}</h2>

            <p>Total Customers</p>

          </div>

        </div>

        <div className="dashboard-card revenue">

          <div className="card-icon">

            <FaDollarSign />

          </div>

          <div>

            <h2>Rs. {stats.revenue}</h2>

            <p>Total Revenue</p>

          </div>

        </div>

      </div>
      <div className="dashboard-bottom">

  <div className="recent-orders">

    <h2>Recent Orders</h2>

    <table>

      <thead>

        <tr>

          <th>Order ID</th>

          <th>User</th>

          <th>Total</th>

          <th>Status</th>

        </tr>

      </thead>

      <tbody>

        {

          stats.ordersList?.slice(0,5).map((order)=>(

            <tr key={order.id}>

              <td>#{order.id}</td>

              <td>{order.name}</td>

              <td>Rs. {order.total_amount}</td>

              <td>

                <span
  className={`status ${order.order_status.toLowerCase()}`}
>
  {order.order_status}
</span>

              </td>

            </tr>

          ))

        }

      </tbody>

    </table>

  </div>

</div>

    </div>
    

  );

};

export default Dashboard;