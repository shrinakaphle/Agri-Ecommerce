import { Outlet } from "react-router-dom";

import Sidebar from "./Components/Sidebar";
import Topbar from "./Components/Topbar";

import "./CSS/AdminLayout.css";

const AdminLayout = () => {

  return (

    <div className="admin-layout">

      <Sidebar />

      <div className="admin-main">

        <Topbar />

        <div className="admin-content">

          <Outlet />

        </div>

      </div>

    </div>

  );

};

export default AdminLayout;