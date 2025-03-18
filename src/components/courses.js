import React from "react";
import styled, { keyframes } from "styled-components";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const courses = [
  { name: "Java", rating: 4.5 },
  { name: "HTML", rating: 5 },
  { name: "CSS", rating: 4.2 },
  { name: "JavaScript", rating: 4.7 },
  { name: "React.js", rating: 4.8 },
  { name: "Node.js", rating: 4.3 },
  { name: "Express.js", rating: 4.0 },
  { name: "MongoDB", rating: 4.6 },
  { name: "SQL", rating: 4.4 },
  { name: "Bootstrap", rating: 4.1 },
  { name: "Python", rating: 4.9 },
  { name: "Django", rating: 4.2 },
  { name: "Flask", rating: 4.0 },
  { name: "C", rating: 4.3 },
  { name: "C++", rating: 4.6 },
  { name: "C#", rating: 4.4 },
  { name: "PHP", rating: 4.2 },
  { name: "Laravel", rating: 4.5 },
  { name: "Swift", rating: 4.1 },
  { name: "Kotlin", rating: 4.6 },
  { name: "Android Development", rating: 4.7 },
  { name: "iOS Development", rating: 4.4 },
  { name: "TypeScript", rating: 4.5 },
  { name: "GraphQL", rating: 4.3 },
  { name: "Rust", rating: 4.0 },
  { name: "GoLang", rating: 4.2 },
  { name: "Machine Learning", rating: 4.8 },
  { name: "Deep Learning", rating: 4.7 },
  { name: "Data Science", rating: 4.9 },
  { name: "Artificial Intelligence", rating: 4.8 },
  { name: "Cybersecurity", rating: 4.3 },
  { name: "Ethical Hacking", rating: 4.5 },
  { name: "Blockchain", rating: 4.2 },
  { name: "Cloud Computing", rating: 4.6 },
  { name: "AWS", rating: 4.7 },
  { name: "Azure", rating: 4.4 },
  { name: "DevOps", rating: 4.5 },
  { name: "Docker", rating: 4.3 },
  { name: "Kubernetes", rating: 4.6 },
  { name: "Microservices", rating: 4.2 },
  { name: "Software Testing", rating: 4.1 },
  { name: "QA Automation", rating: 4.3 },
  { name: "Selenium", rating: 4.4 },
  { name: "TensorFlow", rating: 4.7 },
  { name: "PyTorch", rating: 4.5 },
  { name: "Spring Boot", rating: 4.6 },
  { name: "Hibernate", rating: 4.2 },
  { name: "Angular", rating: 4.3 },
  { name: "Vue.js", rating: 4.1 },
  { name: "Flutter", rating: 4.4 },
  { name: "Unity 3D", rating: 4.5 },
];

const CoursesPage = () => {
  return (
    <Container>
      <h1>Explore Programming Courses</h1>
      <CourseList>
        {courses.map((course, index) => (
          <CourseTab
            key={index}
            href="https://www.geeksforgeeks.org/courses/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>{course.name}</span>
            <StarRating rating={course.rating} />
          </CourseTab>
        ))}
      </CourseList>
    </Container>
  );
};

const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <Stars>
      {[...Array(fullStars)].map((_, i) => (
        <FaStar key={i} />
      ))}
      {halfStar && <FaStarHalfAlt />}
      {[...Array(emptyStars)].map((_, i) => (
        <FaRegStar key={i} />
      ))}
    </Stars>
  );
};

/* Keyframes for hover wobble effect */
const wobble = keyframes`
  0% { transform: rotate(0deg); }
  15% { transform: rotate(3deg); }
  30% { transform: rotate(-3deg); }
  45% { transform: rotate(2deg); }
  60% { transform: rotate(-2deg); }
  75% { transform: rotate(1deg); }
  100% { transform: rotate(0deg); }
`;

const Container = styled.div`
  background: #121212;
  color: white;
  min-height: 100vh;
  padding: 40px;
  text-align: center;
  
  h1 {
    font-size: 2.5rem;
    margin-bottom: 20px;
    font-weight: bold;
  }
`;

const CourseList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-height: 80vh;
  overflow-y: auto;
  padding: 10px;
  
  &::-webkit-scrollbar {
    width: 10px;
  }
  
  &::-webkit-scrollbar-track {
    background: #222;
    border-radius: 10px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #555;
    border-radius: 10px;
  }
`;

const CourseTab = styled.a`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80%;
  max-width: 500px;
  background: linear-gradient(135deg, #1e1e1e, #333);
  padding: 15px;
  margin: 10px 0;
  border-radius: 10px;
  font-size: 1.2rem;
  font-weight: bold;
  text-decoration: none;
  color: white;
  transition: transform 0.3s ease-in-out;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  
  &:hover {
    animation: ${wobble} 0.5s ease-in-out;
    background: linear-gradient(135deg, #333, #555);
  }
`;

const Stars = styled.div`
  display: flex;
  color: #f4c542;
`;

export default CoursesPage;
