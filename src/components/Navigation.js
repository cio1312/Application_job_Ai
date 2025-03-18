import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Navigation = () => {
  const navigate = useNavigate();
  const [loadingMessage, setLoadingMessage] = useState(""); // State for loading message

  const handleCourseClick = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) {
        alert("Please login first");
        navigate("/login");
        return;
      }

      const userId = user.adminId;

      // Check payment status
      const response = await axios.get(
        `http://localhost:8080/api/jobs/check-payment/${userId}`
      );

      if (response.data.hasPaid) {
        navigate("/courses"); // If paid, go to courses
      } else {
        setLoadingMessage("Payment not completed. Redirecting to payment page...");

        setTimeout(() => {
          navigate("/payment"); // Redirect after 3 seconds
        }, 3000);
      }
    } catch (error) {
      console.error("Error checking payment status:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="navigation-container">
      <nav className="navigation">
        <ul className="navigation-tabs">
          <li>
            <Link to="/profile" className="tab">
              Profile
            </Link>
          </li>
          <li>
            <Link to="/jobs" className="tab">
              Job Listings
            </Link>
          </li>
          <li>
            <button onClick={handleCourseClick} className="tab">
              Premium Courses
            </button>
          </li>
          <li>
  <Link to="/chatbot" className="tab">
    Chat with Us
  </Link>
</li>

        </ul>
      </nav>

      {/* Show loading message if payment is not completed */}
      {loadingMessage && <p className="loading-message">{loadingMessage}</p>}

      <style>
        {`
        /* General Container Styling */
        .navigation-container {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background-color: #1e1e1e; /* Dark gray background */
          color: white;
        }

        /* Navigation Styling */
        .navigation {
          text-align: center;
        }

        /* Tabs Styling */
        .navigation-tabs {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          gap: 20px; /* Spacing between tabs */
        }

        .tab {
          display: inline-block;
          padding: 15px 30px;
          font-size: 1.2rem;
          font-weight: bold;
          color: white;
          text-decoration: none;
          background: linear-gradient(145deg, #222, #2c2c2c);
          border: 2px solid #00b4d8;
          border-radius: 12px;
          box-shadow: 
            4px 4px 10px rgba(0, 0, 0, 0.7), 
            -4px -4px 10px rgba(255, 255, 255, 0.1), 
            0px 0px 15px rgba(0, 180, 216, 0.5);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          position: relative;
        }

        /* Floating effect */
        .tab:hover {
          transform: translateY(-8px);
          box-shadow: 
            6px 6px 15px rgba(0, 0, 0, 0.9), 
            -6px -6px 15px rgba(255, 255, 255, 0.15), 
            0px 0px 20px rgba(0, 180, 216, 0.8);
        }

        /* Pressed-down effect */
        .tab:active {
          transform: translateY(4px);
          box-shadow: 
            2px 2px 6px rgba(0, 0, 0, 0.6), 
            -2px -2px 6px rgba(255, 255, 255, 0.05), 
            0px 0px 10px rgba(0, 180, 216, 0.5);
        }

        /* Loading message styling */
        .loading-message {
          margin-top: 20px;
          font-size: 1.2rem;
          color: #ffcc00; /* Yellow warning text */
          animation: fadeIn 1s ease-in-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .tab {
            font-size: 1rem;
            padding: 12px 24px;
          }
        }
        `}
      </style>
    </div>
  );
};

export default Navigation;
