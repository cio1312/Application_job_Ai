import React, { useState } from 'react';
import Footer from './Footer'; // Import Footer
import BackButton from './BackButton'; // Import Back Button
import styled from 'styled-components';
import axios from 'axios'; // To make the API request

const ContactPage = () => {
  const [subject, setSubject] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if all fields are filled
    if (!subject || !email || !body) {
      setMessage("Please fill in all fields.");
      return;
    }

    setIsLoading(true);
    setMessage('');

    try {
      const response = await axios.post('http://localhost:8080/api/auth/contact', {
        subject,
        email,
        body
      });

      setMessage('Email sent successfully!');
      setIsSuccess(true);
    } catch (error) {
      setMessage('Error sending email. Please try again later.');
      setIsSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageContainer>
     
      <ContentWrapper>
        <Title>Contact Us</Title>
        <Paragraph>
          For inquiries, support, or assistance, we are here to help you! You can contact us via the following channels:
        </Paragraph>
        <ContactDetails>
          <p>Email: <a href="mailto:support@linkify.com">support@linkify.com</a></p>
          <p>Phone: <a href="tel:+91 93217 89255">+91 93217 89255</a></p>
        </ContactDetails>

        {/* Form for sending email */}
        <Form onSubmit={handleSubmit}>
          <Input 
            type="text" 
            placeholder="Subject" 
            value={subject}
            onChange={(e) => setSubject(e.target.value)} 
            required 
          />
          <Input 
            type="email" 
            placeholder="Your Email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
          <Textarea 
            placeholder="Message Body"
            value={body}
            onChange={(e) => setBody(e.target.value)} 
            required
          />

          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Sending...' : 'Send Message'}
          </Button>
        </Form>

        {/* Display the success or error message */}
        {message && (
          <Message isSuccess={isSuccess}>{message}</Message>
        )}
      </ContentWrapper>
      <BackButton />
      <Footer />
    </PageContainer>
  );
};

// Styled components
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

const ContactDetails = styled.div`
  font-size: 1.1rem;
  margin: 10px 0;
  a {
    color: #3498db;
    text-decoration: none;
  }
  a:hover {
    text-decoration: underline;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const Input = styled.input`
  padding: 10px;
  margin: 10px 0;
  width: 80%;
  max-width: 500px;
  font-size: 1.1rem;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const Textarea = styled.textarea`
  padding: 10px;
  margin: 10px 0;
  width: 80%;
  max-width: 500px;
  font-size: 1.1rem;
  border-radius: 5px;
  border: 1px solid #ccc;
  height: 150px;
  resize: none;
`;

const Button = styled.button`
  padding: 12px 20px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1.2rem;
  cursor: pointer;
  margin-top: 10px;

  &:disabled {
    background-color: #95a5a6;
    cursor: not-allowed;
  }
`;

const Message = styled.p`
  color: ${({ isSuccess }) => (isSuccess ? 'green' : 'red')};
  font-weight: bold;
  margin-top: 20px;
`;

export default ContactPage;
