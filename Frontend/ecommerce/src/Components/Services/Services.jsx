import './Services.css';
import { FaUserTie, FaSpa, FaRegHeart } from 'react-icons/fa';
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

const Services = () => {
  return (
    <div className="services-page">
      <header className="services-header">
        <div className="header-overlay">
          <h1>Indulge in Ultimate Pampering</h1>
          <p>Discover our range of professional beauty services designed to make you look and feel your best.</p>
        </div>
      </header>
      
      <section id="why-choose-us">
        <div className="why-choose-us-container">
            <div className="feature-box">
                <FaUserTie className="feature-icon" />
                <h3>Expert Staff</h3>
                <p>Our team consists of certified and experienced beauty professionals.</p>
            </div>
            <div className="feature-box">
                <FaSpa className="feature-icon" />
                <h3>Premium Products</h3>
                <p>We use only high-quality, trusted brands for all our treatments.</p>
            </div>
            <div className="feature-box">
                <FaRegHeart className="feature-icon" />
                <h3>Relaxing Ambiance</h3>
                <p>Enjoy our services in a clean, calm, and welcoming environment.</p>
            </div>
        </div>
      </section>

      <main id="our-services">
        <h2 className="section-title">Our Signature Services</h2>
        <div className="services-container">
          {servicesData.map((service, index) => (
            <div className="service-card" key={index}>
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
            </div>
          ))}
        </div>
      </main>

      <section id="booking-cta">
        <h2>Ready to Feel Rejuvenated?</h2>
        <p>Book your appointment with us today and take the first step towards a more beautiful you.</p>
        <a href="/about" className="btn-primary">Book an Appointment</a>
      </section>
    </div>
  );
};

export default Services;