const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../models/User');
const router = express();

require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;
//registration route
router.post('api/auth/register', async (req, res) => {
const { username, email, password } = req.body; 
if (!username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  //Hash password
  try {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    const hashPass =  await bcrypt.hash(password, hash);
    //Save the user to DB
    const newuser = new User({ username, password: hashPass });
    await newUser.save();
  
    res.status(201).json({ message: 'User registered successfully' }); 
  }
//Return a success or error response
catch (error) {
    if (error.code === 11000) {
    //Unique email 
      return res.status(400).json({ message: 'Email already exists' });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

//Login route 
router.post('api/auth/login', async (req, res) => {
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