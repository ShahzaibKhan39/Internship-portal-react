import React from 'react';
import { Carousel, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // NEW: Import useNavigate
import './Hero.css';

import slideImg1 from '../assets/Hero1.jpg';
import slideImg2 from '../assets/Hero2.jpg';
import slideImg3 from '../assets/Hero3.jpg';

function Hero() {
  const navigate = useNavigate(); // Initialize navigation controller

  return (
    <div className="hero-container">
      <div className="hero-logo-branding">SR6</div>

      <Carousel 
        fade 
        interval={5000} 
        pause="hover"   
        indicators={false}
        nextLabel="" 
        prevLabel=""
        className="hero-carousel"
      >
        {/* Slide 1: Web Developer */}
        <Carousel.Item className="hero-carousel-item">
          <div 
            className="hero-slide-bg" 
            style={{ backgroundImage: `url(${slideImg1})` }}
            role="img"
            aria-label="WEB DEVELOPER"
          />
          <div className="hero-caption-overlay">
            <h1 className="hero-title">WEB DEVELOPER</h1>
            <h3 className="hero-subtitle">INTERNSHIP PROGRAM</h3>
            <p className="hero-description">
              Master modern web development with hands-on projects in React, Node.js, and modern CSS frameworks. Build real-world web applications alongside industry mentors.
            </p>
            
            <Button 
              variant="outline-light" 
              className="hero-cta-btn"
              onClick={() => navigate('/apply', { state: { jobTitle: 'Web Developer' } })}
            >
              Apply Now
            </Button>
          </div>
        </Carousel.Item>

        
        <Carousel.Item className="hero-carousel-item">
          <div 
            className="hero-slide-bg" 
            style={{ backgroundImage: `url(${slideImg2})` }}
            role="img"
            aria-label="AI ENGINEER"
          />
          <div className="hero-caption-overlay">
            <h1 className="hero-title">AI ENGINEER</h1>
            <h3 className="hero-subtitle">INTERNSHIP PROGRAM</h3>
            <p className="hero-description">
              Dive into machine learning, deep learning, and natural language processing. Gain practical experience training models, working with LLMs, and building intelligent solutions.
            </p>
            
            <Button 
              variant="outline-light" 
              className="hero-cta-btn"
              onClick={() => navigate('/apply', { state: { jobTitle: 'AI Engineer' } })}
            >
              Apply Now
            </Button>
          </div>
        </Carousel.Item>

        
        <Carousel.Item className="hero-carousel-item">
          <div 
            className="hero-slide-bg" 
            style={{ backgroundImage: `url(${slideImg3})` }}
            role="img"
            aria-label="DATABASE"
          />
          <div className="hero-caption-overlay">
            <h1 className="hero-title">DATABASE</h1>
            <h3 className="hero-subtitle">SPECIALIST INTERNSHIP</h3>
            <p className="hero-description">
              Learn robust database design, query optimization, and management across SQL and NoSQL systems. Architect scalable data foundations for high-performance applications.
            </p>
            
            <Button 
              variant="outline-light" 
              className="hero-cta-btn"
              onClick={() => navigate('/apply', { state: { jobTitle: 'Database Specialist' } })}
            >
              Apply Now
            </Button>
          </div>
        </Carousel.Item>
      </Carousel>

      <div className="hero-footer-branding">FB / IG / YT</div>
    </div>
  );
}

export default Hero;
