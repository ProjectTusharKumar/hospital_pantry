import axios from 'axios';

// Set the base URL for the API
const API_BASE_URL = 'http://localhost:5001/api';

// Function to get the JWT token from local storage
const getToken = () => {
  return localStorage.getItem('token');
};

// Function to set the JWT token in the headers
const setAuthHeaders = () => {
  const token = getToken();
  if (token) {
    return { Authorization: `Bearer ${token}` };
  }
  return {};
};

// Function to handle API requests
const apiRequest = async (method, url, data = null) => {
  try {
    const response = await axios({
      method,
      url: `${API_BASE_URL}${url}`,
      data,
      headers: setAuthHeaders()
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('API request failed');
  }
};

// API functions
export const loginAdmin = (email, password) => {
  return apiRequest('POST', '/admin/login', { email, password });
};

export const registerAdmin = (email, password) => {
  return apiRequest('POST', '/admin/register', { email, password });
};

export const registerPantryStaff = (email, password, name, contactInfo, role) => {
  return apiRequest('POST', '/admin/register-pantry-staff', { email, password, name, contactInfo, role });
};

export const getAllPantryDetails = () => {
  return apiRequest('GET', '/admin/pantry-details');
};

export const registerDeliveryPersonnel = (email, password, name, contactInfo) => {
  return apiRequest('POST', '/admin/register-delivery-personnel', { email, password, name, contactInfo });
};

export const registerPatient = (patientData) => {
  return apiRequest('POST', '/admin/register-patient', patientData);
};

export const getAllPatients = () => {
  return apiRequest('GET', '/admin/patients');
};

export const createDietChart = (dietChartData) => {
  return apiRequest('POST', '/admin/create-diet-chart', dietChartData);
};

export const getAllDietCharts = () => {
  return apiRequest('GET', '/admin/diet-charts');
};

