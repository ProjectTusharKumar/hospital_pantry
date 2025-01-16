import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, TextField, List, ListItem, ListItemText, Divider } from '@mui/material';

const Pantry = () => {
  const [mealTasks, setMealTasks] = useState([]);
  const [deliveryPersonnel, setDeliveryPersonnel] = useState([]);
  const [newPersonnel, setNewPersonnel] = useState({ name: '', contactInfo: '', otherDetails: '' });
  const [mealDeliveries, setMealDeliveries] = useState([]);

  useEffect(() => {
    // Fetch initial data for meal tasks, delivery personnel, and meal deliveries
    // This is just a placeholder, replace with actual API calls
    setMealTasks([
      { id: 1, task: 'Prepare breakfast for Room 101', status: 'Pending' },
      { id: 2, task: 'Prepare lunch for Room 102', status: 'Pending' },
    ]);
    setDeliveryPersonnel([
      { id: 1, name: 'John Doe', contactInfo: '1234567890', otherDetails: 'Experienced' },
    ]);
    setMealDeliveries([
      { id: 1, patient: 'Patient A', roomNumber: '101', dietChart: 'Low Sodium', status: 'Pending' },
    ]);
  }, []);

  const handleUpdateTaskStatus = (taskId, status) => {
    setMealTasks(mealTasks.map(task => task.id === taskId ? { ...task, status } : task));
  };

  const handleAddPersonnel = () => {
    setDeliveryPersonnel([...deliveryPersonnel, { ...newPersonnel, id: deliveryPersonnel.length + 1 }]);
    setNewPersonnel({ name: '', contactInfo: '', otherDetails: '' });
  };

  const handleAssignMealBox = (personnelId, mealBoxId) => {
    // Assign meal box to delivery personnel
    // This is just a placeholder, replace with actual logic
    console.log(`Assigned meal box ${mealBoxId} to personnel ${personnelId}`);
  };

  const handleUpdateDeliveryStatus = (deliveryId, status) => {
    setMealDeliveries(mealDeliveries.map(delivery => delivery.id === deliveryId ? { ...delivery, status } : delivery));
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Pantry Dashboard</Typography>

      <Typography variant="h6" gutterBottom>Manage Food Preparation Tasks</Typography>
      <List>
        {mealTasks.map(task => (
          <ListItem key={task.id}>
            <ListItemText primary={task.task} secondary={`Status: ${task.status}`} />
            <Button variant="contained" onClick={() => handleUpdateTaskStatus(task.id, 'Completed')}>Mark as Completed</Button>
          </ListItem>
        ))}
      </List>
      <Divider sx={{ my: 2 }} />

      <Typography variant="h6" gutterBottom>Manage Delivery Personnel</Typography>
      <Box component="form" sx={{ mb: 2 }}>
        <TextField
          label="Name"
          value={newPersonnel.name}
          onChange={(e) => setNewPersonnel({ ...newPersonnel, name: e.target.value })}
          sx={{ mr: 2 }}
        />
        <TextField
          label="Contact Info"
          value={newPersonnel.contactInfo}
          onChange={(e) => setNewPersonnel({ ...newPersonnel, contactInfo: e.target.value })}
          sx={{ mr: 2 }}
        />
        <TextField
          label="Other Details"
          value={newPersonnel.otherDetails}
          onChange={(e) => setNewPersonnel({ ...newPersonnel, otherDetails: e.target.value })}
          sx={{ mr: 2 }}
        />
        <Button variant="contained" onClick={handleAddPersonnel}>Add Personnel</Button>
      </Box>
      <List>
        {deliveryPersonnel.map(personnel => (
          <ListItem key={personnel.id}>
            <ListItemText primary={personnel.name} secondary={`Contact: ${personnel.contactInfo}, Details: ${personnel.otherDetails}`} />
            <Button variant="contained" onClick={() => handleAssignMealBox(personnel.id, 1)}>Assign Meal Box</Button>
          </ListItem>
        ))}
      </List>
      <Divider sx={{ my: 2 }} />

      <Typography variant="h6" gutterBottom>Track Meal Deliveries</Typography>
      <List>
        {mealDeliveries.map(delivery => (
          <ListItem key={delivery.id}>
            <ListItemText primary={`Patient: ${delivery.patient}, Room: ${delivery.roomNumber}, Diet: ${delivery.dietChart}`} secondary={`Status: ${delivery.status}`} />
            <Button variant="contained" onClick={() => handleUpdateDeliveryStatus(delivery.id, 'Delivered')}>Mark as Delivered</Button>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Pantry;
