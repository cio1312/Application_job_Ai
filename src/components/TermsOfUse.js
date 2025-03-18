import React from 'react';
import Footer from './Footer'; // Import Footer
import BackButton from './BackButton'; // Import Back Button
import styled from 'styled-components';

const TermsOfUse = () => {
  return (
    <PageContainer>
     
      <ContentWrapper>
        <Title>Terms of Use</Title>
        <Paragraph>
          Welcome to our platform. By using our services, you agree to comply with the following terms and conditions.
        </Paragraph>
        <Paragraph>
          We strive to provide a secure and seamless experience for our users. Please ensure you understand our policies before engaging with our platform.
        </Paragraph>
        <Paragraph>
          If you have any questions regarding these terms, feel free to contact our support team. We're here to assist you.
        </Paragraph>
        <Disclaimer>
          Please note that by using our services, you acknowledge that you have read and agree to the terms outlined below.
        </Disclaimer>
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

const Disclaimer = styled.p`
  font-size: 1rem;
  color: #f39c12;
  margin-top: 30px;
  font-weight: bold;
`;

export default TermsOfUse;
