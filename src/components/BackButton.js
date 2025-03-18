import React from 'react';
import { useNavigate } from 'react-router-dom';

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button className="btn-back" onClick={() => navigate(-1)}>
      Back
    </button>
  );
};

export default BackButton;

/* CSS Styling */
const styles = document.createElement('style');
styles.innerHTML = `
  .btn-back {
    background-color: #1E3A8A; /* Dark blue */
    color: white;
    border: none;
    padding: 12px 24px;
    font-size: 1rem;
    font-weight: bold;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    margin: 10px;

    /* 3D Effect */
    box-shadow: 0 5px 0 #172554, 0 7px 10px rgba(0, 0, 0, 0.2);
    transform: translateY(-2px);
  }

  .btn-back:hover {
    background-color: #172554; /* Even darker blue */
    box-shadow: 0 3px 0 #0F172A, 0 6px 8px rgba(0, 0, 0, 0.3);
    transform: translateY(-4px); /* More elevation */
  }

  .btn-back:active {
    background-color: #0F172A; /* Deepest blue */
    box-shadow: 0 2px 0 #0C111D, 0 4px 6px rgba(0, 0, 0, 0.3);
    transform: translateY(0); /* Reset elevation */
  }
`;
document.head.appendChild(styles);
