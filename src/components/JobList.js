import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user || user.role !== 'ADMIN') {
      window.location.href = '/login'; // Or use navigate if using react-router
      return;
    }

    const adminId = user.adminId;

    if (!adminId) {
      setError("Admin ID is missing.");
      return;
    }

    fetch(`http://localhost:8080/api/jobs/admin/${adminId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch jobs');
        }
        return response.json();
      })
      .then((data) => setJobs(data))
      .catch((err) => setError(err.message));
  }, []);

  const toggleJobStatus = (jobId) => {
    setJobs((prevJobs) => {
      return prevJobs.map((job) =>
        job.id === jobId ? { ...job, active: !job.active } : job
      );
    });
  };

  const saveJobs = () => {
    const updatedJobs = jobs.filter((job) => job.active !== undefined);

    if (updatedJobs.length === 0) {
      alert("No changes to save.");
      return;
    }

    updatedJobs.forEach((job) => {
      fetch(`http://localhost:8080/api/jobs/${job.id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          isActive: job.active,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.message === 'Job updated successfully') {
            console.log(`Job ${job.id} updated successfully`);
          } else {
            console.error(`Failed to update job ${job.id}`);
          }
        })
        .catch((err) => {
          console.error('Error updating job:', err);
        });
    });
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <Container>
      <BackgroundVideo autoPlay muted loop>
        <source src="/images/3578233-hd_1920_1080_25fps.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </BackgroundVideo>
      <Content>
        <Title>Job List</Title>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        {jobs.length === 0 ? (
          <NoJobsMessage>No jobs available.</NoJobsMessage>
        ) : (
          <JobCards>
            {jobs.map((job) => (
              <JobCard key={job.id}>
                <JobHeader>
                  <h3>{job.companyName}</h3>
                  <JobStatus active={job.active}>
                    <button onClick={() => toggleJobStatus(job.id)}>
                      {job.active ? 'Deactivate' : 'Activate'}
                    </button>
                  </JobStatus>
                </JobHeader>
                <JobDetails>
                  <p><strong>Description:</strong> {job.companyDescription}</p>
                  <p><strong>Location:</strong> {job.location}</p>
                  <p><strong>Company Theme:</strong> {job.companyTheme}</p>
                  <p><strong>Company Policies:</strong> {job.companyPolicies}</p>
                  <p><strong>About:</strong> {job.about}</p>
                  <p><strong>Contact:</strong> {job.contact}</p>
                </JobDetails>
              </JobCard>
            ))}
          </JobCards>
        )}
        <SaveButton onClick={saveJobs}>Save Changes</SaveButton>
        <BackButton onClick={handleBackClick}>Back</BackButton>
      </Content>
    </Container>
  );
};

// Styling for the back button
const BackButton = styled.button`
  background-color: #95a5a6;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1.2rem;
  margin-top: 20px;
  transition: background-color 0.3s;
  &:hover {
    background-color: #7f8c8d;
  }
`;

const Container = styled.div`
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
`;

const BackgroundVideo = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
`;

const Content = styled.div`
  position: relative;
  color: white;
  padding: 40px;
  z-index: 1;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: #ecf0f1;
`;

const ErrorMessage = styled.p`
  color: red;
  font-weight: bold;
`;

const NoJobsMessage = styled.p`
  font-size: 1.5rem;
  color: #7f8c8d;
`;

const JobCards = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  width: 100%;
  max-width: 1200px;
`;

const JobCard = styled.div`
  background-color: #34495e;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s ease-in-out;
  &:hover {
    transform: translateY(-5px);
  }
`;

const JobHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

const JobStatus = styled.div`
  button {
    background-color: ${(props) => (props.active ? '#e74c3c' : '#27ae60')};
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
    &:hover {
      background-color: ${(props) => (props.active ? '#c0392b' : '#219150')};
    }
  }
`;

const JobDetails = styled.div`
  font-size: 1rem;
  line-height: 1.5;
  color: #ecf0f1;
`;

const SaveButton = styled.button`
  background-color: #3498db;
  color: white;
  padding: 12px 25px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1.2rem;
  margin-top: 30px;
  transition: background-color 0.3s;
  &:hover {
    background-color: #2980b9;
  }
`;

export default JobList;
