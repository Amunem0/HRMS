const Leave = require('../models/Leave');

// Employee applies for leave
exports.applyLeave = async (req, res) => {
  try {
    const { userId, leaveType, startDate, endDate, reason } = req.body;
    if (!userId || !leaveType || !startDate || !endDate) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const leave = await Leave.create({
      userId,
      leaveType,
      startDate,
      endDate,
      comments: reason
    });
    res.status(201).json(leave);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Manager approves or rejects leave using JWT role
exports.approveLeave = async (req, res) => {
  try {
    // req.user is set by the protect middleware and includes role and id
    if (req.user.role !== 'Manager') {
      return res.status(403).json({ error: 'Access denied. Only managers can approve leaves.' });
    }
    const leave = await Leave.findById(req.params.id);
    if (!leave) {
      return res.status(404).json({ error: 'Leave request not found' });
    }
    const { approved, comments } = req.body;
    leave.status = approved ? 'Approved' : 'Rejected';
    leave.approvedBy = req.user.id; // Use manager's id from the JWT
    leave.comments = comments;
    await leave.save();
    res.json(leave);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
