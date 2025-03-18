import React from 'react';
import Footer from './Footer'; // Import Footer
import BackButton from './BackButton'; // Import Back Button
import styled from 'styled-components';

const Blog = () => {
  return (
    <PageContainer>
      <BackButton />
      <ContentWrapper>
        <Title>Our Blog</Title>
        <Paragraph>
          Welcome to our blog! Here, we share the latest news, industry insights, and expert advice to help you stay ahead in your career and recruitment process.
        </Paragraph>
        <Paragraph>
          Whether you're an employer or job seeker, our blog covers everything from career tips to hiring strategies.
        </Paragraph>
        <Paragraph>
          Explore more to gain valuable knowledge and actionable insights. Stay tuned for regular updates!
        </Paragraph>
      </ContentWrapper>
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

export default Blog;
