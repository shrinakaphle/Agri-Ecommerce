import "../CSS/CompanyProfile.css";

const CompanyProfile = () => {

  return (

    <div className="company-page">

      {/* Hero */}

      <section className="company-hero"data-aos="flip-left">

        <div className="company-overlay">

          <h1>Company Profile</h1>

          <p>

            Growing Agriculture Through Quality Feed Products

          </p>

        </div>

      </section>

      {/* Introduction */}

      <section className="company-intro"
      data-aos ="fade-up">

        <h2>Who We Are</h2>

        <p>

          Amarsiddhi Krishi Udhyog Pvt. Ltd. is one of Nepal's growing
          livestock feed manufacturers committed to producing
          high-quality feed for cattle, buffalo, goat, poultry,
          pig and fish farming.

          We believe quality nutrition creates healthy livestock,
          improves farmers' income and supports sustainable agriculture.

        </p>

      </section>

      {/* Vision Mission */}

      <section className="company-grid"data-aos="fade-right">

        <div className="company-card">

          <h3>🌱 Our Vision</h3>

          <p>

            To become Nepal's most trusted livestock feed manufacturer
            by delivering premium quality products and innovative
            agricultural solutions.

          </p>

        </div>

        <div className="company-card"data-aos="fade-up">

          <h3>🎯 Our Mission</h3>

          <p>

            To provide safe, nutritious and affordable animal feed
            while supporting farmers with reliable service and
            continuous product improvement.

          </p>

        </div>

      </section>

      {/* Core Values */}

      <section className="company-values"data-aos="fade-left">

        <h2>Our Core Values</h2>

        <div className="value-grid">

          <div className="value-box">

            <h3>⭐ Quality</h3>

            <p>

              Maintaining the highest quality standards in every product.

            </p>

          </div>

          <div className="value-box">

            <h3>🤝 Integrity</h3>

            <p>

              Building long-term trust with customers and partners.

            </p>

          </div>

          <div className="value-box">

            <h3>🌍 Sustainability</h3>

            <p>

              Supporting environmentally responsible agriculture.

            </p>

          </div>

          <div className="value-box">

            <h3>🚀 Innovation</h3>

            <p>

              Continuously improving products and manufacturing processes.

            </p>

          </div>

        </div>

      </section>

      {/* Why Choose */}

      <section className="why-company"data-aos ="flip-left">

        <h2>Why Choose Us?</h2>

        <ul>

          <li>✔ Premium Quality Feed Products</li>

          <li>✔ Modern Manufacturing Process</li>

          <li>✔ Experienced Technical Team</li>

          <li>✔ Affordable Pricing</li>

          <li>✔ Trusted by Farmers Across Nepal</li>

          <li>✔ Customer Satisfaction Focused</li>

        </ul>

      </section>
      {/* ================= CTA ================= */}

{/* ================= STATS + CTA ================= */}

<section className="company-bottom">

  <div className="company-stats">

    <div className="stat-box">

      <h2>10+</h2>

      <p>Years Experience</p>

    </div>

    <div className="stat-box">

      <h2>5000+</h2>

      <p>Happy Farmers</p>

    </div>

    <div className="stat-box">

      <h2>100+</h2>

      <p>Dealers Nationwide</p>

    </div>

    <div className="stat-box">

      <h2>100%</h2>

      <p>Quality Assurance</p>

    </div>

  </div>

  <div className="company-cta">

    <h2>

      Ready to Grow With Us?

    </h2>

    <p>

      Join thousands of satisfied farmers who trust
      Amarsiddhi Krishi Udhyog for premium livestock
      feed products.

    </p>

    <div className="cta-buttons">

      <button

      onClick={()=>window.location="/contact"}

      >

        Contact Us

      </button>

      <button

      className="secondary-btn"

      onClick={()=>window.location="/products"}

      >

        Explore Products

      </button>

    </div>

  </div>

</section>

    </div>

  );

};

export default CompanyProfile;