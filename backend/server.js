const express = require("express");
const mongoose = require("mongoose");
const taskRoutes = require("./routes/taskRoutes");

const app = express(); // Initialize the app **before** using it

// Middleware
app.use(express.json()); // To parse incoming JSON requests

// Routes
app.use("/tasks", taskRoutes);
mongoose
    .connect("mongodb://127.0.0.1:27017/task-manager")
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log("DB Connection Error:", err));

// Server listening
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
