// src/projectSelection.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const ProjectSelection = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState('');
  const [testName, setTestName] = useState('');

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = generateData();

    alert(`Data is being stored into the ${selectedProject} table with test name ${testName}`);
    try {
      await axios.post('http://localhost:5000/api/createProjectTable', {
        projectName: selectedProject,
      });

      const response = await axios.post('http://localhost:5000/api/submitTestData', {
        projectName: selectedProject,
        testName,
        data,
      });
      console.log('Data inserted successfully:', response.data);
      alert('Data entered successfully');
    } catch (error) {
      console.error('Error storing data:', error);
      alert('Error storing data');
    }
  };

  const generateData = () => {
    const data = [];
    data.push("53756E20736574206F6E2074686520686F72697A6F6E2E"); // 4 words
    data.push("576176657320637261736820616761696E73742074686520726F636B792073686F72652072656C656E746C6573736C79"); // 6 words
    data.push("5468652067656E746C6520627265657A65207768697370657273207468726F75676820746865206C65617665732C206361727279696E6720746865207363656E74206F662077696C64666C6F7765727320696E20626C6F6F6D2E2053756E6C696768742066696C7465727320748720726F75676874207468652063616E6F70792C20646170706C696E672074686520666F7265737420666C6F6F7220776974682070617463686573206F66676F6C64656E207761726D74682E"); // 32 words
    data.push("496E2074686520627573746C696E6720636974792C20736B79736372617065727320746F776572206F7665722072757374696E6720737472656574732066696C6C656420776974682070656F706C652072757368696E6720746F20616E642066726F2E204E656F6E206C696768747320696C6C756D696E61746520746865206E696768742C2063617374696E6720612076696272616E7420676C6F77206F6E2074686520757262616E206C616E6473636170652E"); // 32 words
    data.push("54686520616E6369656E7420636173746C65207374616E64732073656E74696E656C2061746F7020746865207275676765642068696C6C2C206F7665726C6F6F6B696E6720746874207472616E7175696C2076696C6C616765206E6573746C656420696E207468652076616C6C65792062656C6F77."); // 32 words
    data.push("54686520736F756E64206F66206C61756768746572206563686F6573206163726F73732074686520706C617967726F756E64206173206368696C6472656E207377696E67206869676820696E746F2074686520736B792C20746865697220766F696365732066696C6C6564207769746820707572656A6F7920616E6420696E6E6F63656E63652E20506172656E747320776174636820666F6E6420666C616D65732C206869656172747320666F6C6C2E"); // 32 words
    data.push("416D69647374206669656C647320626C6F6F6D696E6720696E20746865207761726D20737072696E67206275747465722072656C656E746C6573736C7920696E207468652076616C6C65792062656C6F772E2043686572727920626C6F73736F6D73206472696674206C617A696C7920696E2074686520627265657A652C2074616C6C696E67207416C6573206F6620627920676F6E6565726120657261732E"); // 30 words
    data.push("536E6F772D636170706564207065616B732072696573206D616A6573746963616C6C7920616761696E73742074686520646"); // 7 words
    data.push("476F6C64656E2073756E736574732063617374206C6F6E6720736861646F7773206F766572207472616E7175696C2077"); // 36 words


    return data.join('\n');
  };

  const generateLine = (hexString) => {
    return hexString;
  };

  return (
    <div className="section-box">
      <h2>Select Project</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ProjectSelection;
