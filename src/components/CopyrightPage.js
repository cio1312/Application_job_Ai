import React from "react";
import Footer from "./Footer"; // Import Footer
import BackButton from "./BackButton"; // Import Back Button
import styled from "styled-components";

const CopyrightPage = () => {
  return (
    <PageContainer>
    
      <ContentWrapper>
        <Title>© Copyright</Title>
        <Paragraph>
          All rights reserved. Unauthorized duplication, distribution, or modification is prohibited.
          This site is protected by copyright laws and international treaties, ensuring the protection of intellectual property.
        </Paragraph>
        <Paragraph>
          2025 Job Portal. Powered by innovation, excellence, and a commitment to providing the best opportunities for job seekers.
        </Paragraph>
        <Disclaimer>
          Please contact us for any inquiries regarding copyright, intellectual property, or usage rights.
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
  padding: 40px;
  height: 100vh;
  width: 100%; /* Ensure the container spans the full width */
  justify-content: flex-start; /* Maintain top-to-bottom alignment */
  align-items: center; /* Keep the content centered horizontally */

  @media (max-width: 768px) {
    padding: 20px; /* Adjust padding for smaller screens */
  }
`;

const ContentWrapper = styled.div`
  text-align: center;
  background-color: #34495e;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
  width: 100%; /* Ensure full width */
  max-width: 600px; /* Prevent content from becoming too wide */
  margin: 0 auto; /* Center the content within the page */

  @media (max-width: 768px) {
    padding: 20px; /* Adjust padding for smaller screens */
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 2rem; /* Smaller font size on mobile */
  }
`;

const Paragraph = styled.p`
  font-size: 1.2rem;
  margin: 10px 0;

  @media (max-width: 768px) {
    font-size: 1rem; /* Adjust font size for mobile */
  }
`;

const Disclaimer = styled.p`
  font-size: 1rem;
  color: #95a5a6;
  margin-top: 20px;

  @media (max-width: 768px) {
    font-size: 0.9rem; /* Adjust font size for mobile */
  }
`;

export default CopyrightPage;
