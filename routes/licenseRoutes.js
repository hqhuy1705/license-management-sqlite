const express = require('express');
const { generateLicenseKey, validateLicenseKey, getAllLicenses } = require('../controllers/licenseController');
const router = express.Router();

/**
 * @swagger
 * /api/license/generate:
 *   post:
 *     summary: Generate a new license key
 *     description: Generates a license key for a user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: string
 *                 example: example_user
 *     responses:
 *       200:
 *         description: A new license key
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 licenseKey:
 *                   type: string
 *       500:
 *         description: Server error
 */
router.post('/generate', generateLicenseKey);

/**
 * @swagger
 * /api/license/validate:
 *   post:
 *     summary: Validate a license key
 *     description: Validates the provided license key for a user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: string
 *               licenseKey:
 *                 type: string
 *     responses:
 *       200:
 *         description: License is valid
 *       401:
 *         description: Invalid or expired license
 *       500:
 *         description: Server error
 */
router.post('/validate', validateLicenseKey);

/**
 * @swagger
 * /api/license/all:
 *   get:
 *     summary: Get all license keys
 *     description: Retrieve all license keys stored in the database.
 *     responses:
 *       200:
 *         description: List of license keys
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   user:
 *                     type: string
 *                   license_key:
 *                     type: string
 *                   is_active:
 *                     type: integer
 *                   expires_at:
 *                     type: string
 *       500:
 *         description: Server error
 */
router.get('/all', getAllLicenses);

module.exports = router;
