const Footer = () => {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* Left */}
        <div className="footer-section">
          <h3>Amarsiddhi Krishi Udhyog</h3>
          <p>
            Quality livestock nutrition solutions for healthier and stronger farming.
          </p>
        </div>

        {/* Middle */}
        <div className="footer-section">
          <h3>Quick Links</h3>
          <a href="#">Home</a>
          <a href="#">Products</a>
          <a href="#">About</a>
          <a href="#">Contact</a>
        </div>

        {/* Right */}
        <div className="footer-section">
          <h3>Contact</h3>
          <p>Email: info@example.com</p>
          <p>Phone: +977-9800000000</p>
          <p>Kathmandu, Nepal</p>
        </div>

      </div>

      {/* Bottom */}
      <div className="footer-bottom">
        © 2026 Amarsiddhi Krishi Udhyog. All Rights Reserved
      </div>

    </footer>
  );
};

export default Footer;