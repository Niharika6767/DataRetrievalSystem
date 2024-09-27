//server/db.js
//server/db.js
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('mydatabase.db');
db.serialize(() => {
  db.run('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, username TEXT UNIQUE, password TEXT)');
  db.run('INSERT OR IGNORE INTO users (username, password) VALUES (?, ?)', ['user1', 'pass1']);
  db.run('INSERT OR IGNORE INTO users (username, password) VALUES (?, ?)', ['user2', 'pass2']);

  db.run('CREATE TABLE IF NOT EXISTS projects (id INTEGER PRIMARY KEY, name TEXT UNIQUE)');
  db.run('INSERT OR IGNORE INTO projects (name) VALUES (?)', ['Project1']);
  db.run('INSERT OR IGNORE INTO projects (name) VALUES (?)', ['Project2']);
});

module.exports = db;