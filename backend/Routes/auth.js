const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Signup
router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ msg: 'User already exists' });

    const user = new User({ name, email, password });
    await user.save();

    res.status(201).json({
      msg: 'Signup successful',
      user: { _id: user._id, name: user.name, email: user.email } // only _id
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: 'User not found' });

    if (user.password !== password) {
      return res.status(400).json({ msg: 'Invalid password' });
    }

    const token = jwt.sign({ id: user._id }, 'examportal123', { expiresIn: '1h' });

    res.json({
      msg: 'Login successful',
      token,
      user: { _id: user._id, name: user.name, email: user.email } // only _id
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;
