const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

// Import routes
const boardsRoutes = require("./routes/boards");
const tasksRoutes = require("./routes/tasks");
const usersRoutes = require("./routes/users");

const app = express();
app.use(express.json());
app.use(cors());

const mongouri = process.env.MONGO_URI;

// Connect to MongoDB database
mongoose.connect(mongouri, {
  useUnifiedTopology: true,
});

// Use routes
app.use("/api/boards", boardsRoutes);
app.use("/api/tasks", tasksRoutes);
app.use("/api/users", usersRoutes);

// Start server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
