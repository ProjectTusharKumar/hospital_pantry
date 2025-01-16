const express = require('express');
const { PantryStaff, MealBox, AssignMeal, DeliveryPersonnel } = require('../Schema/databaseSchema');
const authenticateToken = require('../middleware/authenticateToken.js');

const router = express.Router();

// Add Pantry Staff
router.post('/staff', authenticateToken, async (req, res) => {
  try {
    const pantryStaff = new PantryStaff(req.body);
    await pantryStaff.save();
    res.status(201).json(pantryStaff);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// View Assigned Meal Preparation Tasks
router.get('/staff/tasks', authenticateToken, async (req, res) => {
  try {
    const tasks = await PantryStaff.findById(req.user.id).populate('mealPreparationTasks.mealBoxId');
    res.json(tasks);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update Preparation Status
router.put('/staff/tasks/:taskId', authenticateToken, async (req, res) => {
  try {
    const { taskId } = req.params;
    const { preparationStatus } = req.body;
    const pantryStaff = await PantryStaff.findById(req.user.id);
    const task = pantryStaff.mealPreparationTasks.id(taskId);
    task.preparationStatus = preparationStatus;
    await pantryStaff.save();
    res.json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Add Delivery Personnel
router.post('/delivery-personnel', authenticateToken, async (req, res) => {
  try {
    const deliveryPersonnel = new DeliveryPersonnel(req.body);
    await deliveryPersonnel.save();
    res.status(201).json(deliveryPersonnel);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Assign Meal Box to Delivery Personnel
router.post('/assign-meal', authenticateToken, async (req, res) => {
  const { mealBoxId, personnelId } = req.body;
  try {
    const mealBox = await MealBox.findById(mealBoxId);
    if (!mealBox) return res.status(404).json({ error: 'MealBox not found' });

    const deliveryPersonnel = await DeliveryPersonnel.findById(personnelId);
    if (!deliveryPersonnel) return res.status(404).json({ error: 'Delivery Personnel not found' });

    mealBox.deliveryPersonnel = personnelId;
    mealBox.deliveryStatus = 'Pending';
    await mealBox.save();

    const assignMeal = new AssignMeal({
      deliveryPersonnel: personnelId,
      mealBox: mealBoxId
    });
    await assignMeal.save();

    res.json({ message: 'MealBox assigned successfully', mealBox });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
