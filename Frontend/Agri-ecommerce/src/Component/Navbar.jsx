//  import logo from "../assets/logo.jpeg";
import {useEffect,useState} from "react";
import{NavLink} from "react-router-dom";
import{FaHeart,FaShoppingCart,FaBell} from "react-icons/fa";
import {useNavigate} from "react-router-dom";
import{FaUserCircle,FaChevronDown} from "react-icons/fa";
 import"../CSS/Navbar.css";

const Navbar = ()=>{
const navigate = useNavigate();


const [user,setUser] =
useState(

JSON.parse(
localStorage.getItem("user")

)

);
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

    <li>
        <NavLink to="/about"
        className={({isActive})=>
isActive ? "nav-item active-nav" : "nav-item"
}
>
            About
        </NavLink>
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
            <NavLink to ="/notifications" className="icon-wrapper">
            <FaBell className ="nav-icon" />
            </NavLink>
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