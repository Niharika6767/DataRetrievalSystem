// server/routes/auth.js
const express = require('express');
const router = express.Router();
const db = require('../db');
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  db.get('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (err, row) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }
    if (row) {
      res.json({ success: true });
    } else {
      res.json({ success: false, message: 'Invalid credentials' });
    }
  });
});
module.exports = router;