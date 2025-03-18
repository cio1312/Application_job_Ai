import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import Particles from "react-tsparticles";

const AdminDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || user.role !== 'ADMIN') {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <DashboardContainer>
      {/* Falling Bits Effect */}
      <Particles
        options={{
          fullScreen: { enable: false },
          particles: {
            number: { value: 30 },
            color: { value: "#ffffff" },
            shape: { type: "circle" },
            opacity: { value: 0.8 },
            size: { value: 3 },
            move: {
              enable: true,
              speed: 2,
              direction: "bottom",
              outModes: { default: "out" }
            }
          }
        }}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          top: 0,
          left: 0,
          zIndex: 0
        }}
      />
      
      <Title>Admin Dashboard</Title>
      <ButtonContainer>
        <StyledButton onClick={() => navigate('/admin-dashboard/add-job')}>Add New Job</StyledButton>
        <StyledButton onClick={() => navigate('/admin-dashboard/job-list')}>View Job List</StyledButton>
        <StyledButton onClick={() => navigate('/admin-dashboard/view-applications')}>View Applications</StyledButton>
      </ButtonContainer>
    </DashboardContainer>
  );
};

// Background animation
const animateBackground = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const DashboardContainer = styled.div`
  position: relative;
  overflow: hidden;
  background: linear-gradient(45deg, #2c3e50, #34495e, #e74c3c, #c0392b);
  background-size: 400% 400%;
  animation: ${animateBackground} 10s ease infinite;
  color: white;
  height: 100vh;  /* Ensures full screen height */
  width: 100vw;   /* Ensures full screen width */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  margin: 0;  /* Remove unwanted spacing */
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 40px;
  color: #ecf0f1;
  z-index: 1;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  z-index: 1;
`;

const StyledButton = styled.button`
  background: #e74c3c;
  color: white;
  padding: 12px 25px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1.2rem;
  transition: all 0.3s ease;
  z-index: 1;
  
  &:hover {
    background: #c0392b;
    transform: scale(1.05);
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
  }
`;

export default AdminDashboard;
