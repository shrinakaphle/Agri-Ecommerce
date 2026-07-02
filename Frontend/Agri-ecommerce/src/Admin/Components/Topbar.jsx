import {
  FaBell,
  FaSearch
} from "react-icons/fa";

import "../CSS/Topbar.css";

const Topbar = () => {

  const admin = JSON.parse(
    localStorage.getItem("user")
  );

  const today = new Date();

  const date = today.toLocaleDateString(
    "en-US",
    {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  );

  return (

    <header className="admin-topbar">

      <div className="topbar-left">

        <h2>Dashboard</h2>

        <span>{date}</span>

      </div>

      <div className="topbar-right">

        <div className="topbar-search">

          <FaSearch />

          <input
            type="text"
            placeholder="Search..."
          />

        </div>

        <div className="notification-icon">

          <FaBell />

          <span>3</span>

        </div>

        <div className="admin-profile">

          {

            admin?.profile_image ?

            <img
              src={`http://localhost:5000/uploads/${admin.profile_image}`}
              alt="admin"
            />

            :

            <div className="profile-placeholder">

              {admin?.name?.charAt(0)}

            </div>

          }

          <div>

            <h4>{admin?.name}</h4>

            <p>Administrator</p>

          </div>

        </div>

      </div>

    </header>

  );

};

export default Topbar;