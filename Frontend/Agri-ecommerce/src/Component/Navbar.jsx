//  import logo from "../assets/logo.jpeg";
import {useEffect,useState} from "react";
import{NavLink,Link} from "react-router-dom";
import{FaHeart,FaShoppingCart,FaBell} from "react-icons/fa";
import {useNavigate} from "react-router-dom";
import{FaUserCircle,FaChevronDown} from "react-icons/fa";
import socket from "../Socket/socket";
import { useRef } from "react";
 import"../CSS/Navbar.css";
 import {

  getUserNotifications,

  markAllNotificationsRead,
    markNotificationRead

} from "../Service/Api";

const Navbar = ()=>{
const navigate = useNavigate();

const [notifications, setNotifications] = useState([]);

const [notificationOpen, setNotificationOpen] = useState(false);

const [unreadCount, setUnreadCount] = useState(0);
const formatTime = (date) => {

  const diff = Math.floor(

    (Date.now() - new Date(date)) / 1000

  );

  if (diff < 60) return "Just now";

  if (diff < 3600)

    return `${Math.floor(diff / 60)} min ago`;

  if (diff < 86400)

    return `${Math.floor(diff / 3600)} hr ago`;

  return `${Math.floor(diff / 86400)} day ago`;

};
const [user,setUser] =
useState(

JSON.parse(
localStorage.getItem("user")

)

);
const notificationRef = useRef(null);
const [showDropdown,
setShowDropdown] =
useState(false);
const handleLogout = () => {

localStorage.removeItem(
"token"
);

localStorage.removeItem(
"user"
);

setUser(null);

navigate("/");

};
useEffect(()=>{

const updateUser = ()=>{

setUser(

JSON.parse(
localStorage.getItem(
"user"
))

);

};

window.addEventListener(
"login",
updateUser
);

return ()=>{

window.removeEventListener(
"login",
updateUser
);

};

},[]);
    const[scrolled,setScrolled]=useState(false);
    const [wishlistCount, setWishlistCount] = useState(0);
    useEffect(()=>{

        
        const handleScroll=()=>{
            if(window.scrollY>50){
                setScrolled(true);

            }else{
                setScrolled(false);
            }
        };
        window.addEventListener("scroll",handleScroll);
        return()=>window.removeEventListener("scroll",handleScroll);
    },[])

    useEffect(()=>{

const updateCount = () => {

    const wishlist =
      JSON.parse(
        localStorage.getItem(
          "wishlist"
        )
      ) || [];

    setWishlistCount(
      wishlist.length
    );
  };

  updateCount();

  window.addEventListener(
    "wishlistUpdated",
    updateCount
  );

  return () =>
    window.removeEventListener(
      "wishlistUpdated",
      updateCount
    );

}, []);
useEffect(() => {

  if (!user) return;

  const loadNotifications = async () => {

    const res = await getUserNotifications(user.id);

    setNotifications(res.data.notifications);

    const unread = res.data.notifications.filter(

      n => !n.is_read

    );

    setUnreadCount(unread.length);

  };

  loadNotifications();

}, [user]);
useEffect(() => {

  socket.on("order-status", (notification) => {

    setNotifications(prev => [

      notification,

      ...prev

    ]);

    setUnreadCount(prev => prev + 1);

  });

  return () => {

   const handleOrderStatus = (notification) => {

  setNotifications(prev => [notification, ...prev]);

  setUnreadCount(prev => prev + 1);

};

socket.on("order-status", handleOrderStatus);

return () => {

  socket.off("order-status", handleOrderStatus);

};

  };

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

  return () =>

    document.removeEventListener(

      "mousedown",

      handleClickOutside

    );

}, []);


    return(
        <nav className={`navbar ${scrolled? "scrolled":""}`}>
        <div className="logo">
            {/* <img src={logo} alt="AMARSIDDHI Logo" className ="logo"/> */}
            <div className ="logo-text">
            <h2>AMARSIDDHI</h2>
            <span>krishi Udhyog</span>
        </div>
        </div>

       <ul className="nav-links">

    <li>
        <NavLink to="/"
        className={({isActive})=>
isActive ? "nav-item active-nav" : "nav-item"
}
end
>
            Home
        </NavLink>
    </li>

    <li>
        <NavLink to="/products"
        className={({isActive})=>
isActive ? "nav-item active-nav" : "nav-item"
}
>
            Products
        </NavLink>
    </li>

   <li className="dropdown">
  <span className="dropbtn">
    About ▾
  </span>

  <ul className="dropdown-content">
    <li><Link to="/about/company">Company</Link></li>
    <li><Link to="/about/profile">Company Profile</Link></li>
    <li><Link to="/about/certifications">Certifications</Link></li>
   <li>

<NavLink to="/about/team">

Our Team

</NavLink>

</li>
  </ul>
</li>

    <li>
        <NavLink to="/contact"
        className={({isActive})=>
isActive ? "nav-item active-nav" : "nav-item"
}
>
            Contact
        </NavLink>
    </li>

    <li>
        <NavLink to ="/wishlist" className="icon-wrapper">
        <FaHeart className="nav-icon" />
         {wishlistCount > 0 && (

      <span
        className="icon-badge"
      >
        {wishlistCount}
      </span>

    )}
        </NavLink>
    </li>
    
        <li>
            <NavLink to ="/cart" className = "icon-wrapper">
            <FaShoppingCart className="nav-icon"/></NavLink>
        </li>
        <li>
           <div
  className="notification-bell"
  
  onClick={() => {

    setNotificationOpen(!notificationOpen);

  }}
>
<div
ref={notificationRef}
className="notification-wrapper"
></div>
  <FaBell />

  {

    unreadCount > 0 && (

      <span className="notification-count">

        {unreadCount}

      </span>

    )

  }
  {

notificationOpen && (

<div className="notification-dropdown">

<div className="notification-header">

  <h4>Notifications</h4>

  <button

    className="mark-all-btn"

    onClick={async () => {

      await markAllNotificationsRead(user.id);

      setUnreadCount(0);

      setNotifications(

        notifications.map(n => ({
          ...n,
          is_read: true
        }))

      );

    }}

  >

    Mark all

  </button>

</div>

{

notifications.length === 0 ?

<p>No Notifications</p>

:

<div className="notification-list">

{

notifications.length === 0 ?

<p className="empty-notification">

No Notifications

</p>

:

notifications.map((item) => (

<div

key={item.id}

className={`notification-item ${item.is_read ? "" : "unread"}`}

onClick={async () => {

  if (!item.is_read) {

    await markNotificationRead(item.id);

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

}}

>

<strong>

{item.title}

</strong>

<p>

{item.message}

</p>

<small>

  {formatTime(item.created_at)}

</small>

</div>

))

}

</div>
}



</div>

)

}

</div>
        </li>
    

</ul>
{
user ?

<div
className="user-dropdown"
>

<div

className="user-trigger"

onClick={()=>

setShowDropdown(
!showDropdown
)

}

>
<div className="navbar-user">

  {user?.profile_image ? (

    <img
      src={`http://localhost:5000/uploads/${user.profile_image}`}
      alt="Profile"
      className="navbar-profile-image"
    />

  ) : (

    <FaUserCircle className="navbar-profile-icon" />

  )}

  <span>{user?.name}</span>

</div>

<FaChevronDown/>

</div>

{
showDropdown && (

<div
className="dropdown-menu"
>

<div
onClick={()=>
navigate("/profile")
}
>
My Profile
</div>

<div
onClick={()=>
navigate("/wishlist")
}
>
Wishlist
</div>

<div
onClick={()=>
navigate("/orders")
}
>
Orders
</div>

<div
className="logout"
onClick={
handleLogout
}
>
Logout
</div>

</div>

)

}

</div>

:


<button

className="login-btn"

onClick={()=>
navigate("/login")
}

>

Login

</button>

}
        {/* <button className= "login-btn"
        onClick ={()=>navigate("/login")}>
            Login
        </button> */}
        </nav>

        
    );
    
};
export default Navbar;