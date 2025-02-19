import React, { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { db } from "../firebase/firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { FaEdit, FaTrash } from "react-icons/fa";

const Tasks = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    if (user) {
      fetchTasks();
    }
  }, [selectedDate, user]);

  const fetchTasks = async () => {
    if (!user) return;

    const q = query(
      collection(db, "tasks"),
      where("date", "==", selectedDate),
      where("userId", "==", user.uid)
    );

    const querySnapshot = await getDocs(q);
    const taskList = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setTasks(taskList);
  };

  const addOrUpdateTask = async () => {
    if (!user) {
      alert("User not logged in!");
      return;
    }

    if (taskTitle.trim() === "" || taskDescription.trim() === "") return;

    if (editingTask) {
      const taskRef = doc(db, "tasks", editingTask.id);
      await updateDoc(taskRef, {
        title: taskTitle,
        description: taskDescription,
      });
      setEditingTask(null);
    } else {
      await addDoc(collection(db, "tasks"), {
        title: taskTitle,
        description: taskDescription,
        date: selectedDate,
        userId: user.uid,
      });
    }

    setTaskTitle("");
    setTaskDescription("");
    fetchTasks();
  };

  const deleteTask = async (id) => {
    try {
      await deleteDoc(doc(db, "tasks", id));
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const startEditing = (task) => {
    setEditingTask(task);
    setTaskTitle(task.title);
    setTaskDescription(task.description);
  };

  return (
    <div className="flex-1 p-6 md:p-10 lg:p-12 bg-gray-100 min-h-screen flex flex-col items-center">
      <h2 className="text-4xl font-semibold text-black mb-6">📅 Marks Your Task 🚀 </h2>

      {/* Date Picker */}
      <input
        type="date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
        className="w-full max-w-md p-4 bg-white shadow-md border border-gray-300 rounded-lg text-black focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all mb-4"
      />

      {/* Task Input Fields */}
      <div className="w-full max-w-md space-y-4 bg-white shadow-md p-6 rounded-lg border border-gray-300">
        <input
          type="text"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          placeholder="Enter task title..."
          className="w-full p-4 bg-white border rounded-lg shadow-sm text-black border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all"
        />
        <textarea
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
          placeholder="Enter task description..."
          className="w-full p-4 bg-white border rounded-lg shadow-sm text-black border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all"
        ></textarea>

        <button
          onClick={addOrUpdateTask}
          className={`w-full p-4 text-white font-bold rounded-lg shadow-md transition duration-300 ease-in-out ${editingTask ? "bg-blue-500 shadow-blue-600/50 hover:shadow-lg  hover:bg-blue-600" : "bg-orange-500 shadow-orange-600/50 hover:shadow-lg  hover:bg-orange-600"
            }`}
        >
          {editingTask ? "Update Task" : "Add Task"}
        </button>
      </div>

      {/* Task List */}
      <div className="w-full max-w-md mt-4 space-y-3">
        {tasks.map((task) => (
          <div key={task.id} className="bg-white shadow-md p-4 rounded-lg flex justify-between items-center">
            <div>
              <h3 className="font-semibold text-black">{task.title}</h3>
              <p className="text-gray-600 text-sm">{task.description}</p>
              <p className="text-gray-500 text-xs">📅 {task.date}</p>
            </div>
            <div className="flex gap-3">
              <button onClick={() => startEditing(task)} className="text-blue-500">
                <FaEdit />
              </button>
              <button onClick={() => deleteTask(task.id)} className="text-red-500">
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Tasks;
