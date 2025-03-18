import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// Logo Component
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

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();

    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', {
        username: trimmedUsername,
        password: trimmedPassword,
      });

      if (response.data.message === 'Login successful') {
        localStorage.setItem('user', JSON.stringify({
          username: trimmedUsername,
          role: response.data.role,
          adminId: response.data.adminId,
        }));

        if (response.data.role === 'ADMIN') {
          navigate('/admin-dashboard');
        } else {
          navigate('/dashboard');
        }
      }
    } catch (error) {
      console.error('Login failed:', error);
      alert('Invalid credentials');
    }
  };

  return (
    <Container>
      <RegisterContainer>
        <LogoSection>
          <Logo />
        </LogoSection>
        <FormSection>
          <Form onSubmit={handleSubmit}>
            <h2>Login</h2>
            <Input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <PasswordContainer>
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <EyeButton type="button" onClick={() => setShowPassword((prev) => !prev)}>
                {showPassword ? '🙈' : '👁️'}
              </EyeButton>
            </PasswordContainer>
            <SubmitButton type="submit">Login</SubmitButton>
            <RegisterButton type="button" onClick={() => navigate('/register')}>
              Register
            </RegisterButton>
            <ForgotPassword>
              <ForgotPasswordButton type="button" onClick={() => navigate('/forgot-password')}>
                Forgot Password?
              </ForgotPasswordButton>
            </ForgotPassword>
          </Form>
        </FormSection>
      </RegisterContainer>
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

const RegisterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  max-width: 1200px;
  background-color: #34495e; /* Darker background for form */
  border-radius: 15px;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
  padding: 30px;
  animation: fadeIn 1s ease-in-out;
`;

const LogoSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #16a085; /* Greenish background for logo */
  border-radius: 50%;
  padding: 20px;
`;

const FormSection = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #2c3e50;
  border-radius: 10px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  width: 100%;
  max-width: 400px;
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

const PasswordContainer = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 20px;
`;

const EyeButton = styled.button`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  color: white;
  font-size: 16px;
  cursor: pointer;
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

const RegisterButton = styled.button`
  background-color: #2ecc71;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
`;

const ForgotPassword = styled.div`
  margin-top: 10px;
`;

const ForgotPasswordButton = styled.button`
  background-color: transparent;
  color: #3498db;
  border: none;
  cursor: pointer;
  text-decoration: underline;
`;

export default Login;
