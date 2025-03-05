import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between">
      <div>
        <Link to="/" className="mr-4">Dashboard</Link>
        <Link to="/profile" className="mr-4">Profile</Link>
        <Link to="/leaves">Leave Management</Link>
      </div>
      <div>
        <Link to="/login">Login</Link>
      </div>
    </header>
  );
}

export default Header;
