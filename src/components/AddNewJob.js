import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddNewJob = () => {
  const [profileData, setProfileData] = useState({
    companyName: '',
    companyTheme: '',
    companyDescription: '',
    companyPolicies: '',
    about: '',
    contact: '',
    jobTitle: '',
    jobDescription: '',
    location: '',
    isActive: true, // Default isActive to true
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProfileData({
      ...profileData,
      [name]: type === 'checkbox' ? checked : value, // Handle boolean fields
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Retrieve adminId from localStorage
    const user = JSON.parse(localStorage.getItem('user'));
    const adminId = user?.adminId; // Get the adminId from localStorage

    if (!adminId) {
      alert('Admin ID not found');
      return;
    }

    // Add adminId to the profile data
    const jobData = { ...profileData, adminId };

    fetch('http://localhost:8080/api/jobs/admin-dashboard', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(jobData), // Send job data including adminId
      credentials: 'include',
    })
      .then((response) => response.json())
      .then(() => {
        alert('Job added successfully!');
        navigate('/admin-dashboard'); // Navigate back to the dashboard after success
      })
      .catch((error) => {
        console.error('Error saving job:', error);
        alert('Error saving job.');
      });
  };

  const handleBackButton = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <div style={styles.container}>
      {/* Background Video */}
      <video 
        autoPlay 
        loop 
        muted 
        style={styles.backgroundVideo}
      >
        <source src="/images/3163534-uhd_3840_2160_30fps.mp4" type="video/mp4" />
      </video>

      <h1 style={styles.header}>Add New Job</h1>
      <button onClick={handleBackButton} style={styles.backButton}>Back</button> {/* Back Button */}
      <form onSubmit={handleFormSubmit} style={styles.form}>
        <div style={styles.inputContainer}>
          <label style={styles.label}>Job Title</label>
          <input
            type="text"
            name="jobTitle"
            value={profileData.jobTitle}
            onChange={handleInputChange}
            placeholder="Enter Job Title"
            style={styles.inputField}
          />
        </div>
        <div style={styles.inputContainer}>
          <label style={styles.label}>Job Description</label>
          <textarea
            name="jobDescription"
            value={profileData.jobDescription}
            onChange={handleInputChange}
            placeholder="Enter Job Description"
            style={styles.textareaField}
          />
        </div>
        <div style={styles.inputContainer}>
          <label style={styles.label}>Location</label>
          <input
            type="text"
            name="location"
            value={profileData.location}
            onChange={handleInputChange}
            placeholder="Enter Location"
            style={styles.inputField}
          />
        </div>
        <div style={styles.inputContainer}>
          <label style={styles.label}>Active</label>
          <input
            type="checkbox"
            name="isActive"
            checked={profileData.isActive}
            onChange={handleInputChange}
            style={styles.checkbox}
          />
        </div>

        {/* Admin Dashboard Fields */}
        <div style={styles.inputContainer}>
          <label style={styles.label}>Company Name</label>
          <input
            type="text"
            name="companyName"
            value={profileData.companyName}
            onChange={handleInputChange}
            placeholder="Enter Company Name"
            style={styles.inputField}
          />
        </div>
        <div style={styles.inputContainer}>
          <label style={styles.label}>Company Theme</label>
          <input
            type="text"
            name="companyTheme"
            value={profileData.companyTheme}
            onChange={handleInputChange}
            placeholder="Enter Company Theme"
            style={styles.inputField}
          />
        </div>
        <div style={styles.inputContainer}>
          <label style={styles.label}>Company Description</label>
          <textarea
            name="companyDescription"
            value={profileData.companyDescription}
            onChange={handleInputChange}
            placeholder="Enter Company Description"
            style={styles.textareaField}
          />
        </div>
        <div style={styles.inputContainer}>
          <label style={styles.label}>Company Policies</label>
          <textarea
            name="companyPolicies"
            value={profileData.companyPolicies}
            onChange={handleInputChange}
            placeholder="Enter Company Policies"
            style={styles.textareaField}
          />
        </div>
        <div style={styles.inputContainer}>
          <label style={styles.label}>About</label>
          <textarea
            name="about"
            value={profileData.about}
            onChange={handleInputChange}
            placeholder="Enter About Us"
            style={styles.textareaField}
          />
        </div>
        <div style={styles.inputContainer}>
          <label style={styles.label}>Contact</label>
          <textarea
            name="contact"
            value={profileData.contact}
            onChange={handleInputChange}
            placeholder="Enter Contact Info"
            style={styles.textareaField}
          />
        </div>

        <button type="submit" style={styles.submitButton}>
          Save Job
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    color: 'white',
    fontFamily: 'Arial, sans-serif',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    position: 'relative', // Ensures content is above the video
    zIndex: 1, // Makes sure content is on top of the video
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    zIndex: -1, // Ensures the video is behind the content
  },
  header: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '#1E90FF', // Glowing Blue Text Color
    marginBottom: '30px',
    textShadow: '0 0 10px rgba(30, 144, 255, 0.8)', // Glowing effect
  },
  form: {
    backgroundColor: 'rgba(44, 62, 80, 0.8)', // Semi-transparent background
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
    width: '100%',
    maxWidth: '500px',
  },
  inputContainer: {
    marginBottom: '15px',
  },
  label: {
    fontSize: '1rem',
    marginBottom: '5px',
  },
  inputField: {
    width: '100%',
    padding: '10px',
    fontSize: '1rem',
    borderRadius: '5px',
    border: '1px solid #BDC3C7',
    backgroundColor: '#34495E',
    color: 'white',
    boxShadow: '0 0 5px rgba(30, 144, 255, 0.5)',
    transition: '0.3s ease',
  },
  textareaField: {
    width: '100%',
    padding: '10px',
    fontSize: '1rem',
    borderRadius: '5px',
    border: '1px solid #BDC3C7',
    backgroundColor: '#34495E',
    color: 'white',
    boxShadow: '0 0 5px rgba(30, 144, 255, 0.5)',
    transition: '0.3s ease',
    resize: 'vertical',
  },
  checkbox: {
    marginTop: '5px',
  },
  submitButton: {
    backgroundColor: '#1E90FF', // Glowing Blue Button
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1.1rem',
    transition: '0.3s ease',
    boxShadow: '0 0 10px rgba(30, 144, 255, 0.6)',
  },
  backButton: {
    backgroundColor: '#FF6347', // Light Red Button
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1rem',
    marginBottom: '20px',
    boxShadow: '0 0 5px rgba(255, 99, 71, 0.6)',
  },
};

export default AddNewJob;
