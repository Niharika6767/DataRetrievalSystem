//server/routes/projects.js

const express = require('express');
const router = express.Router();
const db = require('../db');
router.post('/createProjectTable', (req, res) => {
  const { projectName } = req.body;
  const tableName = `${projectName}_tests`;
  db.run(`CREATE TABLE IF NOT EXISTS ${tableName} (testName TEXT, data TEXT)`, (err) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Error creating table' });
    }
    res.json({ success: true, message: 'Table created successfully' });
  });
});
router.get('/projects', (req, res) => {
    db.all('SELECT DISTINCT name FROM projects', (err, rows) => {
      if (err) {
        return res.status(500).json({ success: false, message: 'Error fetching projects' });
      }
      res.json(rows);
    });
  });
module.exports = router;