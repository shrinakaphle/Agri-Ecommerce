//  import logo from "../assets/logo.jpeg";
import {useEffect,useState} from "react";
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
            <li>Home</li>
            <li>Products</li>
            <li>About</li>
            <li>Contacts</li>
        </ul>
        <button className= "login-btn">
            Login
        </button>
        </nav>
    );
};
export default Navbar;