import './AboutUs.css'; 
import { FaLeaf, FaHeart, FaStar, FaMapMarkerAlt, FaEnvelope, FaPhone } from 'react-icons/fa';
import aboutBanner from '../assets/about-banner.png'; 
import founderImg from '../assets/user2.jpg'; 

const AboutUs = () => {
  return (
    <div className="about-us-page">
      <header className="about-header" style={{ backgroundImage: `url(${aboutBanner})` }}>
        <div className="header-overlay">
          <h1>Our Story: The Heart of Beauty</h1>
          <p>Discover the passion and purpose behind BeautyHere.</p>
        </div>
      </header>
            <section id="our-mission">
        <div className="mission-container">
            <h2 className="section-title">Our Mission</h2>
            <p className="mission-statement">
                "To empower every individual to feel confident and beautiful in their own skin by providing high-quality, accessible, and cruelty-free beauty products. We believe that beauty is a form of self-expression, and our mission is to provide the tools for your unique art."
            </p>
        </div>
      </section>

      <section id="meet-founder">
          <div className="founder-container">
              <div className="founder-image">
                  <img src={founderImg} alt="Fiza Mughal, Founder of BeautyHere" />
              </div>
              <div className="founder-text">
                  <h3>A Word From Our Founder</h3>
                  <h2>Fatima Ali</h2>
                  <p>
                      "BeautyHere started from a simple dream: to create a beauty brand that is both luxurious and kind. As a lifelong beauty enthusiast, I wanted to build a community where everyone feels included and celebrated. Every product we create is a piece of my heart, crafted with love, care, and a commitment to quality. Thank you for being a part of our beautiful journey."
                  </p>
              </div>
          </div>
      </section>
      <section id="our-values">
        <h2 className="section-title">What We Stand For</h2>
        <div className="values-container">
            <div className="value-card">
                <FaStar className="value-icon" />
                <h3>Uncompromising Quality</h3>
                <p>We source the finest ingredients to create effective and safe products you can trust.</p>
            </div>
            <div className="value-card">
                <FaLeaf className="value-icon" />
                <h3>Cruelty-Free Always</h3>
                <p>Our love for animals means we never test our products on them, ever.</p>
            </div>
            <div className="value-card">
                <FaHeart className="value-icon" />
                <h3>Customer Love</h3>
                <p>You are at the heart of everything we do. Your satisfaction is our top priority.</p>
            </div>
        </div>
      </section>
      <section id="contact-info">
        <h2 className="section-title">Get In Touch</h2>
        <div className="contact-container">
          <div className="contact-item">
            <FaMapMarkerAlt className="contact-icon" />
            <h4>Our Location</h4>
            <a href="https://www.google.com/maps/place/Phool+Nagar/@31.2081815,73.9448758,13z/data=!3m1!4b1!4m6!3m5!1s0x39185b83806953ff:0x2dbd883cdcd1d19a!8m2!3d31.205781!4d73.9370389!16s%2Fm%2F0bmh_3l?entry=ttu&g_ep=EgoyMDI1MDYxMS4wIKXMDSoASAFQAw%3D%3D">Main Multan Road, Phool Nagar, Pakistan</a>
          </div>
          <div className="contact-item">
            <FaEnvelope className="contact-icon" />
            <h4>Email Us</h4>
            <a href="mailto:fizamuneer0101@gmail.com">fizamuneer0101@gmail.com</a>
          </div>
          <div className="contact-item">
            <FaPhone className="contact-icon" />
            <h4>Call Us</h4>
            <a href="tel:+923284008871">+92 328 4008871</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
