import React, { useState, useEffect } from 'react';
import { getAllPatients, createDietChart } from '../utils/middleware';

const CreateDietChart = () => {
  const [patients, setPatients] = useState([]);
  const [dietChart, setDietChart] = useState({
    patientId: '',
    morningMeal: '',
    eveningMeal: '',
    nightMeal: ''
  });

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const patientsData = await getAllPatients();
      setPatients(patientsData);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  const handleCreateDietChart = async () => {
    try {
      await createDietChart(dietChart);
      setDietChart({
        patientId: '',
        morningMeal: '',
        eveningMeal: '',
        nightMeal: ''
      });
    } catch (error) {
      console.error('Error creating diet chart:', error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Create Diet Chart</h2>
      <select
        value={dietChart.patientId}
        onChange={(e) => setDietChart({ ...dietChart, patientId: e.target.value })}
        className="p-2 border rounded mb-4"
      >
        <option value="">Select Patient</option>
        {patients.map(patient => (
          <option key={patient._id} value={patient._id}>{patient.name}</option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Morning Meal"
        value={dietChart.morningMeal}
        onChange={(e) => setDietChart({ ...dietChart, morningMeal: e.target.value })}
        className="p-2 border rounded mb-4"
      />
      <input
        type="text"
        placeholder="Evening Meal"
        value={dietChart.eveningMeal}
        onChange={(e) => setDietChart({ ...dietChart, eveningMeal: e.target.value })}
        className="p-2 border rounded mb-4"
      />
      <input
        type="text"
        placeholder="Night Meal"
        value={dietChart.nightMeal}
        onChange={(e) => setDietChart({ ...dietChart, nightMeal: e.target.value })}
        className="p-2 border rounded mb-4"
      />
      <button
        onClick={handleCreateDietChart}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Create Diet Chart
      </button>
    </div>
  );
};

export default CreateDietChart;
