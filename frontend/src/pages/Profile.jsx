import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Profile() {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // For demo, fetch all users and assume the first is the logged-in user.
        const res = await axios.get('http://localhost:5000/api/users');
        setUser(res.data[0]);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProfile();
  }, []);
  
  if (!user) return <div>Loading...</div>;
  
  return (
    <div className="p-6">
      <h1 className="text-3xl mb-4">Profile</h1>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Role:</strong> {user.role}</p>
    </div>
  );
}

export default Profile;
