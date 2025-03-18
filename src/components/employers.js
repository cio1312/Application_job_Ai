import React from 'react';
import Footer from './Footer'; // Import Footer
import BackButton from './BackButton'; // Import Back Button
import styled from 'styled-components';

const Employers = () => {
  return (
    <PageContainer>
     
      <ContentWrapper>
        <Title>For Employers</Title>
        <Paragraph>
          Discover how we can help you find the right talent for your organization. Our platform connects employers with skilled candidates across various industries.
        </Paragraph>
        <Paragraph>
          Leverage our suite of tools and resources to streamline your hiring process and build your dream team. We provide:
        </Paragraph>
        <ServiceList>
          <li>Candidate Sourcing: Access a diverse pool of qualified candidates.</li>
          <li>Job Posting: Post job openings and connect directly with applicants.</li>
          <li>Talent Analytics: Get insights to make informed hiring decisions.</li>
        </ServiceList>
        <Paragraph>
          Have questions? Our dedicated support team is here to assist you every step of the way to ensure a smooth hiring process.
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

export default Employers;
