const express = require('express');
const { generateLicenseKey, validateLicenseKey, getAllLicenses, markLicenseAsUsed } = require('../controllers/licenseController');
const router = express.Router();

/**
 * @swagger
 * /api/license/generate:
 *   post:
 *     summary: Generate a new license key
 *     description: Generates a license key for a user and associates it with a device.
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
 *                 description: The username or identifier for whom the license key is generated.
 *               deviceId:
 *                 type: string
 *                 example: device-1234
 *                 description: The unique identifier for the device where the license will be used.
 *     responses:
 *       201:
 *         description: License key generated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 licenseKey:
 *                   type: string
 *                   example: '550e8400-e29b-41d4-a716-446655440000'
 *                   description: The generated license key.
 *       400:
 *         description: Bad request, possibly because the license key already exists
 *       500:
 *         description: Server error
 */
router.post('/generate', generateLicenseKey);

/**
 * @swagger
 * /api/license/mark-used:
 *   post:
 *     summary: Mark a license key as used
 *     description: Marks a license key as used and associates it with a device.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               licenseKey:
 *                 type: string
 *                 example: '550e8400-e29b-41d4-a716-446655440000'
 *                 description: The license key to be marked as used.
 *               deviceId:
 *                 type: string
 *                 example: device-1234
 *                 description: The unique identifier for the device.
 *     responses:
 *       200:
 *         description: License key marked as used successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'License key marked as used'
 *       400:
 *         description: Bad request, possibly because the license key is already used
 *       404:
 *         description: License key not found
 *       500:
 *         description: Server error
 */
router.post('/mark-used', markLicenseAsUsed);

/**
 * @swagger
 * /api/license/validate:
 *   post:
 *     summary: Validate a license key
 *     description: Validates the provided license key and checks if it is used on the correct device.
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
 *                 description: The username or identifier for whom the license key is being validated.
 *               licenseKey:
 *                 type: string
 *                 example: '550e8400-e29b-41d4-a716-446655440000'
 *                 description: The license key to be validated.
 *               deviceId:
 *                 type: string
 *                 example: device-1234
 *                 description: The unique identifier for the device where the license key is used.
 *     responses:
 *       200:
 *         description: License key is valid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'License key is valid'
 *       403:
 *         description: License key is already used on another device
 *       404:
 *         description: License key not found
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
