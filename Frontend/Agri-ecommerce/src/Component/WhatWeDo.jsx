import Quality2 from "../assets/Quality2.jpg";
import healthylivestock from "../assets/healthylivestock.jpg";
import trusted from "../assets/trusted.jpg";
import modern from "../assets/modern.webp";


const WhatWeDo = () => {
  const features = [
    {
      title: "Premium Quality Feed",
      desc: "We produce high-quality animal feed using balanced nutrition and premium raw materials for healthy livestock growth.",
      image: Quality2,
    },
    {
      title: "Healthy Livestock",
      desc: "Our nutrition products improve livestock health, immunity, productivity, and overall farm performance.",
      image: healthylivestock,
    },
    {
      title: "Trusted By Farmers",
      desc: "Farmers trust Amarsiddhi Krishi Udhyog for reliable and effective feed products with proven quality.",
      image: trusted,
    },
    {
      title: "Modern Production",
      desc: "We use modern production systems and advanced processing techniques to maintain high feed standards.",
      image: modern,
    },
  ];

  return (
    <section className="whatwedo">

      {/* TITLE */}
      <div className="whatwedo-title">
        <h2>What We Do</h2>
        <p>
          Amarsiddhi Krishi Udhyog provides premium livestock nutrition solutions
          designed to improve animal health, productivity, and sustainable farming.
        </p>
      </div>

      {/* CONTENT */}
      <div className="whatwedo-grid">
        {features.map((item, index) => (
          <div className="whatwedo-card" key={index}>
            
            {/* IMAGE */}
            <div className="whatwedo-image">
              <img src={item.image} alt={item.title} />
            </div>

            {/* TEXT */}
            <div className="whatwedo-text">
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>

          </div>
        ))}
      </div>

    </section>
  );
};

export default WhatWeDo;