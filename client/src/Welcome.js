//src/Welcome.js

import React, { useState } from 'react';
import './App.css';
function Welcome({ username }) {
  const [project, setProject] = useState('');
 const handleProjectChange = (e) => {
    setProject(e.target.value);
  };
return (
    <div>
      <h2>Welcome!</h2>
      <div>
        <label>Project:</label>
        <select value={project} onChange={handleProjectChange}>
          <option value="project1">Project 1</option>
          <option value="project2">Project 2</option>
          <option value="project3">Project 3</option>
        </select>
      </div>
    </div>
  );
}

export default Welcome;