const express = require("express");
const router = express.Router();
const Task = require("../models/task");
const authenticate = require("../middlewares/verifyToken");

// Create task
router.post("/new", authenticate, async (req, res) => {
  const { title, description, status, boardId } = req.body;
  try {
    const task = new Task({ title, description, status, board: boardId });
    await task.save();
    res.json(task);
  } catch (error) {
    console.error(error);
  }
});

// Update task
router.put("/:id", authenticate, async (req, res) => {
  const { title, description, status } = req.body;
  try {
    const task = await Task.findById(req.params.id);
    task.title = title;
    task.description = description;
    task.status = status;
    await task.save();
    res.json(task);
  } catch (error) {
    console.error(error);
  }
});

// Delete task
router.delete("/:id", authenticate, async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted" });
  } catch (error) {
    console.error(error);
  }
});

// Get tasks
router.get("/all", authenticate, async (req, res) => {
  try {
    // const tasks = await Task.find({});
    const tasks = await Task.find({ board: req.query.boardId });
    res.json(tasks);
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
