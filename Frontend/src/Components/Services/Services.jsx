import React from 'react';
import { FaUserTie, FaSpa, FaRegHeart } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Footer from '../Footer'; 

import './Services.css';
import facialImg from '../../assets/f1.jpg';
import makeupImg from '../../assets/f2.jpg';
import hairImg from '../../assets/f3.jpeg';
import nailsImg from '../../assets/f4.webp';

const servicesData = [
  {
    title: "Facial Treatments",
    desc: "Experience our premium facial treatments to rejuvenate your skin and give you a glowing, radiant look.",
    img: facialImg,
    link: "/", 
  },
  {
    title: "Professional Makeup",
    desc: "Get the perfect look for any occasion with our expert makeup artists using top-quality products.",
    img: makeupImg,
    link: "/",
  },
  {
    title: "Creative Hair Styling",
    desc: "From elegant cuts to vibrant coloring, we provide a range of styling services to transform your hair.",
    img: hairImg,
    link: "/",
  },
  {
    title: "Manicure & Pedicure",
    desc: "Relax and pamper yourself with our luxurious manicure and pedicure services for beautiful hands and feet.",
    img: nailsImg,
    link: "/",
  },
];

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: "easeOut" } 
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const headerTextContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5, staggerChildren: 0.3 } },
};

const headerTextItem = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
};

const Services = () => {
  return (
    <>
      <div className="services-page">
        <header className="services-header">
          <motion.div 
            className="header-overlay"
            variants={headerTextContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.h1 variants={headerTextItem}>Indulge in Ultimate Pampering</motion.h1>
            <motion.p variants={headerTextItem}>Discover our range of professional beauty services designed to make you look and feel your best.</motion.p>
          </motion.div>
        </header>
        
        <motion.section 
          id="why-choose-us"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div 
            className="why-choose-us-container"
            variants={staggerContainer}
          >
              <motion.div className="feature-box" variants={itemVariants}>
                  <FaUserTie className="feature-icon" />
                  <h3>Expert Staff</h3>
                  <p>Our team consists of certified and experienced beauty professionals.</p>
              </motion.div>
              <motion.div className="feature-box" variants={itemVariants}>
                  <FaSpa className="feature-icon" />
                  <h3>Premium Products</h3>
                  <p>We use only high-quality, trusted brands for all our treatments.</p>
              </motion.div>
              <motion.div className="feature-box" variants={itemVariants}>
                  <FaRegHeart className="feature-icon" />
                  <h3>Relaxing Ambiance</h3>
                  <p>Enjoy our services in a clean, calm, and welcoming environment.</p>
              </motion.div>
          </motion.div>
        </motion.section>

        <motion.main 
          id="our-services"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <h2 className="section-title">Our Signature Services</h2>
          <motion.div 
            className="services-container"
            variants={staggerContainer}
          >
            {servicesData.map((service, index) => (
              <motion.div className="service-card" key={index} variants={itemVariants}>
                <div className="service-img-container">
                  <img src={service.img} alt={service.title} />
                </div>
                <div className="service-card-content">
                  <h3>{service.title}</h3>
                  <p>{service.desc}</p>
                  <a href={service.link} className="btn-primary">
                    Learn More
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.main>

        <motion.section 
          id="booking-cta"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <h2>Ready to Feel Rejuvenated?</h2>
          <p>Book your appointment with us today and take the first step towards a more beautiful you.</p>
          <a href="/about" className="btn-primary">Book an Appointment</a>
        </motion.section>
      </div>
      
      <Footer />
    </>
  );
};

export default Services;