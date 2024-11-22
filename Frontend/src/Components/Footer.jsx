import React from "react";
import './Footer.css';
import fbImg from '../images/fb.jpg';
import instagramImg from '../images/insta.png';
import wpImg from '../images/wh.jpg';

const Footer = () => {
  return (
    <>
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section about">
            <h1 className="logo-text">About</h1>
            <p>
              Gym services include a variety of fitness activities designed to improve health, enhance performance, and support wellness. Offered by expert trainers, these services span personal training, group classes, and specialized programs.
            </p>
          </div>
          <div className="footer-section links">
            <h2>Links</h2>
            <ul>
              <li className="list"><a href="/">Home</a></li>
              <li className="list"><a href="/features">Feature</a></li>
              <li className="list"><a href="/offer">Offer</a></li>
              <li className="list"><a href="/about">About</a></li>
              <li className="list"><a href="/contact">Contact</a></li>
            </ul>
          </div>
          <div className="footer-section contact">
            <h2>Contact Us</h2>
            <p>Gym Management</p>
            <p>Sheetla Colony Kushalpur, Raipur (C.G)</p>
            <p>Email: <a href="mailto:ashishappu43@gmail.com">ashishappu43@gmail.com</a></p>
            <p>Phone: +91-8349485540, +91-9589658796</p>
          </div>
          <div className="footer-section social">
            <h2>Social Media</h2>
            <div className="social-icons">
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                <img src={fbImg} alt="Facebook" className="social-icon" />
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                <img src={instagramImg} alt="Instagram" className="social-icon" />
              </a>
              <a href="https://www.whatsapp.com" target="_blank" rel="noopener noreferrer">
                <img src={wpImg} alt="WhatsApp" className="social-icon" />
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">&copy; Gym Management 2024</div>
      </footer>
    </>
  );
};

export default Footer;
