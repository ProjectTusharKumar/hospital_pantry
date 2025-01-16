const express = require('express');
const jwt = require('jsonwebtoken');
const { Admin, PantryStaff, DeliveryPersonnel, Patient, DietChart, PantryDetails } = require('../Schema/databaseSchema');
const authenticateToken = require('../middleware/authenticateToken');

const router = express.Router();

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  let user = await Admin.findOne({ email }) || await PantryStaff.findOne({ email }) || await DeliveryPersonnel.findOne({ email });
  
  if (!user) return res.status(400).send('User not found');
  if (password !== user.password) return res.status(400).send('Invalid credentials');

  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token, role: user.role });
});

// Admin Register
router.post('/register', async (req, res) => {
  const { email, password, role = 'admin' } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const newAdmin = new Admin({ email, password, role });
    await newAdmin.save();
    res.status(201).json({ message: 'Admin registered successfully' });
  } catch (err) {
    res.status(400).json({ error: 'Error registering admin', details: err.message });
  }
});

// Register Pantry Staff
router.post('/register-pantry-staff', authenticateToken, async (req, res) => {
  const { email, password, name, contactInfo, role = 'pantry_staff' } = req.body;
  if (!email || !password || !name || !contactInfo) {
    return res.status(400).json({ error: 'Email, password, name, and contact info are required' });
  }

  try {
    const newPantryStaff = new PantryStaff({ email, password, name, contactInfo, role });
    await newPantryStaff.save();
    res.status(201).json({ message: 'Pantry staff registered successfully' });
  } catch (err) {
    res.status(400).json({ error: 'Error registering pantry staff', details: err.message });
  }
});

// Register Delivery Personnel
router.post('/register-delivery-personnel', authenticateToken, async (req, res) => {
  const { email, password, name, contactInfo, role = 'delivery_personnel' } = req.body;
  if (!email || !password || !name || !contactInfo) {
    return res.status(400).json({ error: 'Email, password, name, and contact info are required' });
  }

  try {
    const newDeliveryPersonnel = new DeliveryPersonnel({ email, password, name, contactInfo, role });
    await newDeliveryPersonnel.save();
    res.status(201).json({ message: 'Delivery personnel registered successfully' });
  } catch (err) {
    res.status(400).json({ error: 'Error registering delivery personnel', details: err.message });
  }
});

// Register Patient
router.post('/register-patient', authenticateToken, async (req, res) => {
  const { name, diseases, allergies, roomNumber, bedNumber, floorNumber, age, gender, contactInfo, emergencyContact } = req.body;
  
  console.log('Received data:', req.body); // Add this line to log the received data

  if (!name || !roomNumber || !bedNumber || !floorNumber || !age || !gender || !contactInfo || !emergencyContact) {
    return res.status(400).json({ error: 'All patient details are required' });
  }

  try {
    const newPatient = new Patient({ name, diseases, allergies, roomNumber, bedNumber, floorNumber, age, gender, contactInfo, emergencyContact });
    await newPatient.save();
    res.status(201).json({ message: 'Patient registered successfully' });
  } catch (err) {
    res.status(400).json({ error: 'Error registering patient', details: err.message });
  }
});

// Get All Patients
router.get('/patients', authenticateToken, async (req, res) => {
  try {
    const patients = await Patient.find();
    res.status(200).json(patients);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching patients', details: err.message });
  }
});

// Create Diet Chart
router.post('/create-diet-chart', authenticateToken, async (req, res) => {
  const { patientId, morningMeal, eveningMeal, nightMeal } = req.body;
  if (!patientId || !morningMeal || !eveningMeal || !nightMeal) {
    return res.status(400).json({ error: 'All diet chart details are required' });
  }

  try {
    const newDietChart = new DietChart({ patient: patientId, morningMeal, eveningMeal, nightMeal });
    await newDietChart.save();
    res.status(201).json({ message: 'Diet chart created successfully' });
  } catch (err) {
    res.status(400).json({ error: 'Error creating diet chart', details: err.message });
  }
});

// Get All Diet Charts
router.get('/diet-charts', authenticateToken, async (req, res) => {
  try {
    const dietCharts = await DietChart.find().populate('patient');
    res.status(200).json(dietCharts);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching diet charts', details: err.message });
  }
});

// Add Pantry Details
router.post('/add-pantry-details', authenticateToken, async (req, res) => {
  const { staffName, contactInfo, location } = req.body;
  if (!staffName || !contactInfo || !location) {
    return res.status(400).json({ error: 'All pantry details are required' });
  }

  try {
    const newPantryDetails = new PantryDetails({ staffName, contactInfo, location });
    await newPantryDetails.save();
    res.status(201).json({ message: 'Pantry details added successfully' });
  } catch (err) {
    res.status(400).json({ error: 'Error adding pantry details', details: err.message });
  }
});

// Get All Pantry Details
router.get('/pantry-details', authenticateToken, async (req, res) => {
  try {
    const pantryDetails = await PantryDetails.find();
    res.status(200).json(pantryDetails);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching pantry details', details: err.message });
  }
});

module.exports = router;
