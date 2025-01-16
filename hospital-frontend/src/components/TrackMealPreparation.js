import React, { useState, useEffect } from 'react';
import { getAllDietCharts } from '../utils/middleware';

const TrackMealPreparation = () => {
  const [dietCharts, setDietCharts] = useState([]);

  useEffect(() => {
    fetchDietCharts();
  }, []);

  const fetchDietCharts = async () => {
    try {
      const dietChartsData = await getAllDietCharts();
      setDietCharts(dietChartsData);
    } catch (error) {
      console.error('Error fetching diet charts:', error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Track Meal Preparation</h2>
      <ul className="mb-4">
        {dietCharts.map(chart => (
          <li key={chart._id} className="mb-2 p-2 border rounded shadow">
            {chart.patient.name} - Morning: {chart.morningMeal}, Evening: {chart.eveningMeal}, Night: {chart.nightMeal}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrackMealPreparation;