const express = require('express');
const router = express.Router();
const leaveController = require('../controllers/leaveController');
const { protect, managerOnly } = require('../middleware/auth');

router.post('/apply', protect, leaveController.applyLeave);
router.post('/:id/approve', protect, managerOnly, leaveController.approveLeave);

module.exports = router;
