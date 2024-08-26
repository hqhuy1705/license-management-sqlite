const db = require('./db'); // Import the SQLite database connection

const setupDatabase = () => {
  db.serialize(() => {
    db.run(`
      CREATE TABLE IF NOT EXISTS licenses (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user TEXT NOT NULL,
        license_key TEXT NOT NULL,
        device_id TEXT,
        is_used INTEGER DEFAULT 0,
        is_active INTEGER DEFAULT 1,
        expires_at
      )
    `);
  });
};

module.exports = setupDatabase;
