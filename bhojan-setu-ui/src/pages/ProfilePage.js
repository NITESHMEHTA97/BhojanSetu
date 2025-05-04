import React from 'react';
import { 
  Container, 
  Typography, 
  Avatar, 
  Paper, 
  Box, 
  Tabs, 
  Tab, 
  Button,
  Divider
} from '@mui/material';
import { Person, History, Favorite, Settings, ExitToApp } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

export default function ProfilePage() {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSignOut = () => {
    // In a real app, you would:
    // 1. Clear authentication tokens from storage
    // 2. Clear user data from context/redux
    // 3. Call backend API to invalidate session if needed
    console.log('User signed out');
    
    // Redirect to login page
    navigate('/');
  };

  const user = {
    name: 'Green Catering Co.',
    role: 'Food Caterer',
    email: 'contact@greencatering.com',
    avatar: '/images/avatar.jpg',
    stats: {
      donations: 24,
      saved: '1,245 kg',
      rating: 4.5
    }
  };

  const [openDialog, setOpenDialog] = useState(false);

  return (
    <Container maxWidth="sm">
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', my: 3 }}>
        <Avatar
          src={user.avatar}
          sx={{ width: 100, height: 100, mb: 2 }}
        />
        <Typography variant="h5">{user.name}</Typography>
        <Typography color="text.secondary">{user.role}</Typography>
        
        <Box sx={{ display: 'flex', gap: 3, my: 2 }}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h6">{user.stats.donations}</Typography>
            <Typography variant="caption">Donations</Typography>
          </Box>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h6">{user.stats.saved}</Typography>
            <Typography variant="caption">Food Saved</Typography>
          </Box>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h6">{user.stats.rating}</Typography>
            <Typography variant="caption">Rating</Typography>
          </Box>
        </Box>
        
        <Button variant="outlined" sx={{ mb: 2 }}>
          Edit Profile
        </Button>

        {/* Sign Out Button */}
        <Button 
          onClick={() => setOpenDialog(true)}>
           Sign Out
        </Button>

        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
          <DialogTitle>Confirm Sign Out</DialogTitle>
          <DialogContent>
            <Typography>Are you sure you want to sign out?</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
            <Button onClick={handleSignOut} color="error">Sign Out</Button>
          </DialogActions>
        </Dialog>
      </Box>

      <Paper elevation={3}>
        <Tabs 
          value={value} 
          onChange={handleChange} 
          variant="fullWidth"
          aria-label="profile tabs"
        >
          <Tab icon={<History />} label="Activity" />
          <Tab icon={<Favorite />} label="Favorites" />
          <Tab icon={<Settings />} label="Settings" />
        </Tabs>
        
        <TabPanel value={value} index={0}>
          <Typography>Your recent donations and claims will appear here</Typography>
        </TabPanel>
        
        <TabPanel value={value} index={1}>
          <Typography>Your saved NGOs and frequent partners</Typography>
        </TabPanel>
        
        <TabPanel value={value} index={2}>
          <Typography>Account settings and preferences</Typography>
          <Divider sx={{ my: 2 }} />
          <Button 
            variant="outlined" 
            color="error" 
            startIcon={<ExitToApp />}
            onClick={handleSignOut}
            sx={{ mt: 2 }}
          >
            Sign Out
          </Button>
        </TabPanel>
      </Paper>
    </Container>
  );
}