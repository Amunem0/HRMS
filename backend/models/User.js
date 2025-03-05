const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['Admin', 'Manager', 'Employee'], default: 'Employee' },
  managerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  profile: {
    phone: { type: String },
    address: { type: String },
    avatar: { type: String }
  },
  dateOfBirth: { type: Date },
  joinDate: { type: Date, default: Date.now }
});
module.exports = mongoose.model('User', UserSchema);
