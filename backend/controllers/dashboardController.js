const Attendance = require('../models/Attendance');
const User = require('../models/User');

exports.getDashboardData = async (req, res) => {
  try {
    // Define today's date boundaries (start and end of the day)
    const today = new Date();
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);

    // Count attendance records for today
    const attendanceCount = await Attendance.countDocuments({
      date: { $gte: startOfDay, $lt: endOfDay }
    });

    // Get users with birthdays today
    // Note: We assume each User document has a dateOfBirth field (a Date)
    const allUsers = await User.find({ dateOfBirth: { $exists: true, $ne: null } }).lean();
    const todayMonth = today.getMonth() + 1; // getMonth returns 0-based month
    const todayDate = today.getDate();

    const birthdayUsers = allUsers.filter(user => {
      const dob = new Date(user.dateOfBirth);
      return (dob.getMonth() + 1) === todayMonth && dob.getDate() === todayDate;
    });

    // Get users with work anniversaries today (using joinDate)
    const joinUsers = await User.find({ joinDate: { $exists: true, $ne: null } }).lean();
    const anniversaryUsers = joinUsers.filter(user => {
      const joinDate = new Date(user.joinDate);
      return (joinDate.getMonth() + 1) === todayMonth && joinDate.getDate() === todayDate;
    });

    res.json({
      attendanceCount,
      birthdays: birthdayUsers,
      anniversaries: anniversaryUsers
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
