import React, { useState, useEffect } from 'react';
import { getAllPatients, registerPatient } from '../utils/middleware';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ManagePatients = () => {
  const [patients, setPatients] = useState([]);
  const [newPatient, setNewPatient] = useState({
    name: '',
    diseases: '',
    allergies: '',
    roomNumber: '',
    bedNumber: '',
    floorNumber: '',
    age: '',
    gender: '',
    contactInfo: '',
    emergencyContact: ''
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

  const handleRegisterPatient = async () => {
    if (Object.values(newPatient).some(field => field === '')) {
      toast.error('All fields are required');
      return;
    }

    try {
      await registerPatient(newPatient);
      fetchPatients();
      setNewPatient({
        name: '',
        diseases: '',
        allergies: '',
        roomNumber: '',
        bedNumber: '',
        floorNumber: '',
        age: '',
        gender: '',
        contactInfo: '',
        emergencyContact: ''
      });
      toast.success('Patient registered successfully');
    } catch (error) {
      console.error('Error registering patient:', error);
      toast.error('Error registering patient');
    }
  };

  return (
    <div className="p-4">
      <ToastContainer />
      <h2 className="text-2xl font-bold mb-4">Manage Patients</h2>
      <ul className="mb-4">
        {patients.map(patient => (
          <li key={patient._id} className="mb-2 p-2 border rounded shadow">
            {patient.name} - Room {patient.roomNumber}
          </li>
        ))}
      </ul>
      <div className="p-4 border rounded shadow">
        <h3 className="text-xl font-semibold mb-4">Register New Patient</h3>
        <div className="grid grid-cols-1 gap-4 mb-4">
          <input
            type="text"
            placeholder="Name"
            value={newPatient.name}
            onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })}
            className="p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Diseases"
            value={newPatient.diseases}
            onChange={(e) => setNewPatient({ ...newPatient, diseases: e.target.value })}
            className="p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Allergies"
            value={newPatient.allergies}
            onChange={(e) => setNewPatient({ ...newPatient, allergies: e.target.value })}
            className="p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Room Number"
            value={newPatient.roomNumber}
            onChange={(e) => setNewPatient({ ...newPatient, roomNumber: e.target.value })}
            className="p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Bed Number"
            value={newPatient.bedNumber}
            onChange={(e) => setNewPatient({ ...newPatient, bedNumber: e.target.value })}
            className="p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Floor Number"
            value={newPatient.floorNumber}
            onChange={(e) => setNewPatient({ ...newPatient, floorNumber: e.target.value })}
            className="p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Age"
            value={newPatient.age}
            onChange={(e) => setNewPatient({ ...newPatient, age: e.target.value })}
            className="p-2 border rounded"
          />
          <div className="flex items-center">
            <label className="mr-4">Gender:</label>
            <label className="mr-2">
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={newPatient.gender === 'Male'}
                onChange={(e) => setNewPatient({ ...newPatient, gender: e.target.value })}
              />
              Male
            </label>
            <label className="mr-2">
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={newPatient.gender === 'Female'}
                onChange={(e) => setNewPatient({ ...newPatient, gender: e.target.value })}
              />
              Female
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="Other"
                checked={newPatient.gender === 'Other'}
                onChange={(e) => setNewPatient({ ...newPatient, gender: e.target.value })}
              />
              Other
            </label>
          </div>
          <input
            type="text"
            placeholder="Contact Info"
            value={newPatient.contactInfo}
            onChange={(e) => setNewPatient({ ...newPatient, contactInfo: e.target.value })}
            className="p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Emergency Contact"
            value={newPatient.emergencyContact}
            onChange={(e) => setNewPatient({ ...newPatient, emergencyContact: e.target.value })}
            className="p-2 border rounded"
          />
        </div>
        <button
          onClick={handleRegisterPatient}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Register Patient
        </button>
      </div>
    </div>
  );
};

export default ManagePatients;
