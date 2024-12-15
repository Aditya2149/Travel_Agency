//adminRoutes.js
const express = require('express');
const { addPackage, updatePackage, deletePackage } = require('../controllers/adminController');
const { verifyAdmin, adminLogin } = require('../controllers/authcontroller');

const router = express.Router();

// Admin routes for package management, protected with JWT
router.post('/packages', verifyAdmin, addPackage);
router.put('/packages/:id', verifyAdmin, updatePackage);
router.delete('/packages/:id', verifyAdmin, deletePackage);
router.post("/login", adminLogin);

module.exports = router;
