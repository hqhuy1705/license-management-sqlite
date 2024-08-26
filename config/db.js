const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Connect to the SQLite database
const db = new sqlite3.Database(path.resolve(__dirname, '../license_management.db'), (err) => {
  if (err) {
    console.error('Error connecting to SQLite:', err.message);
  } else {
    console.log('Connected to SQLite database.');
  }
});

module.exports = db;
