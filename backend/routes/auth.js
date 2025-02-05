const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
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

    // Save user to database
    await newUser.save();
    res.status(201).json({ message: "Registration successful" });

  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ message: "Server error, please try again" });
  }
});

//Login route 
router.post('/login', async (req, res) => {
    const { email, password } = req.body; 
    if (!email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
        //check more cases 
      }
      //check if user exists
      try {
        const user = await User.findOns({email});
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        //Check if password exists
        const isFound = await bcrypt.compare(password, user.password);
        if (!isFound) {
            return res.status(400).json({ message: 'Invalid password' });
        }
        //create JWT token if valid 
        const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
            expiresIn: '1h',
          });

        res.status(200).json({ message: 'User logged in', token });
      }
      catch (error) {
        res.status(500).json({ message: 'Server error' });
      }
    
});


module.exports = router;