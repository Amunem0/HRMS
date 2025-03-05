import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  
  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/dashboard');
        setDashboardData(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchDashboard();
  }, []);
  
  if (!dashboardData) return <div>Loading...</div>;
  
  return (
    <div className="p-6">
      <h1 className="text-3xl mb-4">Dashboard</h1>
      <div>
        <p>Total Attendance Records: {dashboardData.attendanceCount}</p>
        {/* You can render birthdays and work anniversaries here */}
      </div>
    </div>
  );
}

export default Dashboard;
