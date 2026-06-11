//  import logo from "../assets/logo.jpeg";
import {useEffect,useState} from "react";
import{Link} from "react-router-dom";
import{FaHeart,FaShoppingCart,FaBell} from "react-icons/fa";
// import"../assets/Css/logo.css";

const Navbar = ()=>{
    const[scrolled,setScrolled]=useState(false);
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
    },[]);
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
        <Link to ="/wishlist">
        <FaHeart />
        </Link>
    </li>
    
        <li>
            <Link to ="/cart">
            <FaShoppingCart/></Link>
        </li>
        <li>
            <Link to ="/notifications">
            <FaBell />
            </Link>
        </li>
    

</ul>

        <button className= "login-btn">
            Login
        </button>
        </nav>

        
    );
    
};
export default Navbar;