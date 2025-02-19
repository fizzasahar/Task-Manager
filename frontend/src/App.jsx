import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { auth } from "./firebase/firebaseConfig"; // Firebase Config
import { onAuthStateChanged } from "firebase/auth";

import Slider from "./components/Slider";
import Dashboard from "./pages/Dashboard";
import Calendar from "./components/Calendar";
import Tasks from "./components/Tasks";
import Analytics from "./components/Analytics";
import Settings from "./components/Settings";
import Login from "./components/Login";
import Signup from "./components/Signup";
import MoodTracker from "./components/MoodTracker";

import "./styles/global.css";

const App = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState(null); // ✅ Ensure setUser is defined

  // ✅ Firebase Authentication se user state update karna
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLogin(!!user); // Agar user hai to true, warna false
    });

    return () => unsubscribe(); // Cleanup
  }, []);

  return (
    <div className="flex">
      <Slider isLogin={isLogin} /> {/* ✅ Sidebar ko isLogin pass kiya */}

      <Routes>
        {isLogin ?
          (
            <>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/settings" element={<Settings />} />
            </>
          ) : (
            <>
              <Route path="/" element={<Login setIsLogin={setIsLogin} setUser={setUser} />} />
              <Route path="/signup" element={<Signup setIsLogin={setIsLogin} setUser={setUser} />} />
            </>
          )}
      </Routes>

      <MoodTracker />
    </div>
  );
};

export default App;
