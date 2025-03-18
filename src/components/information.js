import React from 'react';
import Footer from './Footer'; // Import Footer
import BackButton from './BackButton'; // Import Back Button
import styled from 'styled-components';

const Information = () => {
  return (
    <PageContainer>
   
      <ContentWrapper>
        <Title>Information Hub</Title>
        <Paragraph>
          Stay informed with our detailed guides and resources tailored to your needs. From career development to hiring strategies, we have you covered.
        </Paragraph>
        <Paragraph>
          Our information hub is designed to provide clarity and guidance on important topics for job seekers and employers alike.
        </Paragraph>
        <Paragraph>
          Browse through our categories to find what you're looking for. Whether you're navigating the job market or looking to enhance your recruitment process, our resources are here to guide you.
        </Paragraph>
        <InfoLink>Explore our resources now</InfoLink>
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
  max-width: 700px;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 20px;
`;

const Paragraph = styled.p`
  font-size: 1.2rem;
  margin: 10px 0;
`;

const InfoLink = styled.a`
  font-size: 1.2rem;
  color: #3498db;
  font-weight: bold;
  cursor: pointer;
  margin-top: 20px;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export default Information;
