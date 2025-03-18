import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom for navigation

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false); // State to control the popup visibility
  const [popupMessage, setPopupMessage] = useState(''); // Store message for popup
  const navigate = useNavigate(); // Initialize useNavigate for navigation

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/jobs');
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        setJobs(data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleApply = async (jobId) => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user) {
      setPopupMessage('You must be logged in to apply for jobs.');
      setShowPopup(true);
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/jobs/apply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jobId,
          userId: user.adminId,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setPopupMessage('Application submitted successfully!');
        setShowPopup(true);
      } else {
        setPopupMessage(data.message || 'Failed to apply.');
        setShowPopup(true);
      }
    } catch (error) {
      console.error('Error applying for job:', error);
      setPopupMessage('Failed to apply.');
      setShowPopup(true);
    }
  };

  const closePopup = () => {
    setShowPopup(false); // Close the popup
  };

  const handleBackClick = () => {
    navigate(-1); // This takes the user back to the previous page in the browser history
  };

  return (
    <div className="jobs-container" style={{
      padding: '20px',
      minHeight: '100vh',
      background: "url('/images/background.jpg') no-repeat center center fixed",
      backgroundSize: 'cover',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>
      <h2 style={{ color: '#ecf0f1', marginBottom: '20px' }}>Job Listings</h2>

      {/* Back Button */}
      <button 
        onClick={handleBackClick}
        style={{
          backgroundColor: '#95a5a6',
          color: 'white',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          marginBottom: '20px',
        }}
      >
        Back
      </button>

      {isLoading ? (
        <div style={{ color: '#ecf0f1', fontSize: '18px' }}>Loading job listings...</div>
      ) : jobs.length === 0 ? (
        <div style={{
          textAlign: 'center',
          color: '#ecf0f1',
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          padding: '30px',
          borderRadius: '10px'
        }}>
          <h3>No Job Listings Available</h3>
          <p>Check back later for new job opportunities.</p>
        </div>
      ) : (
        <ul className="job-listings" style={{ listStyleType: 'none', padding: 0 }}>
          {jobs.map((job) => (
            <li key={job.id} className="job-card" style={{
              marginBottom: '20px',
              padding: '15px',
              background: 'rgba(52, 73, 94, 0.9)',
              borderRadius: '8px',
              color: '#ecf0f1',
              width: '100%',
              maxWidth: '600px'
            }}>
              <h3>{job.jobTitle}</h3>
              <p><strong>Company:</strong> {job.companyName}</p>
              <p><strong>Location:</strong> {job.location}</p>
              <p><strong>Description:</strong> {job.jobDescription}</p>
              <button 
                onClick={() => handleApply(job.id)} 
                style={{
                  padding: '10px 15px',
                  backgroundColor: '#007BFF',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                }}
              >
                Apply Now
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Popup notification */}
      {showPopup && (
        <div 
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
            zIndex: 1000,
          }}
        >
          <p>{popupMessage}</p>
          <button 
            onClick={closePopup}
            style={{
              padding: '8px 15px',
              backgroundColor: '#007BFF',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Close
          </button>
        </div>
      )}

      {/* Overlay to block interaction with the background when the popup is shown */}
      {showPopup && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 999,
          }}
        />
      )}
    </div>
  );
};

export default Jobs;
