import React from 'react';
import {
  FaLeaf,
  FaHeart,
  FaStar,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";
import { motion } from 'framer-motion';
import Footer from '../Footer'; 
import "./AboutUs.css";
import aboutBanner from "../../assets/about-banner.png";
import founderImg from "../../assets/user2.jpg";

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

const AboutUs = () => {
  return (
    <>
      <div className="about-us-page">
        <header
          className="about-header"
          style={{ backgroundImage: `url(${aboutBanner})` }}
        >
          <motion.div 
            className="header-overlay"
            variants={headerTextContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.h1 variants={headerTextItem}>Our Story: The Heart of Beauty</motion.h1>
            <motion.p variants={headerTextItem}>Discover the passion and purpose behind BeautyHere.</motion.p>
          </motion.div>
        </header>

        <motion.section 
          id="our-mission"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <div className="mission-container">
            <h2 className="section-title">Our Mission</h2>
            <p className="mission-statement">
              "To empower every individual to feel confident and beautiful in
              their own skin by providing high-quality, accessible, and
              cruelty-free beauty products. We believe that beauty is a form of
              self-expression, and our mission is to provide the tools for your
              unique art."
            </p>
          </div>
        </motion.section>

        <motion.section 
          id="meet-founder"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="founder-container">
            <motion.div 
              className="founder-image"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            >
              <img src={founderImg} alt="Fatima Ali, Founder of BeautyHere" />
            </motion.div>
            <motion.div 
              className="founder-text"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
            >
              <h3>A Word From Our Founder</h3>
              <h2>Fatima Ali</h2>
              <p>
                "BeautyHere started from a simple dream: to create a beauty brand
                that is both luxurious and kind. As a lifelong beauty enthusiast,
                I wanted to build a community where everyone feels included and
                celebrated. Every product we create is a piece of my heart,
                crafted with love, care, and a commitment to quality. Thank you
                for being a part of our beautiful journey."
              </p>
            </motion.div>
          </div>
        </motion.section>
        
        <motion.section 
          id="our-values"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="section-title">What We Stand For</h2>
          <motion.div 
            className="values-container"
            variants={staggerContainer}
          >
            <motion.div className="value-card" variants={itemVariants}>
              <FaStar className="value-icon" />
              <h3>Uncompromising Quality</h3>
              <p>
                We source the finest ingredients to create effective and safe
                products you can trust.
              </p>
            </motion.div>
            <motion.div className="value-card" variants={itemVariants}>
              <FaLeaf className="value-icon" />
              <h3>Cruelty-Free Always</h3>
              <p>
                Our love for animals means we never test our products on them,
                ever.
              </p>
            </motion.div>
            <motion.div className="value-card" variants={itemVariants}>
              <FaHeart className="value-icon" />
              <h3>Customer Love</h3>
              <p>
                You are at the heart of everything we do. Your satisfaction is our
                top priority.
              </p>
            </motion.div>
          </motion.div>
        </motion.section>

        <motion.section 
          id="contact-info"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="section-title">Get In Touch</h2>
          <motion.div 
            className="contact-container"
            variants={staggerContainer}
          >
            <motion.div className="contact-item" variants={itemVariants}>
              <FaMapMarkerAlt className="contact-icon" />
              <h4>Our Location</h4>
              <a href="https://www.google.com/maps/place/Phool+Nagar/@31.2081815,73.9448758,13z/data=!3m1!4b1!4m6!3m5!1s0x39185b83806953ff:0x2dbd883cdcd1d19a!8m2!3d31.205781!4d73.9370389!16s%2Fm%2F0bmh_3l?entry=ttu&g_ep=EgoyMDI1MDYxMS4wIKXMDSoASAFQAw%3D%3D">
                Main Multan Road, Phool Nagar, Pakistan
              </a>
            </motion.div>
            <motion.div className="contact-item" variants={itemVariants}>
              <FaEnvelope className="contact-icon" />
              <h4>Email Us</h4>
              <a href="mailto:fizamuneer0101@gmail.com">
                fizamuneer0101@gmail.com
              </a>
            </motion.div>
            <motion.div className="contact-item" variants={itemVariants}>
              <FaPhone className="contact-icon" />
              <h4>Call Us</h4>
              <a href="tel:+923284008871">+92 328 4008871</a>
            </motion.div>
          </motion.div>
        </motion.section>
      </div>

      <Footer />
    </>
  );
};

export default AboutUs;