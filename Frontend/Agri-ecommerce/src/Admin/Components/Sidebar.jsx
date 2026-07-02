import {
  FaTachometerAlt,
  FaBoxOpen,
  FaClipboardList,
  FaUsers,
  FaChartLine,
  FaCog,
  FaSignOutAlt,
  FaPlusCircle
} from "react-icons/fa";

import { NavLink, useNavigate } from "react-router-dom";

import "../CSS/Sidebar.css";

const Sidebar = () => {

  const navigate = useNavigate();

  const logout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");

    window.location.reload();

  };

  return (

    <aside className="admin-sidebar">

      <div className="admin-logo">

        <h2>AMARSIDDHI</h2>

        <span>Admin Panel</span>

      </div>

      <nav className="admin-menu">

        <NavLink
          to="/admin/dashboard"
          className={({ isActive }) =>
            isActive
              ? "admin-link active"
              : "admin-link"
          }
        >
          <FaTachometerAlt />
          Dashboard
        </NavLink>

        <NavLink
          to="/admin/products"
          className={({ isActive }) =>
            isActive
              ? "admin-link active"
              : "admin-link"
          }
        >
          <FaBoxOpen />
          Products
        </NavLink>

        <NavLink
          to="/admin/products/add"
          className={({ isActive }) =>
            isActive
              ? "admin-link active"
              : "admin-link"
          }
        >
          <FaPlusCircle />
          Add Product
        </NavLink>

        <NavLink
          to="/admin/ordersAdmin"
          className={({ isActive }) =>
            isActive
              ? "admin-link active"
              : "admin-link"
          }
        >
          <FaClipboardList />
          Orders
        </NavLink>

        <NavLink
          to="/admin/customers"
          className={({ isActive }) =>
            isActive
              ? "admin-link active"
              : "admin-link"
          }
        >
          <FaUsers />
          Customers
        </NavLink>

        <NavLink
          to="/admin/reports"
          className={({ isActive }) =>
            isActive
              ? "admin-link active"
              : "admin-link"
          }
        >
          <FaChartLine />
          Reports
        </NavLink>

        <NavLink
          to="/admin/settings"
          className={({ isActive }) =>
            isActive
              ? "admin-link active"
              : "admin-link"
          }
        >
          <FaCog />
          Settings
        </NavLink>

      </nav>

      <button
        className="admin-logout"
        onClick={logout}
      >
        <FaSignOutAlt />
        Logout
      </button>

    </aside>

  );

};

export default Sidebar;