// src/PostLogin.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

const PostLogin = () => {
  const navigate = useNavigate();

  const handleSelectionChange = (e) => {
    const selectedOption = e.target.value;
    if (selectedOption === 'write') {
      navigate('/project-selection');
    } else if (selectedOption === 'retrieve') {
      navigate('/retrieve-data');
    }
  };

  return (
    <div className="section-box">
      <h2>Welcome!</h2>
      <label>Select an action:</label>
      <select onChange={handleSelectionChange} defaultValue="">
        <option value="" disabled>Select...</option>
        <option value="write">Write Data</option>
        <option value="retrieve">Retrieve Data</option>
      </select>
    </div>
  );
};

export default PostLogin;
