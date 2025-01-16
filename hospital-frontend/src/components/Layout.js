import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Box, Drawer, CssBaseline, AppBar, Toolbar, List, Typography, Divider, ListItem, ListItemButton, ListItemText, Button } from '@mui/material';
import ManagePatients from './ManagePatients';
import CreateDietChart from './CreateDietChart';
import ManagePantry from './ManagePantry';
import TrackMealPreparation from './TrackMealPreparation';

const drawerWidth = 240;

const Layout = ({ children }) => {
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    if (storedRole) {
      setRole(storedRole);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/');
  };

  const getMenuItems = () => {
    switch (role) {
      case 'admin':
        return [
          { text: 'Dashboard', path: '/admin' },
          { text: 'Manage Patients', path: '/admin/manage-patients' },
          { text: 'Create Diet Chart', path: '/admin/create-diet-chart' },
          { text: 'Manage Pantry', path: '/admin/manage-pantry' },
          { text: 'Track Meal Preparation', path: '/admin/track-meal-preparation' },
          { text: 'All Patients', path: '/admin/all-patients' },
          { text: 'Track Deliveries', path: '/admin/track-deliveries' },
          { text: 'View Diet Charts', path: '/admin/view-diet-charts' },
          { text: 'Monitor Pantry', path: '/admin/monitor-pantry' }
        ];
      case 'Pantry_Staff':
        return [
          { text: 'Dashboard', path: '/pantry' },
          { text: 'Manage Pantry', path: '/pantry/manage-pantry' },
          { text: 'Diet Charts', path: '/pantry/diet-charts' },
          { text: 'Monitor Deliveries', path: '/pantry/monitor-deliveries' }
        ];
      case 'Delivery_person':
        return [
          { text: 'Dashboard', path: '/delivery' },
          { text: 'Manage Deliveries', path: '/delivery/manage-deliveries' },
          { text: 'View Assigned Deliveries', path: '/delivery/view-assigned-deliveries' }
        ];
      default:
        return [];
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Hospital Dashboard
          </Typography>
          <Button color="inherit" onClick={handleLogout} sx={{ marginLeft: 'auto' }}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />
        <List>
          {getMenuItems().map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton component={Link} to={item.path}>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}>
        <Toolbar />
        {role === 'admin' && (
          <>
            <ManagePatients />
            <CreateDietChart />
            <ManagePantry />
            <TrackMealPreparation />
          </>
        )}
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
