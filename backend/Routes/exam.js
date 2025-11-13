const express = require('express');
const router = express.Router();
const Result = require('../models/Result');
const User = require('../models/User');

router.post('/submit', async (req, res) => {
  const { userId, score, total } = req.body;
  console.log("📩 Incoming result:", req.body);

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ msg: 'User not found' });

    const result = new Result({ user: user._id, score, total });
    await result.save();

    res.status(201).json({ msg: 'Result submitted', result });
  } catch (err) {
    console.error("❌ Error:", err.message);
    res.status(500).json({ msg: err.message });
  }
});

router.get('/results', async (req, res) => {
  try {
    const results = await Result.find().populate('user', 'name email');
    res.json(results);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;
