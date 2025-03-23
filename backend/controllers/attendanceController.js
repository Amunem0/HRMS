const Attendance = require('../models/Attendance');

// Record attendance (check-in/out)
exports.recordAttendance = async (req, res) => {
  try {
    const { userId, date, checkInTime, checkOutTime, status } = req.body;
    if (!userId || !date) {
      return res.status(400).json({ error: 'userId and date are required' });
    }
    const attendance = await Attendance.create({ userId, date, checkInTime, checkOutTime, status });
    res.status(201).json(attendance);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
