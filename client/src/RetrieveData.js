import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const RetrieveData = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState('');
  const [testName, setTestName] = useState('');
  const [retrievedData, setRetrievedData] = useState('');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/projects');
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const handleProjectChange = (e) => {
    setSelectedProject(e.target.value);
  };
const handleTestNameChange = (e) => {
    setTestName(e.target.value);
  };
const handleRetrieveData = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/retrieveTestData', {
        projectName: selectedProject,
        testName,
      });

      if (response.data.success) {
        const hexData = response.data.data;
        const convertedText = hexData.split('\n').map(hexToText).join('\n');
        setRetrievedData(convertedText);

        const blob = new Blob([convertedText], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${selectedProject}_${testName}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error('Error retrieving data:', error);
      alert('An error occurred while retrieving data');
    }
  };
const hexToText = (hex) => {
    try {
      const hexString = hex.replace(/\s/g, '');
      const hexPairs = hexString.match(/.{1,2}/g) || [];
      const bytes = hexPairs.map((pair) => parseInt(pair, 16));
      const filteredBytes = bytes.filter(byte => (byte >= 32 || byte === 10 || byte === 13));
      const text = new TextDecoder('utf-8').decode(new Uint8Array(filteredBytes));
  
    return text;
    } catch (error) {
      console.error('Error converting hex to text:', error);
      throw error;
    }
  };
  return (
    <div className="section-box">
      <h2>Retrieve Data</h2>
      <div>
        <label>Project:</label>
        <select value={selectedProject} onChange={handleProjectChange}>
          <option value="">Select a project</option>
          {projects.map((project, index) => (
            <option key={index} value={project.name}>
              {project.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Test Name:</label>
        <input type="text" value={testName} onChange={handleTestNameChange} />
      </div>
      <button type="button" onClick={handleRetrieveData}>Retrieve</button>
    </div>
  );
};
export default RetrieveData;






