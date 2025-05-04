import React from 'react';
import { Container, Typography, Avatar, Paper, Box, Tabs, Tab, Button } from '@mui/material';
import { Person, History, Favorite, Settings, Restaurant } from '@mui/icons-material';

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

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const user = {
    name: 'Green Catering Co.',
    role: 'Food Caterer',
    email: 'contact@greencatering.com',
    avatar: '/caterer-avatar.jpg',
    stats: {
      donations: 24,
      saved: '1,245 kg',
      rating: 4.5
    }
  };

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
        
        <Button variant="outlined" sx={{ mb: 3 }}>
          Edit Profile
        </Button>
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
        </TabPanel>
      </Paper>
    </Container>
  );
}