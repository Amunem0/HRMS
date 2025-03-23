const express = require('express');
const router = express.Router();
const { getDashboardData } = require('../controllers/dashboardController');
const { protect } = require('../middleware/auth');

// Optionally, protect the dashboard route if required:
router.get('/', protect, getDashboardData);

module.exports = router;
