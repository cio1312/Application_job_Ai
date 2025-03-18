import Footer from './Footer'; // Import Footer
import React, { useState, useEffect } from 'react';

const LandingPage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    '/images/banner1.png',
    '/images/banner2.jpeg',
    '/images/banner3.jpg',
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2500);

    return () => clearInterval(intervalId);
  }, [images.length]);

  return (
    <div className="landing-page">
      {/* Title */}
      <h1 className="landing-title">Linkify</h1>

      {/* Banner Slider */}
      <div className="banner-slider">
        <div className="image-overlay"></div>
        <img
          src={images[currentImageIndex]}
          alt={`Banner ${currentImageIndex + 1}`}
          className="banner-image"
        />
      </div>

      <style>
        {`
        /* General Styling */
        body {
          font-family: 'Roboto', sans-serif;
          margin: 0;
          padding: 0;
          background-color: #1e1e1e; /* Dark gray background */
          color: white;
        }
        
        .landing-page {
          text-align: center;
          padding: 20px;
        }
        
        /* Title Styling */
        .landing-title {
          font-size: 3rem;
          color: #38b2ac; /* Green shade */
          margin: 20px 0;
          font-weight: bold;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
        }
        
        /* Banner Slider Styles */
        .banner-slider {
          position: relative;
          width: 100%;
          height: 60vh;
          overflow: hidden;
          margin: 0 auto;
          display: flex;
          justify-content: center;
          align-items: center;
          border: 5px solid #38b2ac; /* Green border */
          border-radius: 15px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.6);
        }
        
        .banner-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 15px;
        }
        
        .image-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(56, 178, 172, 0.3); /* Green reflective overlay */
          z-index: 1;
          pointer-events: none;
        }
        
        .banner-slider img {
          position: relative;
          z-index: 2;
        }
        
        /* Responsive Design for Banner */
        @media (max-width: 768px) {
          .landing-title {
            font-size: 2.5rem;
          }
        
          .banner-slider {
            height: 50vh;
          }
        
          .banner-image {
            object-fit: cover;
          }
        }
        
        @media (max-width: 480px) {
          .landing-title {
            font-size: 2rem;
          }
        
          .banner-slider {
            height: 40vh;
          }
        }
        `}
      </style>
      <Footer/>
    </div>
  );
};

export default LandingPage;
