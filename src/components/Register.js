import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('USER');
  const [dob, setDob] = useState('');
  const [totalExperience, setTotalExperience] = useState('');
  const [experienceDetail, setExperienceDetail] = useState('');
  const [currentAddress, setCurrentAddress] = useState('');
  const [passwordValid, setPasswordValid] = useState({
    minLength: false,
    specialChar: false,
    uppercase: false,
    number: false,
  });
  const [confirmPasswordValid, setConfirmPasswordValid] = useState(false);
  const [hovered, setHovered] = useState(false);

  const validatePassword = (password) => {
    setPassword(password);

    const minLength = password.length >= 8;
    const specialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const uppercase = /[A-Z]/.test(password);
    const number = /\d/.test(password);

    setPasswordValid({
      minLength,
      specialChar,
      uppercase,
      number,
    });
  };

  const validateConfirmPassword = (confirmPassword) => {
    setConfirmPassword(confirmPassword);
    setConfirmPasswordValid(confirmPassword === password);
  };

  const isFormValid = () => {
    const isEmailValid = email;
    return (
      passwordValid.minLength &&
      passwordValid.specialChar &&
      passwordValid.uppercase &&
      passwordValid.number &&
      confirmPasswordValid &&
      confirmPassword === password &&
      isEmailValid
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userDetails = {
      username,
      password,
      email,
      role,
      ...(role === 'USER'
        ? { dob, totalExperience, experienceDetail, currentAddress }
        : {}),
    };

    try {
      const response = await axios.post(
        'http://localhost:8080/api/auth/register',
        userDetails
      );

      alert(response.data);
      setUsername('');
      setPassword('');
      setConfirmPassword('');
      setEmail('');
      setRole('USER');
      setDob('');
      setTotalExperience('');
      setExperienceDetail('');
      setCurrentAddress('');
    } catch (error) {
      console.error('Error during registration:', error);
      alert('Registration failed. Please check your details and try again.');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div
          style={{
            ...styles.logoContainer,
            ...(hovered && styles.logoContainerHover),
          }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <div style={styles.logo} />
        </div>
      
      </div>
      <div style={styles.formContainer}>
        <form onSubmit={handleSubmit} style={styles.form}>
          <h2 style={styles.formTitle}>Register</h2>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.inputField}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => validatePassword(e.target.value)}
            style={styles.inputField}
            required
          />
          <div style={styles.passwordValidation}>
            <ul style={styles.passwordValidationList}>
              <li
                style={{
                  color: passwordValid.minLength ? 'green' : 'red',
                }}
              >
                Minimum 8 characters
              </li>
              <li
                style={{
                  color: passwordValid.specialChar ? 'green' : 'red',
                }}
              >
                At least one special character
              </li>
              <li
                style={{
                  color: passwordValid.uppercase ? 'green' : 'red',
                }}
              >
                At least one uppercase letter
              </li>
              <li
                style={{
                  color: passwordValid.number ? 'green' : 'red',
                }}
              >
                At least one number
              </li>
            </ul>
          </div>
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => validateConfirmPassword(e.target.value)}
            style={styles.inputField}
            required
          />
          <div style={styles.confirmPasswordValidation}>
            <ul>
              <li
                style={{
                  color: confirmPasswordValid ? 'green' : 'red',
                }}
              >
                Passwords match
              </li>
            </ul>
          </div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.inputField}
            required
          />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={styles.inputField}
          >
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
          </select>

          {role === 'USER' && (
            <>
              <label htmlFor="dob" style={styles.label}>
                Date of Birth
              </label>
              <input
                id="dob"
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                style={styles.inputField}
                required
              />
              <input
                type="number"
                placeholder="Total Experience"
                value={totalExperience}
                onChange={(e) => setTotalExperience(e.target.value)}
                style={styles.inputField}
                required
                min="0"
                max="50"
              />
              <textarea
                placeholder="Experience Details"
                value={experienceDetail}
                onChange={(e) => setExperienceDetail(e.target.value)}
                style={styles.textareaField}
              />
              <input
                type="text"
                placeholder="Current Address"
                value={currentAddress}
                onChange={(e) => setCurrentAddress(e.target.value)}
                style={styles.inputField}
              />
            </>
          )}
          <button
            type="submit"
            disabled={!isFormValid()}
            style={styles.submitButton}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#2C3E50',
    fontFamily: 'Arial, sans-serif',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '20px',
    color: 'white',
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '30px',
  },
  logoContainer: {
    position: 'relative',
    borderRadius: '50%',
    width: '140px',
    height: '140px',
    border: '4px solid rgba(30, 144, 255, 0.8)',
    boxShadow: '0 0 30px rgba(30, 144, 255, 0.6)',
    marginBottom: '10px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '10px',
    animation: 'glow 2.5s infinite linear',
    background: 'linear-gradient(45deg, rgba(0, 255, 255, 0.2), rgba(0, 0, 255, 0.3))',
  },
  logo: {
    width: '80%',
    height: '80%',
    borderRadius: '50%',
    backgroundImage: 'url("/images/Companylogo.png")',
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    transition: 'transform 0.3s ease-in-out',
  },
  logoContainerHover: {
    transform: 'scale(1.1)',
    boxShadow: '0 0 50px rgba(30, 144, 255, 0.8)',
  },
  headerTitle: {
    fontSize: '2rem',
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#ecf0f1',
  },
  formContainer: {
    backgroundColor: '#34495E',
    borderRadius: '15px',
    padding: '20px',
    boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)',
    overflowY: 'scroll',
    height: '70vh',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  formTitle: {
    fontSize: '1.8rem',
    color: '#ecf0f1',
    marginBottom: '20px',
    textAlign: 'center',
  },
  inputField: {
    padding: '15px',
    marginBottom: '10px',
    borderRadius: '10px',
    border: '1px solid #BDC3C7',
    backgroundColor: '#2C3E50',
    color: '#ecf0f1',
    fontSize: '1rem',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    transition: '0.3s ease',
  },
  textareaField: {
    padding: '15px',
    marginBottom: '10px',
    borderRadius: '10px',
    border: '1px solid #BDC3C7',
    backgroundColor: '#2C3E50',
    color: '#ecf0f1',
    fontSize: '1rem',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    transition: '0.3s ease',
    resize: 'vertical',
  },
  passwordValidation: {
    marginBottom: '10px',
  },
  passwordValidationList: {
    listStyleType: 'none',
    padding: '0',
  },
  confirmPasswordValidation: {
    marginBottom: '20px',
  },
  submitButton: {
    padding: '15px',
    backgroundColor: '#1ABC9C',
    color: 'white',
    fontSize: '1.2rem',
    borderRadius: '10px',
    cursor: 'pointer',
    border: 'none',
    transition: '0.3s ease',
  },
  submitButtonDisabled: {
    backgroundColor: '#7F8C8D',
    cursor: 'not-allowed',
  },
  label: {
    marginBottom: '5px',
    fontSize: '1rem',
  },
};

export default Register;
