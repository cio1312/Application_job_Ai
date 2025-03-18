import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

// Logo Component for decoration (optional, same as in the login page)
const Logo = styled.div`
  width: 250px;
  height: 250px;
  border-radius: 50%;
  background: url('/images/Companylogo.png') no-repeat center;
  background-size: contain;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.4);
  transform: perspective(1000px) rotateY(-15deg);
  transition: transform 0.4s ease;
  &:hover {
    transform: perspective(1000px) rotateY(0deg) scale(1.05);
  }
  animation: fireEffect 2s infinite linear;
`;

const fireEffect = `
  @keyframes fireEffect {
    0% {
      border-color: rgba(255, 85, 0, 0.8);
      box-shadow: 0 0 30px rgba(255, 85, 0, 0.6);
    }
    50% {
      border-color: rgba(255, 144, 0, 0.8);
      box-shadow: 0 0 35px rgba(255, 144, 0, 0.8);
    }
    100% {
      border-color: rgba(255, 85, 0, 0.8);
      box-shadow: 0 0 30px rgba(255, 85, 0, 0.6);
    }
  }
`;

const ForgotPassword = () => {
  const [username, setUserId] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestData = {
      username,
      email,
    };

    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:8080/api/auth/forgot-password', requestData);
      setMessage("Email sent successfully! Please check your registered email and click on the link to reset your password.");
      setIsSuccess(true);
    } catch (error) {
      console.error('Error during password reset:', error);
      setMessage('Error during password reset. Please try again.');
      setIsSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <FormContainer>
        <LogoSection>
          <Logo />
        </LogoSection>
        <Form onSubmit={handleSubmit}>
          <h2>Reset Password</h2>
          <Input
            type="text"
            placeholder="User ID"
            value={username}
            onChange={(e) => setUserId(e.target.value)}
            required
          />
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <SubmitButton type="submit" disabled={isLoading}>Submit</SubmitButton>
          {/* Loading Indicator */}
          {isLoading && <p>Loading...</p>}
          {/* Message displayed after response */}
          {message && (
            <p style={{ color: isSuccess ? 'green' : 'red', fontWeight: 'bold' }}>
              {message}
            </p>
          )}
        </Form>
      </FormContainer>
    </Container>
  );
};

// Styled Components
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #2c3e50; /* Dark background */
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #34495e; /* Darker background for the form */
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 400px;
`;

const LogoSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #16a085; /* Greenish background for the logo */
  border-radius: 50%;
  padding: 20px;
  margin-bottom: 30px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  width: 100%;
`;

const Input = styled.input`
  margin: 10px 0;
  padding: 10px;
  font-size: 16px;
  width: 100%;
  border-radius: 5px;
  border: 1px solid #ccc;
  background-color: #34495e;
  color: white;
  box-sizing: border-box;
`;

const SubmitButton = styled.button`
  background-color: #3498db;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
  margin-top: 10px;
`;

export default ForgotPassword;
