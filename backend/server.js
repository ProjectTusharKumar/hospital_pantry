const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
const PORT = process.env.PORT; // Get the port from .env file

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error(err));

// Import Routes
const adminRoutes = require('./APIs/admin_apis');
const pantryRoutes = require('./APIs/pantry_api');
const deliveryRoutes = require('./APIs/delivery_api');

// Use Routes
app.use('/api/admin', adminRoutes);
app.use('/api/pantry', pantryRoutes);
app.use('/api/delivery', deliveryRoutes);

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

