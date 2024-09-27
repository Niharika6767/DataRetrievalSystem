// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import ProjectSelection from './ProjectSelection';
import PostLogin from './PostLogin';
import RetrieveData from './RetrieveData';
import './App.css';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/post-login" element={<PostLogin />} />
          <Route path="/project-selection" element={<ProjectSelection />} />
          <Route path="/retrieve-data" element={<RetrieveData />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;



