//client/src/components/FormDataComponenets



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const FormDataComponent = () => {
  const [formData, setFormData] = useState({
    projectName: '',
    testName: '',
    data: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/submitTestData', formData)
      .then(response => {
        console.log('Response:', response.data);
      
      })
      .catch(error => {
        console.error('Error:', error);
        
      });
  };
 

  useEffect(() => {
    
    console.log('Request URL:', '/api/submitTestData');
  }, []); 

  return (
    <form onSubmit={handleSubmit}>
      <label>Project Name:</label>
      <input type="text" name="projectName" value={formData.projectName} onChange={handleChange} />
      <label>Test Name:</label>
      <input type="text" name="testName" value={formData.testName} onChange={handleChange} />
      <label>Data:</label>
      <input type="text" name="data" value={formData.data} onChange={handleChange} />
      <button type="submit">Submit</button>
    </form>
  );
};

export default FormDataComponent;