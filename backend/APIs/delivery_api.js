const express = require('express');
const { MealBox } = require('../Schema/databaseSchema');
const authenticateToken = require('../middleware/authenticateToken');

const router = express.Router();

// Mark Delivery as Completed
router.post('/complete', authenticateToken, async (req, res) => {
  const { mealBoxId, notes } = req.body;
  try {
    const mealBox = await MealBox.findById(mealBoxId);
    if (!mealBox) return res.status(404).json({ error: 'MealBox not found' });

    mealBox.deliveryStatus = 'Delivered';
    mealBox.deliveryNotes = notes;
    mealBox.timestamp = new Date();
    await mealBox.save();

    res.json(mealBox);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
