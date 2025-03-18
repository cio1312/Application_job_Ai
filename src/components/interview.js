import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const InterviewContainer = styled.div`
  background-color: #121212;
  color: #ffffff;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const QuestionList = styled.ul`
  list-style: none;
  padding: 0;
  width: 60%;
`;

const QuestionItem = styled.li`
  background: #1e1e1e;
  padding: 15px;
  border-radius: 8px;
  margin: 10px 0;
`;

const Interview = () => {
  const location = useLocation();
  const { experience } = location.state || {};
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      if (!experience || experience.length === 0) {
        setError('No experience data provided.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.post(
          'https://api-inference.huggingface.co/models/tiiuae/falcon-7b-instruct',
          {
            inputs: `Generate 10 interview questions for a candidate with experience in ${experience.join(', ')}.`,
          },
          {
            headers: {
              'Authorization': `Bearer KEY HERE`,
              'Content-Type': 'application/json'
            }
          }
        );

        if (response.data && response.data.length > 0) {
          const generatedText = response.data[0].generated_text;
          const splitQuestions = generatedText.split('\n').filter(q => q && !q.includes('Generate 10 interview questions for a candidate with experience in'));
          setQuestions(splitQuestions.slice(0, 10));
        } else {
          setError('No questions generated. Try again.');
        }
      } catch (err) {
        setError('Failed to fetch interview questions. Try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [experience]);

  return (
    <InterviewContainer>
      <h2>Possible Interview Questions</h2>
      {loading && <p>Loading questions...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && !error && questions.length > 0 ? (
        <QuestionList>
          {questions.map((question, index) => (
            <QuestionItem key={index}>
              <strong>{index + 1}. {question}</strong>
            </QuestionItem>
          ))}
        </QuestionList>
      ) : (!loading && !error && <p>No questions available.</p>)}
    </InterviewContainer>
  );
};

export default Interview;
