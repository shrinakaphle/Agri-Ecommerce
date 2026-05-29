
import ourexcellence from "../assets/ourexcellence.png"


const Industry = () => {
  return (
    <section className="industry">

      <div className="industry-text">
        <h2>Our Manufacturing Excellence</h2>

        <p>
          We use modern technology and hygienic production systems to ensure
          high-quality animal feed production.
        </p>

        <p>
          Our factory follows strict quality control for livestock nutrition.
        </p>
      </div>

      <div className="industry-images">
        <img src={ourexcellence} alt="factory" />
       
      </div>

    </section>
  );
};

export default Industry;