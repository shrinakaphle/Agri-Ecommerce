import "../CSS/OurTeam.css";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  
} from "react-icons/fa";

// import member1 from "../assets/team/member1.jpg";
// import member2 from "../assets/team/member2.jpg";
// import member3 from "../assets/team/member3.jpg";
// import member4 from "../assets/team/member4.jpg";

const teamMembers = [

  {
    name: "Mr Tanka Prasad Kaphle",
    position: "Managing Director",
    description:
      "Leads the company with a vision to provide high-quality livestock feed and support Nepalese farmers."
  },

  {
    name: "Mr Purshottam Kaphle",
    position: "Production Manager",
    description:
      "Supervises daily manufacturing operations while ensuring quality and production efficiency."
  },

  {
    name: "Mrs Sabitra Poudel",
    position: "Sales & Marketing",
    description:
      "Builds strong relationships with distributors and customers across the country."
  },

  {
    name: "Mr. Hari Thapa",
    position: "Quality Control Officer",
    description:
      "Ensures every product meets quality standards before reaching our customers."
  }

];
const OurTeam = () => {

  return (

    <div className="team-page">

      {/* Hero */}

      <section className="team-hero">

        <div className="team-overlay">

          <h1>Our Team</h1>

          <p>

            Meet the passionate people behind

            Amarsiddhi Krishi Udhyog.

          </p>

        </div>

      </section>

      {/* Intro */}

      <section className="team-intro">

        <h2>

          Our Leadership Team

        </h2>

        <p>

          Our experienced professionals are committed to
          delivering high-quality animal nutrition products
          and excellent customer service.

        </p>

      </section>

      {/* Cards */}

      <section className="team-container">

        {

          teamMembers.map((member,index)=>(

            <div
              className="team-card"
              key={index}
            >

           <div className="team-avatar">

  {member.name.split(" ")[1].charAt(0)}

</div>

              <div className="team-content">

                <h3>{member.name}</h3>

                <h4>{member.position}</h4>

                <p>{member.description}</p>

                <div className="team-social">

                  <FaFacebookF/>

                  <FaInstagram/>

                  <FaLinkedinIn/>

                </div>

              </div>

            </div>

          ))

        }

      </section>

    </div>

  );

};

export default OurTeam;