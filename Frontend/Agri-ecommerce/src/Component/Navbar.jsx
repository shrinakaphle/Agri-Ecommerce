//  import logo from "../assets/logo.jpeg";
import {useEffect,useState} from "react";
import{Link} from "react-router-dom";
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
        <Link to="/">
            Home
        </Link>
    </li>

    <li>
        <Link to="/products">
            Products
        </Link>
    </li>

    <li>
        <Link to="/about">
            About
        </Link>
    </li>

    <li>
        <Link to="/contact">
            Contact
        </Link>
    </li>

    <li>
        <Link to ="/wishlist" className="icon-wrapper">
        <FaHeart className="nav-icon" />
         {wishlistCount > 0 && (

      <span
        className="icon-badge"
      >
        {wishlistCount}
      </span>

    )}
        </Link>
    </li>
    
        <li>
            <Link to ="/cart" className = "icon-wrapper">
            <FaShoppingCart className="nav-icon"/></Link>
        </li>
        <li>
            <Link to ="/notifications" className="icon-wrapper">
            <FaBell className ="nav-icon" />
            </Link>
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

<FaUserCircle
className="user-profile-icon"
/>

<span>
{user.name}
</span>

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