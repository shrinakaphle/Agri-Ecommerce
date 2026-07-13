import { useEffect, useState } from "react";
import {
  FaBoxOpen,
  FaClipboardList,
  FaUsers,
  FaDollarSign
} from "react-icons/fa";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend
} from "recharts";
import Api,{
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

const [analytics, setAnalytics] = useState({
  monthlySales: [],
  orderStatus: [],
  topProducts: []
});
  

  const loadDashboard = async () => {

    try {

      const [

        productRes,

        orderRes,

        userRes,
         analyticsRes

      ] = await Promise.all([

        getAllProducts(),

        getAllOrders(),

        getAllUsers(),
        Api.get("/api/analytics")


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
setAnalytics({

  monthlySales: analyticsRes.data.monthlySales,

  orderStatus: analyticsRes.data.orderStatus,

  topProducts: analyticsRes.data.topProducts

});


    }

    catch (error) {

      console.log(error);

    }

  };
 useEffect(() => {

    loadDashboard();

  }, []);
  const COLORS = [
  "#2e7d32",
  "#ff9800",
  "#2196f3",
  "#f44336",
  "#9c27b0"
];
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

   <div className="dashboard-charts">

  {/* Monthly Revenue */}

  <div className="chart-card">

    <h2>Monthly Revenue</h2>

    <ResponsiveContainer
      width="100%"
      height={320}
    >

      <BarChart
        data={analytics.monthlySales}
      >

        <CartesianGrid strokeDasharray="3 3"/>

        <XAxis dataKey="month"/>

        <YAxis/>

        <Tooltip/>

        <Legend/>

        <Bar
          dataKey="revenue"
          fill="#2e7d32"
        />

      </BarChart>

    </ResponsiveContainer>

  </div>

  {/* Order Status */}

  <div className="chart-card">

    <h2>Order Status</h2>

    <ResponsiveContainer
      width="100%"
      height={320}
    >

      <PieChart>

        <Pie

          data={analytics.orderStatus}

          dataKey="total"

          nameKey="order_status"

          outerRadius={110}

          label

        >

          {

            analytics.orderStatus.map((entry,index)=>(

              <Cell

                key={index}

                fill={
                  COLORS[index % COLORS.length]
                }

              />

            ))

          }

        </Pie>

        <Tooltip/>

        <Legend/>

      </PieChart>
   

    </ResponsiveContainer>

  </div>

</div>
<div className="top-products-card">

  <h2>🔥 Top Selling Products</h2>

  {

    analytics.topProducts.map((product,index)=>(

      <div
        className="top-product"
        key={index}
      >

        <div className="product-top">

          <div>

            <h4>{product.name}</h4>

            <span>{product.sold} Units Sold</span>

          </div>

          <strong>

            #{index+1}

          </strong>

        </div>

        <div className="progress-bar">

          <div

            className="progress-fill"

            style={{

              width:`${
                analytics.topProducts.length
                ? (product.sold / analytics.topProducts[0].sold) * 100
                : 0
              }%`

            }}

          ></div>

        </div>

      </div>

    ))

  }

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