// Import necessary modules
const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// Database connection
mongoose.connect('mongodb://localhost:27017/hospital_food_mgmt', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB Connected')).catch(err => console.log(err));

// Admin Schema and Model
const adminSchema = new mongoose.Schema({
  role: { type: String, required: true, default: 'admin' },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});
const Admin = mongoose.model('Admin', adminSchema);

// Patient Schema and Model
const patientSchema = new mongoose.Schema({
  name: String,
  diseases: [String],
  allergies: [String],
  roomNumber: Number,
  bedNumber: { type: Number, required: true, unique: true },
  floorNumber: Number,
  age: Number,
  gender: String,
  contactInfo: String,
  emergencyContact: String,
});
const Patient = mongoose.model('Patient', patientSchema);

// Delivery Personnel Schema and Model
const deliveryPersonnelSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  contactInfo: { type: String, required: true },
  role: { type: String, required: true, default: 'Delivery_person' },
  orderHistory: [{
    mealBoxId: { type: mongoose.Schema.Types.ObjectId, ref: 'MealBox' },
    deliveryDate: { type: Date, default: Date.now }
  }]
});
const DeliveryPersonnel = mongoose.model('DeliveryPersonnel', deliveryPersonnelSchema);

// Pantry Staff Schema and Model
const pantryStaffSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  contactInfo: { type: String, required: true },
  role: { type: String, required: true, default: 'Pantry_Staff' },
  mealPreparationTasks: [{
    mealBoxId: { type: mongoose.Schema.Types.ObjectId, ref: 'MealBox' },
    preparationStatus: { type: String, enum: ['Pending', 'Prepared'], default: 'Pending' }
  }]
});
const PantryStaff = mongoose.model('PantryStaff', pantryStaffSchema);

// Meal Box Schema and Model
const mealBoxSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient' },
  dietDetails: String,
  deliveryPersonnel: { type: mongoose.Schema.Types.ObjectId, ref: 'DeliveryPersonnel' },
  deliveryStatus: { type: String, enum: ['Pending', 'Delivered'], default: 'Pending' },
  deliveryNotes: String,
  timestamp: { type: Date, default: Date.now },
});
const MealBox = mongoose.model('MealBox', mealBoxSchema);

// Assign Meal Schema and Model
const assignMealSchema = new mongoose.Schema({
  deliveryPersonnel: { type: mongoose.Schema.Types.ObjectId, ref: 'DeliveryPersonnel', required: true },
  mealBox: { type: mongoose.Schema.Types.ObjectId, ref: 'MealBox', required: true },
  assignedDate: { type: Date, default: Date.now }
});
const AssignMeal = mongoose.model('AssignMeal', assignMealSchema);

// Food/Diet Chart Schema and Model
const dietChartSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  morningMeal: {
    ingredients: [String],
    instructions: String,
    specific_instructions: String
  },
  eveningMeal: {
    ingredients: [String],
    instructions: String,
    specific_instructions: String
  },
  nightMeal: {
    ingredients: [String],
    instructions: String,
    specific_instructions: String
  }
});
const DietChart = mongoose.model('DietChart', dietChartSchema);

// Pantry Details Schema and Model
const pantryDetailsSchema = new mongoose.Schema({
  staffName: { type: String, required: true },
  contactInfo: { type: String, required: true },
  location: { type: String, required: true }
});
const PantryDetails = mongoose.model('PantryDetails', pantryDetailsSchema);

// Start Server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
module.exports = { Admin, Patient, DeliveryPersonnel, MealBox, PantryStaff, AssignMeal, DietChart, PantryDetails };
