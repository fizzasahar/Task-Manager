import { FaCalendar, FaTasks, FaChartBar, FaCog, FaHome, FaUser, FaGoogle, FaSignOutAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { auth } from "../firebase/firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";
import img from "../assets/Icons/logo user.png";

const Slider = ({ isLogin }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Firebase se user fetch karna
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      navigate("/");
      console.log("User logged out");

    } catch (error) {
      console.error("Logout Error:", error.message);
    }
  };

  return (
    <div>
      <button onClick={toggleMenu} className="md:hidden fixed top-4 left-4 bg-black text-white p-2 rounded-lg z-50">
        ☰
      </button>

      < div className={`fixed md:static top-0 left-0 h-full w-64 bg-black text-white p-5 flex flex-col transition-transform ${menuOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}>
        <div className="flex items-center gap-2 mb-5">
          <img className="w-16" src={img} alt="User" />
          {user && <span className="text-lg font-semibold">{user.displayName || "User"}</span>}
        </div>

        {isLogin ? (
          <>
            <nav className="space-y-4 mt-4">
              <Link to="/dashboard" className="flex items-center gap-3 text-gray-300 focus:text-orange-500  hover:text-white"><FaHome /> Overview</Link>
              <Link to="/calendar" className="flex items-center gap-3 text-gray-300 focus:text-orange-500  hover:text-white"><FaCalendar /> Calendar</Link>
              <Link to="/tasks" className="flex items-center gap-3 text-gray-300 focus:text-orange-500 hover:text-white"><FaTasks /> Tasks</Link>
              <Link to="/analytics" className="flex items-center gap-3 text-gray-300 focus:text-orange-500  hover:text-white"><FaChartBar /> Analytics</Link>
              <Link to="/settings" className="flex items-center gap-3 text-gray-300 focus:text-orange-500  hover:text-white"><FaCog /> Settings</Link>
            </nav>

            <button onClick={handleLogout} className="mt-6 flex items-center gap-3 pt-55 text-red-500 focus:text-orange-500  hover:text-red-700">
              <FaSignOutAlt /> Logout
            </button>
          </>
        ) : (
          <nav className="space-y-4 mt-4">
            <Link to="/" className="flex items-center gap-3 text-gray-300 focus:text-orange-500  hover:text-white"><FaUser /> Login</Link>
            <Link to="/signup" className="flex items-center gap-3 text-gray-300 focus:text-orange-500  hover:text-white"><FaGoogle /> Signup</Link>
          </nav>
        )}
      </div>
    </div>
  );
};

export default Slider;
