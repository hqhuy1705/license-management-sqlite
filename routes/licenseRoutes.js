const express = require('express');
const { generateLicenseKey, validateLicenseKey } = require('../controllers/licenseController');
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

module.exports = router;
