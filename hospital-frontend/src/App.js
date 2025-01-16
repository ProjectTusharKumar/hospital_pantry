import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import Admin from './pages/Admin';
import ManagePatients from './components/ManagePatients';
import CreateDietChart from './components/CreateDietChart';
import ManagePantry from './components/ManagePantry';
import TrackMealPreparation from './components/TrackMealPreparation';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<Layout><Admin /></Layout>} />
        <Route path="/admin/manage-patients" element={<Layout><ManagePatients /></Layout>} />
        <Route path="/admin/create-diet-chart" element={<Layout><CreateDietChart /></Layout>} />
        <Route path="/admin/manage-pantry" element={<Layout><ManagePantry /></Layout>} />
        <Route path="/admin/track-meal-preparation" element={<Layout><TrackMealPreparation /></Layout>} />
        {/* Add other routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
