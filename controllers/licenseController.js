const db = require("../config/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const generateLicenseKey = async (req, res) => {
  try {
    const { user } = req.body;
    const licenseKey = jwt.sign({ user }, process.env.JWT_SECRET, {
      expiresIn: "1y",
    });
    const hashedKey = await bcrypt.hash(licenseKey, 10);

    const expiresAt = new Date(
      Date.now() + 365 * 24 * 60 * 60 * 1000
    ).toISOString();

    const query = `
      INSERT INTO licenses (user, license_key, expires_at)
      VALUES (?, ?, ?)
    `;
    db.run(query, [user, hashedKey, expiresAt], function (err) {
      if (err) {
        console.error(err.message);
        return res.status(500).send("Server error");
      }
      res.json({ licenseKey });
    });
  } catch (error) {
    res.status(500).send("Server error");
  }
};

const validateLicenseKey = async (req, res) => {
  try {
    const { user, licenseKey } = req.body;

    const query = `
      SELECT * FROM licenses WHERE user = ? AND is_active = 1
    `;
    db.get(query, [user], async (err, row) => {
      if (err || !row) {
        return res.status(401).json({ message: "Invalid or expired license" });
      }

      const isMatch = await bcrypt.compare(licenseKey, row.license_key);

      if (!isMatch) {
        return res.status(401).json({ message: "Invalid license" });
      }

      res.json({ message: "License is valid" });
    });
  } catch (error) {
    res.status(500).send("Server error");
  }
};

module.exports = { generateLicenseKey, validateLicenseKey };
