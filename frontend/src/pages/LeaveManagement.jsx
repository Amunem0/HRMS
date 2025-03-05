import React, { useState } from 'react';
import axios from 'axios';

function LeaveManagement() {
  const [leaveData, setLeaveData] = useState({
    leaveType: 'Paid',
    startDate: '',
    endDate: '',
    reason: ''
  });
  
  const handleChange = (e) => {
    setLeaveData({ ...leaveData, [e.target.name]: e.target.value });
  };
  
  const handleApply = async (e) => {
    e.preventDefault();
    try {
      // Assume the logged-in user info is stored in localStorage
      const storedUser = localStorage.getItem('user');
      if (!storedUser) return alert('Please login first');
      const user = JSON.parse(storedUser);
      
      await axios.post('http://localhost:5000/api/leaves/apply', {
        userId: user._id,
        ...leaveData
      });
      alert('Leave applied successfully');
    } catch (error) {
      console.error(error);
      alert('Failed to apply leave');
    }
  };
  
  return (
    <div className="p-6">
      <h1 className="text-3xl mb-4">Leave Management</h1>
      <form onSubmit={handleApply} className="max-w-md">
        <div className="mb-4">
          <label className="block mb-2">Leave Type</label>
          <select name="leaveType" value={leaveData.leaveType} onChange={handleChange} className="w-full border p-2">
            <option value="Paid">Paid</option>
            <option value="Sick">Sick</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2">Start Date</label>
          <input type="date" name="startDate" value={leaveData.startDate} onChange={handleChange} className="w-full border p-2" />
        </div>
        <div className="mb-4">
          <label className="block mb-2">End Date</label>
          <input type="date" name="endDate" value={leaveData.endDate} onChange={handleChange} className="w-full border p-2" />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Reason</label>
          <textarea name="reason" value={leaveData.reason} onChange={handleChange} className="w-full border p-2" />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Apply Leave</button>
      </form>
    </div>
  );
}

export default LeaveManagement;
