const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');
const { protect } = require('../middleware/auth');

router.post('/', protect, attendanceController.recordAttendance);

module.exports = router;
