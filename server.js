const express = require('express');
const mongoose = require('mongoose');
const User = require('./model/db');

const app = express();


app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb+srv://admin:Guna%402400@atlascluster.meqrzc3.mongodb.net/signin_signup');
const db = mongoose.connection;
db.once('open', () => console.log('Connected to MongoDB'));

// User registration route
app.post('/api/register', async (req, res) => {
  const { username, email, password } = req.body;
  
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Create new user
    const newUser = new User({ username, email, password });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to register user' });
  }
});

// User login route
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  
  try {
    // Find user by email and password
    const user = await User.findOne({ email, password });
    if (user) {
      res.status(200).json({ message: 'Login successful' });
    } else {
      res.status(401).json({ error: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to login' });
  }
});

app.listen(5000);
