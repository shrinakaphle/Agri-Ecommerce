import "./../CSS/Company.css";
import {
FaBullseye,
FaEye,

} from "react-icons/fa";
import company1 from "../assets/company1.jpeg";
 import company2 from "../assets/company2.jpeg";
 import company3 from "../assets/company3.jpeg";
 import company4 from "../assets/company4.jpeg";
// import company5 from "../assets/company/company5.jpg";
// import company6 from "../assets/company/company6.jpg";
// import company7 from "../assets/company/company7.jpg";
// import company8 from "../assets/company/company8.jpg";
// import company9 from "../assets/company/company9.jpg";
const Company = () => {

  return (

    <div className="company-page">

      {/* Hero */}

      {/* ================= HERO ================= */}

<div className="company-hero"
style={{
    backgroundImage: `linear-gradient(rgba(18,50,22,.70), rgba(0,0,0,.60)), url(${company1})`
  }}>

    <div className="company-overlay">

        <div className="hero-logo">

            <img
                src={company1}
                alt="Company Logo"
            />

        </div>

        <h5 className="hero-small-title">
            PREMIUM ANIMAL FEED MANUFACTURER
        </h5>

        <h1>
            ABOUT THE
            <br />
            COMPANY
        </h1>

        <div className="hero-divider"></div>

        <p>

            Building Better Nutrition For Every Farm.

            <br />

            Trusted by Thousands of Farmers Across Nepal.

        </p>

        {/* <button className="hero-company-btn">

            Explore Products

        </button> */}

    </div>

</div>

      {/* Gallery */}

      <section className="company-gallery" data-aos="fade-up">

        <h2>Our Factory</h2>
<div className="gallery-grid">

<img src={company1} alt="Factory" />

  <img src={company2} alt="Factory" />

 <img src={company3} alt="Factory" />

<img src={company4} alt="Factory" />

{/* <img src={company5} alt="Factory" />

<img src={company6} alt="Factory" />

<img src={company7} alt="Factory" />

<img src={company8} alt="Factory" />

<img src={company9} alt="Factory" />    */}

</div>
        
      </section>

      {/* Description */}

      <section className="company-content" data-aos="fade-left">

        <h2>About Amarsiddhi Krishi Udhyog</h2>

        <p>

          Amarsiddhi Krishi Udhyog is a Nepal-based manufacturer
          committed to producing premium-quality animal feed for
          cattle, buffalo, goats, poultry, pigs, and fish. Our
          products are formulated using carefully selected raw
          materials, advanced manufacturing processes, and strict
          quality control to ensure healthy livestock and improved
          farm productivity.

        </p>

        <h3>Where Nutrition Meets Science</h3>

        <p>

          Every feed is scientifically balanced to provide the
          nutrients required for healthy growth, stronger immunity,
          better digestion, and higher productivity.

        </p>

        <h3>How We Build Better Feed</h3>

        <p>

          Our manufacturing facility follows modern production
          methods with strict quality inspection, hygienic
          processing, and consistent formulations to deliver
          reliable animal nutrition.

        </p>

      </section>
      <section className="mission-section">

<h2>Mission & Vision</h2>

<div className="mission-grid">

<div className="mission-card">

<FaBullseye className="mission-icon"/>

<h3>Our Mission</h3>

<p>

To provide high-quality, nutritious, and affordable animal feed
that improves livestock productivity while supporting farmers'
success across Nepal.

</p>

</div>

<div className="mission-card"data-aos="zoom-in">

<FaEye className="mission-icon"/>

<h3>Our Vision</h3>

<p>

To become Nepal's most trusted animal feed manufacturer through
innovation, quality assurance, and sustainable agricultural
development.

</p>

</div>

</div>

</section>
<section className="why-section" data-aos="fade-right">

<h2>Why Choose Us</h2>

<div className="why-grid">

<div>✔ Premium Quality Feed</div>

<div>✔ Scientific Nutrition</div>

<div>✔ Modern Manufacturing</div>

<div>✔ Experienced Team</div>

<div>✔ Affordable Pricing</div>

<div>✔ Trusted by Farmers</div>

</div>

</section>
<section className="stats">

<div>

<h1>5000+</h1>

<p>Happy Farmers</p>

</div>

<div>

<h1>10+</h1>

<p>Years Experience</p>

</div>

<div>

<h1>50+</h1>

<p>Products</p>

</div>

<div>

<h1>20+</h1>

<p>Districts Served</p>

</div>

</section>
    </div>

  );

};

export default Company;