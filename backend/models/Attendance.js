const mongoose = require('mongoose');
const AttendanceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  checkInTime: { type: Date },
  checkOutTime: { type: Date },
  status: { type: String, enum: ['Present', 'Absent', 'Late'], default: 'Absent' }
});
module.exports = mongoose.model('Attendance', AttendanceSchema);
