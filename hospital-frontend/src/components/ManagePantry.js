import React, { useState, useEffect } from 'react';
import { getAllPantryDetails, registerPantryStaff } from '../utils/middleware';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ManagePantry = () => {
  const [pantryDetails, setPantryDetails] = useState([]);
  const [newPantryDetail, setNewPantryDetail] = useState({
    email: '',
    password: '',
    name: '',
    contactInfo: '',
    location: ''
  });

  useEffect(() => {
    fetchPantryDetails();
  }, []);

  const fetchPantryDetails = async () => {
    try {
      const pantryDetailsData = await getAllPantryDetails();
      setPantryDetails(pantryDetailsData);
    } catch (error) {
      console.error('Error fetching pantry details:', error);
    }
  };

  const handleAddPantryDetail = async () => {
    if (Object.values(newPantryDetail).some(field => field === '')) {
      toast.error('All fields are required');
      return;
    }

    try {
      await registerPantryStaff(newPantryDetail.email, newPantryDetail.password, newPantryDetail.name, newPantryDetail.contactInfo, 'pantry_staff');
      fetchPantryDetails();
      setNewPantryDetail({
        email: '',
        password: '',
        name: '',
        contactInfo: '',
        location: ''
      });
      toast.success('Pantry staff added successfully');
    } catch (error) {
      console.error('Error adding pantry detail:', error);
      toast.error('Error adding pantry detail');
    }
  };

  return (
    <div className="p-4">
      <ToastContainer />
      <h2 className="text-2xl font-bold mb-4">Manage Pantry</h2>
      <ul className="mb-4">
        {pantryDetails.map(detail => (
          <li key={detail._id} className="mb-2 p-2 border rounded shadow">
            {detail.staffName} - Location: {detail.location}
          </li>
        ))}
      </ul>
      <div className="p-4 border rounded shadow">
        <h3 className="text-xl font-semibold mb-4">Add Pantry Detail</h3>
        <div className="grid grid-cols-1 gap-4 mb-4">
          <input
            type="email"
            placeholder="Email"
            value={newPantryDetail.email}
            onChange={(e) => setNewPantryDetail({ ...newPantryDetail, email: e.target.value })}
            className="p-2 border rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={newPantryDetail.password}
            onChange={(e) => setNewPantryDetail({ ...newPantryDetail, password: e.target.value })}
            className="p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Name"
            value={newPantryDetail.name}
            onChange={(e) => setNewPantryDetail({ ...newPantryDetail, name: e.target.value })}
            className="p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Contact Info"
            value={newPantryDetail.contactInfo}
            onChange={(e) => setNewPantryDetail({ ...newPantryDetail, contactInfo: e.target.value })}
            className="p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Location"
            value={newPantryDetail.location}
            onChange={(e) => setNewPantryDetail({ ...newPantryDetail, location: e.target.value })}
            className="p-2 border rounded"
          />
        </div>
        <button
          onClick={handleAddPantryDetail}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Add Pantry Detail
        </button>
      </div>
    </div>
  );
};

export default ManagePantry;