import React from 'react';
import Footer from './Footer'; // Import Footer
import BackButton from './BackButton'; // Import Back Button
import styled from 'styled-components';

const ServicePage = () => {
  return (
    <PageContainer>
      
      <ContentWrapper>
        <Title>Our Services</Title>
        <Paragraph>
          Our platform offers comprehensive job-seeking and recruitment services designed to meet your needs:
        </Paragraph>
        <ServiceList>
          <li>Job Matching: Tailored job recommendations based on your skills and preferences.</li>
          <li>Profile Enhancement: Optimize your profile to stand out to recruiters.</li>
          <li>Exclusive Employer Connections: Access a network of leading employers actively seeking talent.</li>
        </ServiceList>
        <Paragraph>
          At the core of our mission is your success. We provide the tools and resources necessary to empower job seekers and employers alike.
        </Paragraph>
      </ContentWrapper>
      <BackButton />
      <Footer />
    </PageContainer>
  );
};

const PageContainer = styled.div`
  background-color: #2c3e50;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  height: 100vh;
  justify-content: flex-start;
`;

const ContentWrapper = styled.div`
  text-align: center;
  background-color: #34495e;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 600px;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 20px;
`;

const Paragraph = styled.p`
  font-size: 1.2rem;
  margin: 10px 0;
`;

const ServiceList = styled.ul`
  list-style-type: none;
  padding: 0;
  font-size: 1.1rem;
  margin: 10px 0;
  text-align: left;
  li {
    margin: 10px 0;
  }
`;

export default ServicePage;
