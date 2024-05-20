const express = require("express");
const router = express.Router();
const Board = require("../models/board");
const authenticate = require("../middlewares/verifyToken");

// Create board
router.post("/new", authenticate, async (req, res) => {
  const { title, description, background } = req.body;
  try {
    const board = new Board({
      title,
      description,
      background,
      members: [req.user._id],
    });
    await board.save();
    res.json(board);
  } catch (error) {
    console.error(error);
  }
});

// Update a board
router.put("/:id", authenticate, async (req, res) => {
  const { title, description, background } = req.body;
  try {
    const board = await Board.findById(req.params.id);
    if (board.members.includes(req.user._id)) {
      board.title = title;
      board.description = description;
      board.background = background;
      await board.save();
      res.json(board);
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    console.error(error);
  }
});

// Delete a board
router.delete("/:id", authenticate, async (req, res) => {
  try {
    await Board.findByIdAndDelete(req.params.id);
    res.json({ message: "Board deleted" });
  } catch (error) {
    console.error(error);
  }
});

// Get boards
router.get("/all", authenticate, async (req, res) => {
  try {
    const boards = await Board.find({});
    res.json(boards);
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
