import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaFacebookF, FaYoutube, FaInstagram, FaLinkedinIn, FaChevronRight } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="custom-footer pt-5 pb-4">
      <div className="container">
        
        <div className="row gy-4">
          
          
          <div className="col-12 col-md-6">
            <div className="d-flex align-items-center gap-2 mb-3">
              <span className="brand-title text-uppercase">INTERNS</span>
              <span className="fs-5" role="img" aria-label="Pakistan Flag">.me</span>
            </div>
            <h2 className="main-heading fs-2">
              Enabling Individuals to live meaningful Lives
            </h2>
          </div>

          
          <div className="col-6 col-md-2">
            <ul className="footer-link-list">
              <li><a href="#programs">Programs</a></li>
              <li><a href="#reports">Reports</a></li>
              <li><a href="#interns-lab">Interns Lab</a></li>
              <li><a href="#wall-of-love">Wall of Love</a></li>
              <li><a href="#about-us">About Us</a></li>
            </ul>
          </div>

        
          <div className="col-6 col-md-3">
            <ul className="footer-link-list">
              <li><a href="#work-with-us">Work With Us</a></li>
              <li><a href="#hire-internee">Hire Internee</a></li>
              <li><a href="#support">Support</a></li>
              <li><a href="#contact-us">Contact Us</a></li>
            </ul>
          </div>

          
          <div className="col-12 col-md-1 d-flex flex-md-column gap-3 social-icons-column">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
              <FaFacebookF size={20} />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube">
              <FaYoutube size={20} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
              <FaInstagram size={20} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <FaLinkedinIn size={20} />
            </a>
          </div>

        </div>

        
        <hr className="footer-divider" />

      
        <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center gap-2">
          <p className="footer-copyright mb-0">
            © 2023 Copyrights Governed By Interns Pakistan.
          </p>
          <a href="#privacy-policy" className="privacy-link d-flex align-items-center gap-1">
            Privacy Policy <FaChevronRight size={12} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;