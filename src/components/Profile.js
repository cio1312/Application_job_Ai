import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // To handle navigation
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); // Hook to navigate programmatically
  const username = JSON.parse(localStorage.getItem('user'))?.username; // Retrieve username from localStorage

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/auth/profile?username=${username}`);
        const data = response.data;

        // Normalize experienceDetail to always be an array
        if (data.experienceDetail && !Array.isArray(data.experienceDetail)) {
          data.experienceDetail = [data.experienceDetail];
        }

        setUser(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
        alert('Failed to load user profile.');
      }
    };

    if (username) {
      fetchUserData();
    }
  }, [username]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container">
      {/* Button Container for spacing */}
      <div className="button-container">
        {/* Back Button */}
        <button className="back-button" onClick={() => navigate(-1)}>
          ⬅ Back
        </button>

        {/* Interview Questions Button */}
        <button className="interview-button"
          onClick={() => {
            console.log("Navigating with experience:", user.experienceDetail);
            navigate('/interview', { state: { experience: user.experienceDetail } });
          }}
        >
          Possible Interview Questions
        </button>
      </div>

      {/* Profile Header */}
      <div className="profile-header">
        <img
          src={user.photoUrl || 'default-profile-pic.jpg'}
          alt="Profile"
          className="profile-pic"
        />
        <div className="profile-details">
          <h2>{user.username}</h2>
          <h3>{user.role}</h3>
          <p>{user.description || 'No description provided.'}</p>
        </div>
      </div>

      {/* Profile Info */}
      <div className="profile-info">
        {/* Experience Section */}
        <h4>Experience</h4>
        <ul>
          {Array.isArray(user.experienceDetail) && user.experienceDetail.length > 0 ? (
            user.experienceDetail.map((exp, index) => (
              <li key={index}>
                <strong>{exp}</strong>
              </li>
            ))
          ) : (
            <p>No experience details available.</p>
          )}
        </ul>

        {/* Contact Section */}
        <h4>Contact</h4>
        <p>
          <strong>Email:</strong> {user.email || 'Not provided'}
        </p>
        <p>
          <strong>Phone:</strong> {user.phoneNumber || 'Not provided'}
        </p>
        <p>
          <strong>Address:</strong> {user.currentAddress || 'No address provided.'}
        </p>
        <p>
          <strong>Date of Birth:</strong> {user.dob ? new Date(user.dob).toLocaleDateString() : 'Not provided'}
        </p>
        <p>
          <strong>Total Experience:</strong> {user.totalExperience || 'Not provided'}
        </p>
      </div>

      <style>
        {`
        /* General Styling */
        body {
          font-family: 'Roboto', sans-serif;
          margin: 0;
          padding: 0;
          background-color: #f3f4f6; /* Light gray background for a professional look */
          color: #333; /* Dark text for contrast */
        }

        .profile-container {
          max-width: 800px;
          margin: 40px auto;
          background: #ffffff;
          border-radius: 12px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          padding: 20px;
        }

        /* Button Container */
        .button-container {
          display: flex;
          justify-content: space-between;
          margin-bottom: 20px;
        }

        /* Button Styling */
        .back-button, .interview-button {
          background-color: #0078d7; /* Vibrant blue */
          color: white;
          border: none;
          padding: 10px 20px;
          font-size: 1rem;
          border-radius: 8px;
          cursor: pointer;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
          transition: background-color 0.3s, transform 0.2s;
        }

        .back-button:hover, .interview-button:hover {
          background-color: #005fa3;
          transform: scale(1.05);
        }

        /* Profile Header */
        .profile-header {
          background: linear-gradient(135deg, #0078d7, #00b4d8); /* Vibrant blue gradient */
          color: white;
          text-align: center;
          padding: 20px;
        }

        .profile-pic {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          border: 4px solid white;
          margin-bottom: 15px;
        }

        .profile-details h2 {
          font-size: 1.8rem;
          margin: 0;
        }

        .profile-details h3 {
          font-size: 1.2rem;
          margin: 5px 0;
          font-weight: normal;
          opacity: 0.9;
        }

        .profile-details p {
          font-size: 1rem;
          margin: 10px 0 0;
        }
        `}
      </style>
    </div>
  );
};

export default Profile;