import { FaCalendar, FaTasks, FaChartBar, FaCog, FaHome, FaUser, FaSearch } from "react-icons/fa";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import { useState } from 'react';
// import { auth } from "../firebase/firebaseConfig";
// import { signOut } from "firebase/auth";

const Sidebar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout failed", error);
    }
  };
  

  return (
    <div>
      {/* Mobile Toggle */}
      <button onClick={toggleMenu} className="md:hidden fixed top-4 left-4 bg-black text-white p-2 rounded-lg z-50">
        ☰
      </button>

      {/* Sidebar */}
      <div className={`fixed md:static top-0 left-0 h-full w-64 bg-black text-white p-5 flex flex-col transition-transform ${menuOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}>
        <div className="flex items-center gap-2 mb-5">
          <img className="w-16" src="/assets/Icons/logo-user.png" alt="User" />
        </div>

        {/* Search */}
        <div className="flex items-center gap-3 text-gray-300 hover:text-white">
          <FaSearch />
          <input className="bg-transparent border-b placeholder-gray-400 focus:outline-none" placeholder="Search..." />
        </div>

        {/* Navigation Links */}
        <nav className="space-y-4 mt-4">
          <Link to="/" className="flex items-center gap-3 text-gray-300 hover:text-white"><FaHome /> Overview</Link>
          <Link to="/calendar" className="flex items-center gap-3 text-gray-300 hover:text-white"><FaCalendar /> Calendar</Link>
          <Link to="/tasks" className="flex items-center gap-3 text-gray-300 hover:text-white"><FaTasks /> Tasks</Link>
          <Link to="/analytics" className="flex items-center gap-3 text-gray-300 hover:text-white"><FaChartBar /> Analytics</Link>
          <Link to="/settings" className="flex items-center gap-3 text-gray-300 hover:text-white"><FaCog /> Settings</Link>
        </nav>

        {/* Logout */}
        <button onClick={handleLogout} className="mt-5 text-gray-400 hover:text-red-600">Logout</button>
      </div>
    </div>
  );
};

export default Sidebar;
