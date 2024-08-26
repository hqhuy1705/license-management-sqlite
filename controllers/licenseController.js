const db = require("../config/db");
const { v4: uuidv4 } = require('uuid'); // Import uuid v4 function

// Generate a license key and record its usage
const generateLicenseKey = (req, res) => {
  const { user, deviceId } = req.body;
  const licenseKey = generateRandomLicenseKey(); // Use the UUID generator

  // Check if license key is already assigned
  db.get('SELECT * FROM licenses WHERE license_key = ?', [licenseKey], (err, row) => {
    if (err) return res.status(500).json({ message: 'Database error', error: err.message });
    if (row) return res.status(400).json({ message: 'License key already exists' });

    // Insert the new license key
    db.run('INSERT INTO licenses (user, license_key, device_id, is_used) VALUES (?, ?, ?, ?)', [user, licenseKey, deviceId, 0], function(err) {
      if (err) return res.status(500).json({ message: 'Database error', error: err.message });
      res.status(201).json({ licenseKey });
    });
  });
};

// Mark a license key as used
const markLicenseAsUsed = (req, res) => {
  const { licenseKey, deviceId } = req.body;

  // Validate input
  if (!licenseKey || !deviceId) {
    return res.status(400).json({ message: 'License key and device ID are required' });
  }

  // Check if the license key exists
  db.get('SELECT * FROM licenses WHERE license_key = ?', [licenseKey], (err, row) => {
    if (err) return res.status(500).json({ message: 'Database error', error: err.message });

    if (!row) {
      return res.status(404).json({ message: 'License key not found' });
    }

    if (row.is_used === 1) {
      return res.status(400).json({ message: 'License key is already used' });
    }

    // Update the license key as used
    db.run('UPDATE licenses SET is_used = 1, device_id = ? WHERE license_key = ?', [deviceId, licenseKey], function(err) {
      if (err) return res.status(500).json({ message: 'Database error', error: err.message });
      res.status(200).json({ message: 'License key marked as used' });
    });
  });
};

// Validate a license key
const validateLicenseKey = (req, res) => {
  const { user, licenseKey, deviceId } = req.body;

  db.get('SELECT * FROM licenses WHERE license_key = ?', [licenseKey], (err, row) => {
    if (err) return res.status(500).json({ message: 'Database error', error: err.message, success: false });

    if (!row) {
      return res.status(404).json({ message: 'License key not found', success: false });
    }

    if (row.is_used === 1 && row.device_id !== deviceId) {
      return res.status(403).json({ message: 'License key is already in use on another device', success: false });
    }

    if (row.device_id === deviceId) {
      return res.status(200).json({ message: 'License key is valid', success: true });
    }

    // Mark the license key as used and record the device ID
    db.run('UPDATE licenses SET is_used = 1, device_id = ? WHERE license_key = ?', [deviceId, licenseKey], function(err) {
      if (err) return res.status(500).json({ message: 'Database error', error: err.message });
      res.status(200).json({ message: 'License key is valid', success: true });
    });
  });
};

// Fetch all license keys
const getAllLicenses = (req, res) => {
  const query = 'SELECT * FROM licenses';
  
  db.all(query, (err, rows) => {
    if (err) {
      return res.status(500).json({ message: 'Database error', error: err.message });
    }
    return res.status(200).json(rows);
  });
};

function generateRandomLicenseKey() {
  return uuidv4(); // Generates a UUID
}

module.exports = { 
  generateLicenseKey, 
  markLicenseAsUsed, 
  validateLicenseKey, 
  getAllLicenses 
};
