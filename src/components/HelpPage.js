import React from 'react';
import Footer from './Footer'; // Import Footer
import BackButton from './BackButton'; // Import Back Button
import styled from 'styled-components';

const HelpPage = () => {
  return (
    <PageContainer>
    
      <ContentWrapper>
        <Title>Help & Support</Title>
        <Paragraph>
          Need help? We’ve got you covered. Check out our frequently asked questions (FAQs) or contact our support team for additional assistance.
        </Paragraph>
        <FAQList>
          <h3>Frequently Asked Questions (FAQs)</h3>
          <ul>
            <li>How to register for an account?</li>
            <li>How to apply for a job?</li>
            <li>How to reset my password?</li>
            <li>How to track my job applications?</li>
            <li>What to do if I encounter an issue with the website?</li>
          </ul>
        </FAQList>
        <Paragraph>
          If your question isn’t listed, feel free to contact us, and we'll be happy to assist you further.
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

const FAQList = styled.div`
  margin-top: 20px;
  ul {
    list-style-type: none;
    padding: 0;
    li {
      margin: 10px 0;
      font-size: 1.1rem;
    }
  }
`;

export default HelpPage;
