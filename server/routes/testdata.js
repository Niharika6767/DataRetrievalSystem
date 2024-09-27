// // server/routes/testdata.js




const express = require('express');
const router = express.Router();
const db = require('../db');
router.post('/submitTestData', (req, res) => {
  const { projectName, testName, data } = req.body;

  const tableName = `${projectName}_tests`;
  db.get(`SELECT * FROM ${tableName} WHERE testName = ?`, [testName], (err, row) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Error checking test name' });
    }
    if (row) {
      return res.status(400).json({ success: false, message: 'Test name already exists' });
    } else {
      db.run(`INSERT INTO ${tableName} (testName, data) VALUES (?, ?)`, [testName, data], (err) => {
        if (err) {
          return res.status(500).json({ success: false, message: 'Error inserting data' });
        }
        res.json({ success: true, message: 'Data saved successfully' });
      });
    }
  });
});
router.post('/retrieveTestData', (req, res) => {
  const { projectName, testName } = req.body;

  const tableName = `${projectName}_tests`;
  db.get(`SELECT data FROM ${tableName} WHERE testName = ?`, [testName], (err, row) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Error retrieving data' });
    }
    if (row) {
      res.json({ success: true, data: row.data });
    } else {
      res.status(404).json({ success: false, message: 'Test data not found' });
    }
  });
});
module.exports = router;
