const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

// Register user
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = new User({ name, email, password });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();
    const token = await jwt.sign({ _id: user._id }, "jwtsecret", {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (error) {
    console.error(error);
  }
});

// Login user
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "User not found" });
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return res.status(401).json({ message: "Invalid password" });
  const token = jwt.sign({ _id: user._id }, "jwtsecret", {
    expiresIn: "1h",
  });
  res.json({ token });
});

// Logout user
router.get("/logout", (req, res) => {
  res.json({ token: "" });
});

// Get all users
router.get("/all", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
