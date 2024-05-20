const mongoose = require("mongoose");

// Board model
const boardSchema = new mongoose.Schema({
  title: String,
  description: String,
  background: String,
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

const Board = mongoose.model("Board", boardSchema);

module.exports = Board;
