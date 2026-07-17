import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaPaperPlane
} from "react-icons/fa";
import { useState } from "react";
import { toast } from "react-toastify";
import { sendContact } from "../Service/Api";

import "../CSS/Contact.css";

const Contact = () => {
    const [name, setName] = useState("");

const [email, setEmail] = useState("");

const [subject, setSubject] = useState("");

const [message, setMessage] = useState("");

const handleSubmit = async (e) => {

  e.preventDefault();

  try {

    const response = await sendContact({

      name,

      email,

      subject,

      message

    });

    toast.success(response.data.message);

    setName("");

    setEmail("");

    setSubject("");

    setMessage("");

  } catch (error) {

    toast.error(

      error.response?.data?.message ||

      "Failed to send message"

    );

  }

};

  return (

    <div className="contact-page">

      {/* Hero */}

      <section className="contact-hero">

        <div className="contact-overlay">

          <h1>Contact Us</h1>

          <p>

            We'd love to hear from you.

            Feel free to contact us anytime.

          </p>

        </div>

      </section>

      {/* Contact */}

      <section className="contact-section">

        {/* LEFT */}

        <div className="contact-info">

          <h2>Get In Touch</h2>

          <p>

            Have questions about our products?

            Contact our team and we'll be happy to help.

          </p>

          <div className="info-box">

            <FaPhoneAlt />

            <div>

              <h4>Phone</h4>

              <span>+977-9855071214</span>

            </div>

          </div>

          <div className="info-box">

            <FaEnvelope />

            <div>

              <h4>Email</h4>

              <span>amarsiddhikrishiudhyog@gmail.com</span>

            </div>

          </div>

          <div className="info-box">

            <FaMapMarkerAlt />

            <div>

              <h4>Address</h4>

              <span>Bastipur, Hetauda, Nepal</span>

            </div>

          </div>

          <div className="info-box">

            <FaClock />

            <div>

              <h4>Business Hours</h4>

              <span>Sun - Fri : 9 AM - 6 PM</span>

            </div>

          </div>

        </div>

        {/* RIGHT */}

        <div className="contact-form">

          <h2>Send Message</h2>

        <form onSubmit={handleSubmit}>

            
<input
  type="text"
  placeholder="Full Name"
  value={name}
  onChange={(e) => setName(e.target.value)}
  required
/>
            <input
  type="email"
  placeholder="Email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  required
/>

<input
  type="text"
  placeholder="Subject"
  value={subject}
  onChange={(e) => setSubject(e.target.value)}
  required
/>
           <textarea
  rows="6"
  placeholder="Write your message..."
  value={message}
  onChange={(e) => setMessage(e.target.value)}
  required
></textarea>

            <button type="submit">

  <FaPaperPlane />

  Send Message

</button>

          </form>

        </div>

      </section>

      {/* Google Map */}

      <section className="map-section">

        <iframe
          title="map"
          src="https://www.google.com/maps?q=Bharatpur,Nepal&output=embed"
          loading="lazy"
        ></iframe>

      </section>

    </div>

  );

};

export default Contact;