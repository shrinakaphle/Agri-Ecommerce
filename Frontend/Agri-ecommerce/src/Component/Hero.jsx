import{useState,useEffect} from "react";

import slide1 from "../assets/welcomeimage.jpg";
import slide2 from "../assets/products.png";
import slide3 from "../assets/premiumfeed.png";
import slide4 from "../assets/domestic.png";
import slide5 from "../assets/delivery.png";


import "../index.css";


  const slides = [
    {
      image: slide1,
      title: "Welcome to Amarsiddhi Krishi Udhyog",
      desc: "Premium Animal Feed for Healthy Livestock",
    },

    {
      image: slide2,
      title: "High Quality Feed Products",
      desc: "Nutrition solutions for cows, buffalo, and poultry",
    },

    {
      image: slide3,
      title: "Trusted By Farmers",
      desc: "Improving livestock health across Nepal",
    },

    {
      image: slide4,
      title: "Premium Feeds & Supplements Tailored for Animals",
      desc: "Healthy nutrition for better livestock growth",
    },

    {
      image: slide5,
      title: "Reliable & Fast Delivery",
      desc: "Fast delivery service across Nepal",
    },
  ];
  const Hero =()=>{

  const [current, setCurrent] = useState(0);

// NEXT SLIDE
const nextSlide = () => {
  setCurrent((prev) =>
    prev === slides.length - 1 ? 0 : prev + 1
  );
};

// PREV SLIDE
const prevSlide = () => {
  setCurrent((prev) =>
    prev === 0 ? slides.length - 1 : prev - 1
  );
};

// AUTO SLIDE
useEffect(() => {
  const interval = setInterval(() => {
    setCurrent((prev) =>
      prev === slides.length - 1 ? 0 : prev + 1
    );
  }, 4000);

  return () => clearInterval(interval);
}, []);


  return (
    <div className="hero-slider">

      {/* BACKGROUND IMAGE */}
      <div
        className="hero-bg"
        style={{
          backgroundImage: `url(${slides[current].image})`,
        }}
      ></div>

      {/* DARK OVERLAY */}
      <div className="overlay"></div>

      {/* TEXT CONTENT */}
      <div className="hero-content">
        <h1>{slides[current].title}</h1>
        <p>{slides[current].desc}</p>

        <button className="hero-btn">
         Contact Us
        </button>
      </div>

      {/* LEFT ARROW
      <button className="arrow left" onClick={prevSlide}>
        ❮
      </button> */}

      {/* RIGHT ARROW */}
      <button className="arrow right" onClick={nextSlide}>
        ❯
      </button>

      {/* DOTS */}
      <div className="dots">
        {slides.map((_, index) => (
          <span
            key={index}
            className={current === index ? "dot active" : "dot"}
            onClick={() => setCurrent(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Hero;