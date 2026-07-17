import "../CSS/Certifications.css";
import { useState } from "react";

const certificates = [


  {
    title: "ISO 9001 Certification",
    image: "/certificate1.jpg",
    description:
      "International Quality Management Certification."
  },

  {
    title: "Government Registration",
    image: "/certificate2.jpg",
    description:
      "Official registration issued by Government of Nepal."
  },

  {
    title: "Feed Quality Certificate",
    image: "/certificate3.jpg",
    description:
      "Certified quality livestock feed products."
  },

  {
    title: "Business License",
    image: "/certificate4.jpg",
    description:
      "Authorized business operation license."
  }

];

const Certifications = () => {
  const [selectedCertificate, setSelectedCertificate] = useState(null);

  return (

    <div className="certificate-page">

      {/* Hero */}

      <section className="certificate-hero">

        <div className="certificate-overlay">

          <h1>Certifications</h1>

          <p>

            Quality, Trust and Commitment

          </p>

        </div>

      </section>

      {/* Heading */}

      <section className="certificate-heading">

        <h2>

          Our Certifications

        </h2>

        <p>

          We are committed to maintaining the highest
          standards in livestock feed manufacturing.

        </p>

      </section>

      {/* Cards */}

      <section className="certificate-container">

        {

          certificates.map((item,index)=>(

            <div
              className="certificate-card"
              key={index}
            >

              <div className="certificate-image">

                <img

                  src={item.image}

                  alt={item.title}

                />

              </div>

              <div className="certificate-content">

                <h3>

                  {item.title}

                </h3>

                <p>

                  {item.description}

                </p>

               <button
  onClick={() => setSelectedCertificate(item)}
>
  View Certificate
</button>
              </div>

            </div>

          ))

        }

      </section>
      {
  selectedCertificate && (

    <div
      className="certificate-popup"
      onClick={() => setSelectedCertificate(null)}
    >

      <div
        className="certificate-popup-content"
        onClick={(e) => e.stopPropagation()}
      >

        <span
          className="close-btn"
          onClick={() => setSelectedCertificate(null)}
        >
          ×
        </span>

        <img
          src={selectedCertificate.image}
          alt={selectedCertificate.title}
        />

        <h2>{selectedCertificate.title}</h2>

        <p>{selectedCertificate.description}</p>

      </div>

    </div>

  )
}

    </div>

  );

};

export default Certifications;