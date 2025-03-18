import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook

const ViewApplications = () => {
  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate(); // Initialize the useNavigate hook

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user || user.role !== 'ADMIN') {
          throw new Error('Unauthorized');
        }

        const adminId = user.adminId; // Get the admin ID from localStorage

        const response = await fetch(`http://localhost:8080/api/jobs/admin/${adminId}/applications`);
        if (!response.ok) {
          throw new Error('Error fetching applications');
        }

        const data = await response.json();
        setApplications(data);
      } catch (error) {
        console.error('Error fetching applications:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const downloadAsExcel = () => {
    if (applications.length === 0) {
      alert("No applications available to download.");
      return;
    }

    const dataToExport = applications.map((app) => ({
      JobTitle: app.job.jobTitle,
      ApplicantName: app.user.username,
      Email: app.userEmail,
      PhoneNumber: app.userPhoneNumber,
      Status: app.applicationStatus,
      ExperienceYears: app.userExperience,
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Applications");

    XLSX.writeFile(workbook, "JobApplications.xlsx");
  };

  if (isLoading) {
    return <div style={styles.loading}>Loading applications...</div>;
  }

  if (applications.length === 0) {
    return <div style={styles.message}>No applications available.</div>;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Job Applicants</h1>
      
      {/* Back Button */}
      <button onClick={() => navigate('/admin-dashboard')} style={styles.backButton}>
        Back to Dashboard
      </button>

      <button onClick={downloadAsExcel} style={styles.downloadButton}>
        Download as Excel
      </button>

      <ul style={styles.applicationList}>
        {applications.map((application) => (
          <li key={application.id} style={styles.applicationItem}>
            <div style={styles.jobTitle}>Job Title: {application.job.jobTitle}</div>
            <div style={styles.applicationDetails}>
              <p><strong>Applicant:</strong> {application.user.username}</p>
              <p><strong>Email:</strong> {application.userEmail}</p>
              <p><strong>Phone Number:</strong> {application.userPhoneNumber}</p>
              <p><strong>Status:</strong> {application.applicationStatus}</p>
              <p><strong>Experience:</strong> {application.userExperience} years</p>
              <p><strong>Experience Detail:</strong> {application.user.experienceDetail} years</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#121212', // Dark background
    color: '#ffffff', // White text for contrast
    fontFamily: 'Arial, sans-serif',
    padding: '30px',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  header: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '#1E90FF', // Glowing Blue for the header
    marginBottom: '20px',
    textShadow: '0 0 10px rgba(30, 144, 255, 0.8)', // Glowing effect
  },
  backButton: {
    padding: '10px 20px',
    backgroundColor: '#FF6347', // Red button for the back button
    color: 'white',
    fontSize: '1rem',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginBottom: '20px',
  },
  downloadButton: {
    padding: '12px 25px',
    backgroundColor: '#4CAF50', // Green button for download
    color: 'white',
    fontSize: '1.1rem',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    boxShadow: '0 4px 8px rgba(0, 128, 0, 0.3)',
    transition: '0.3s ease',
    marginBottom: '30px',
  },
  applicationList: {
    width: '100%',
    maxWidth: '800px',
    listStyleType: 'none',
    padding: '0',
    margin: '0',
  },
  applicationItem: {
    backgroundColor: '#2C3E50', // Dark grey for application items
    padding: '20px',
    marginBottom: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
    transition: '0.3s ease',
  },
  jobTitle: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#FF6347', // Orange-red for job title
    marginBottom: '10px',
  },
  applicationDetails: {
    fontSize: '1rem',
    color: '#BDC3C7', // Lighter text for details
  },
  loading: {
    color: '#ffffff',
    fontSize: '1.5rem',
    marginTop: '50px',
  },
  message: {
    color: '#ffffff',
    fontSize: '1.5rem',
    marginTop: '50px',
  },
};

export default ViewApplications;
