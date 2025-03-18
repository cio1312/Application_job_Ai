import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  // Retrieve user info from localStorage
  const user = JSON.parse(localStorage.getItem('user'));

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('user'); // Clear user data
    navigate('/'); // Redirect to landing page
  };

  return (
    <header style={styles.header}>
      {/* Left Section: Logo, Company Name, and Jobs button only visible when not logged in */}
      {!user && (
        <div style={styles.leftSection}>
          <div style={styles.logo} onClick={() => navigate('/')}>
            <img 
              src="/images/Companylogo.png" // Add your logo image here
              alt="Linkify Logo" 
              style={styles.logoImage} 
            />
            <span style={styles.companyName}>Linkify</span>
          </div>
          <button onClick={() => navigate('/jobs')} style={styles.jobsButton}>
            Jobs
          </button>
        </div>
      )}

      {/* Right Section: Login/Register or User Info */}
      <div style={styles.rightSection}>
        {user ? (
          <div style={styles.userInfo}>
            <span style={styles.welcomeText}>Welcome, {user.username || 'User'}!</span>
            <button onClick={handleLogout} style={styles.logoutButton}>
              Logout
            </button>
          </div>
        ) : (
          <div style={styles.authLinks}>
            <button onClick={() => navigate('/login')} style={styles.loginButton}>
              Login
            </button>
            <button onClick={() => navigate('/register')} style={styles.registerButton}>
              Register
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

const styles = {
  header: {
    padding: '10px 20px',
    background: '#282c34',
    color: '#fff',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  leftSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
  },
  logoImage: {
    width: '40px',
    height: '40px',
    marginRight: '10px',
  },
  companyName: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#fff',
  },
  jobsButton: {
    backgroundColor: '#3498db',
    color: '#fff',
    border: 'none',
    padding: '8px 15px',
    fontSize: '14px',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  rightSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
  },
  authLinks: {
    display: 'flex',
    gap: '10px',
  },
  loginButton: {
    backgroundColor: '#3498db',
    color: '#fff',
    border: 'none',
    padding: '8px 15px',
    fontSize: '14px',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  registerButton: {
    backgroundColor: '#2ecc71',
    color: '#fff',
    border: 'none',
    padding: '8px 15px',
    fontSize: '14px',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
  },
  welcomeText: {
    fontSize: '16px',
    color: '#fff',
  },
  logoutButton: {
    backgroundColor: '#e74c3c',
    color: '#fff',
    border: 'none',
    padding: '8px 15px',
    fontSize: '14px',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
};

export default Header;
