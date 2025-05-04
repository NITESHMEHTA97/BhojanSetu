import React, { useState } from 'react';
import { Container, Typography, Paper, Box, Tabs, Tab, TextField, Button } from '@mui/material';
import { Person, Business, Restaurant } from '@mui/icons-material';

export default function AuthPage() {
  const [tabValue, setTabValue] = useState(0);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({ 
    name: '', 
    email: '', 
    password: '', 
    role: 'caterer' 
  });

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prev => ({ ...prev, [name]: value }));
  };

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4, textAlign: 'center' }}>
        <Typography variant="h4">FoodShare</Typography>
        <Typography color="text.secondary">Connect to reduce food waste</Typography>
      </Box>
      
      <Paper elevation={3}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange} 
          variant="fullWidth"
          aria-label="auth tabs"
        >
          <Tab label="Login" />
          <Tab label="Register" />
        </Tabs>
        
        {/* Login Tab */}
        <Box sx={{ p: 3, display: tabValue === 0 ? 'block' : 'none' }}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            value={loginData.email}
            onChange={handleLoginChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={loginData.password}
            onChange={handleLoginChange}
            margin="normal"
          />
          <Button 
            variant="contained" 
            fullWidth 
            size="large" 
            sx={{ mt: 2 }}
          >
            Login
          </Button>
        </Box>
        
        {/* Register Tab */}
        <Box sx={{ p: 3, display: tabValue === 1 ? 'block' : 'none' }}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={registerData.name}
            onChange={handleRegisterChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            value={registerData.email}
            onChange={handleRegisterChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={registerData.password}
            onChange={handleRegisterChange}
            margin="normal"
          />
          
          <Box sx={{ my: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              I am a:
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                variant={registerData.role === 'caterer' ? 'contained' : 'outlined'}
                startIcon={<Restaurant />}
                onClick={() => setRegisterData(prev => ({ ...prev, role: 'caterer' }))}
                fullWidth
              >
                Caterer
              </Button>
              <Button
                variant={registerData.role === 'ngo' ? 'contained' : 'outlined'}
                startIcon={<Business />}
                onClick={() => setRegisterData(prev => ({ ...prev, role: 'ngo' }))}
                fullWidth
              >
                NGO
              </Button>
            </Box>
          </Box>
          
          <Button 
            variant="contained" 
            fullWidth 
            size="large" 
            sx={{ mt: 1 }}
          >
            Register
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}