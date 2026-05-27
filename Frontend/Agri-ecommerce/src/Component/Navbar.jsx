const Navbar = ()=>{
    return(
        <nav className="navbar">
        <div className="logo">
            <h2>AMARSIDDHI</h2>
            <span>krishi Udhyog</span>
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