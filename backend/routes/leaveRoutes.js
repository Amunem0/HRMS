const express = require('express');
const router = express.Router();
const leaveController = require('../controllers/leaveController');

router.post('/apply', leaveController.applyLeave);
router.post('/:id/approve', leaveController.approveLeave);

module.exports = router;
