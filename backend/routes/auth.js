const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../models/User');
const router = express.Router();

require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;


router.get("/users", async (req, res) => {
  try {
    const users = await User.find({}, "-password"); // Exclude passwords from the response
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

//registration route
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if all fields exist
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    console.log('New Hashed Password:', hashedPassword);
    // Save user to database
    await newUser.save();
    res.status(201).json({ message: "Registration successful" });

  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ message: "Server error, please try again" });
  }
});

//Login route 
router.post("/login", async (req, res) => {
  const { emailOrUsername, password } = req.body;
  
  // Find user by email or username
  const user = await User.findOne({
    $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
  });
  
  if (!user) {
    return res.status(400).json({ message: "User not found." });
  }
  
  // Compare entered password with stored password
  console.log(password, user.password);
  const isMatch = await bcrypt.compare(password, user.password);
  
  if (!isMatch) {
  
    return res.status(400).json({ message: "Invalid password." });
  }

  // Create JWT token
  const token = jwt.sign({ userId: user._id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
  console.log(token);
  // Respond with the token
  res.status(200).json({
    message: "Login successful!",
    token: token,
    user: { id: user._id, username: user.username }
  });
});

module.exports = router;
