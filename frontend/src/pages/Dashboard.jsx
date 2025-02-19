import React, { useState, useEffect } from "react";
import Chart from "../components/Chart";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase/firebaseConfig";
import { collection, query, where, orderBy, limit, getDocs } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Dashboard = () => {
  const [upcomingTasks, setUpcomingTasks] = useState([]);
  const [user, setUser] = useState(null); // 🔹 Track logged-in user
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (loggedInUser) => {
      console.log("Auth State Changed:", loggedInUser); // Debugging
      if (loggedInUser) {
        setUser(loggedInUser);
        fetchUpcomingTasks(loggedInUser);
      } else {
        setUser(null);
        setUpcomingTasks([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchUpcomingTasks = async (loggedInUser) => {
    if (!loggedInUser) return;

    const today = new Date().toISOString().split("T")[0]; // Get today's date
    const tasksRef = collection(db, "tasks");

    console.log("Fetching tasks for user:", loggedInUser.uid); // Debugging

    const q = query(
      tasksRef,
      where("userId", "==", loggedInUser.uid),
      where("date", ">=", today),
      orderBy("date"),
      limit(3)
    );

    try {
      const snapshot = await getDocs(q);
      const tasksData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      console.log("Fetched Tasks:", tasksData); // Debugging
      setUpcomingTasks(tasksData);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  return (
    < div className="flex-1 p-6 md:p-10 lg:p-12 bg-gray-100 min-h-screen flex flex-col items-center">
      < div className="max-w-screen-xl w-full">
        <h1 className="text-3xl md:text-5xl font-bold text-center md:text-left">
          Let's start your new <br /> happy day!
        </h1>
        <p className="text-gray-500 md:text-gray-700 mt-5 text-center md:text-left">
          Check the calendar to see what interesting tasks are waiting for you today.
        </p>

        <button
          onClick={() => navigate("/calendar")}
          className="mt-4 cursor-pointer bg-orange-500 text-white px-4 py-2 rounded-lg hover:shadow-lg shadow-orange-600/50 hover:bg-orange-600 transition duration-300 ease-in-out"
        >
          My Calendar
        </button>

        {/* Stats Section */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Upcoming Tasks Div */}
          <div className="bg-white p-5 border border-gray-200 shadow-lg hover:shadow-2xl transition rounded-lg">
            <h2 className="text-2xl font-semibold">Upcoming Tasks</h2>
            {upcomingTasks.length > 0 ? (
              <ul className="mt-4">
                {upcomingTasks.map((task) => (
                  <li key={task.id} className="py-2 border-b border-gray-100">
                    <p className="font-semibold text-black">{task.title}</p>
                    <p className="text-gray-500 text-sm">📅 {task.date}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 mt-4">No upcoming tasks.</p>
            )}
          </div>

          <Chart />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
