const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: String,
  board: { type: mongoose.Schema.Types.ObjectId, ref: "Board" },
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
