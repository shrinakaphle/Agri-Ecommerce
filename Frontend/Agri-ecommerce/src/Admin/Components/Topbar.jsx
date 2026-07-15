import { useEffect, useState,useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaBell,
  FaSearch
} from "react-icons/fa";
import { toast } from "react-toastify";
import socket from "../../Socket/socket";
import {
  getAdminNotifications,
   markAdminNotificationRead,
   markAllAdminNotificationsRead
} from "../../Service/Api";

import "../CSS/Topbar.css";

const Topbar = () => {

  const admin = JSON.parse(
    localStorage.getItem("user")
  );
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();
  const notificationRef = useRef(null);

const [notificationOpen, setNotificationOpen] = useState(false);

const [unreadCount, setUnreadCount] = useState(0);

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
  
useEffect(() => {

  socket.emit("join-admin");

  console.log("👑 Admin joined");

  const handleNotification = (notification) => {

    console.log(notification);

    setNotifications(prev => [

      notification,

      ...prev

    ]);

    setUnreadCount(prev => prev + 1);

    toast.success(notification.message);

  };

  socket.on(

    "admin-notification",

    handleNotification

  );

  return () => {

    socket.off(

      "admin-notification",

      handleNotification

    );

  };

}, []);
useEffect(() => {

  const loadNotifications = async () => {

    const res = await getAdminNotifications();

    setNotifications(res.data.notifications);

    const unread =

      res.data.notifications.filter(

        n => !n.is_read

      );

    setUnreadCount(unread.length);

  };

  loadNotifications();

}, []);
useEffect(() => {

  const handleClickOutside = (event) => {

    if (

      notificationRef.current &&

      !notificationRef.current.contains(event.target)

    ) {

      setNotificationOpen(false);

    }

  };

  document.addEventListener(

    "mousedown",

    handleClickOutside

  );

  return () => {

    document.removeEventListener(

      "mousedown",

      handleClickOutside

    );

  };

}, []);
  
const formatTime = (date) => {

  const now = new Date();

  const notificationTime = new Date(date);

  const diff = now - notificationTime;

  const seconds = Math.floor(diff / 1000);

  const minutes = Math.floor(seconds / 60);

  const hours = Math.floor(minutes / 60);

  const days = Math.floor(hours / 24);

  if (seconds < 60) return "Just now";

  if (minutes < 60)
    return `${minutes} min ago`;

  if (hours < 24)
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;

  if (days === 1)
    return "Yesterday";

  if (days < 7)
    return `${days} days ago`;

  return notificationTime.toLocaleDateString();

};
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
<div
  className="notification-wrapper"
  ref={notificationRef}
>

  <div
className="notification-bell"
onClick={()=>

setNotificationOpen(

!notificationOpen

)

}
>

<FaBell/>

{

unreadCount>0 &&

<span className="notification-count">

{unreadCount}

</span>

}

</div>

  {

notificationOpen && (

<div className="notification-dropdown">

<div className="notification-header">

<h4>

Notifications

</h4>

<button

className="mark-all-btn"

onClick={async()=>{

try{

await markAllAdminNotificationsRead();

setUnreadCount(0);

setNotifications(

notifications.map(n=>({

...n,

is_read:true

}))

);

}

catch(error){

console.log(error);

}

}}

>

Mark All

</button>

</div>

<div className="notification-list">

{

notifications.length===0 ?

<p>

No Notifications

</p>

:

notifications.map(

(item,index)=>(
<div

key={item.id}

className={`notification-item ${item.is_read ? "" : "unread"}`}

onClick={async () => {
  console.log(item);
console.log(item.order_id);

  if (!item.is_read) {

    await markAdminNotificationRead(item.id);

    setNotifications(

      notifications.map(n =>

        n.id === item.id

          ? {
              ...n,
              is_read: true
            }

          : n

      )

    );

    setUnreadCount(prev =>

      Math.max(prev - 1, 0)

    );

  }

  // Navigate to Order Details
  if (item.order_id) {

    navigate(`/admin/ordersAdmin/${item.order_id}`);

  }

}}

>

<strong>

{item.title}

</strong>

<p>

{item.message}

</p>
<small className="notification-time">
  {formatTime(item.created_at)}
</small>

</div>

)

)

}

</div>

</div>

)

}

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