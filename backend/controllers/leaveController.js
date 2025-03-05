const Leave = require('../models/Leave');

// Employee applies for leave
exports.applyLeave = async (req, res) => {
  try {
    const { userId, leaveType, startDate, endDate, reason } = req.body;

    // Optional: Validate required fields
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

// Manager approves or rejects leave (dummy check for manager role)
exports.approveLeave = async (req, res) => {
  try {
    // Simulate manager check by requiring "managerRole" in request body
    if (req.body.managerRole !== 'Manager') {
      return res.status(403).json({ error: 'Access denied. Only managers can approve leaves.' });
    }

    const leave = await Leave.findById(req.params.id);
    if (!leave) {
      return res.status(404).json({ error: 'Leave request not found' });
    }

    const { approved, comments, managerId } = req.body;
    if (!managerId) {
      return res.status(400).json({ error: 'managerId is required for approval' });
    }

    leave.status = approved ? 'Approved' : 'Rejected';
    leave.approvedBy = managerId; // Expect managerId to be provided
    leave.comments = comments;
    await leave.save();
    res.json(leave);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
