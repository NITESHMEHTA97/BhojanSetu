// src/pages/FoodDetailPage.js
import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Button, Grid, Paper, Box, Chip, Avatar, Divider } from '@mui/material';
import { AccessTime, LocationOn, Fastfood, People, Person, Phone, Email } from '@mui/icons-material';

const sampleFoods = [
  // ... same as before plus more details
];

export default function FoodDetailPage() {
  const { id } = useParams();
  const food = sampleFoods.find(f => f.id === parseInt(id)) || sampleFoods[0];
  const caterer = {
    name: 'Green Catering Co.',
    rating: 4.5,
    contact: '+1 555-123-4567',
    email: 'contact@greencatering.com',
    avatar: '/caterer-avatar.jpg'
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom sx={{ mt: 2 }}>
        {food.name}
      </Typography>
      
      <Box sx={{ mb: 3 }}>
        <img 
          src={food.image} 
          alt={food.name} 
          style={{ width: '100%', borderRadius: '8px', maxHeight: '300px', objectFit: 'cover' }} 
        />
      </Box>
      
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={6}>
          <Chip icon={<Fastfood />} label={food.type} sx={{ width: '100%' }} />
        </Grid>
        <Grid item xs={6}>
          <Chip icon={<People />} label={`${food.quantity} servings`} sx={{ width: '100%' }} />
        </Grid>
      </Grid>
      
      <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Details
        </Typography>
        <Typography variant="body1" paragraph>
          {food.description || 'Freshly prepared food available for donation.'}
        </Typography>
        
        <Divider sx={{ my: 2 }} />
        
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <AccessTime sx={{ mr: 1, color: 'text.secondary' }} />
          <Typography variant="body1">
            <strong>Prepared:</strong> {food.preparationTime}
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <AccessTime sx={{ mr: 1, color: 'text.secondary' }} />
          <Typography variant="body1">
            <strong>Pickup by:</strong> {food.expiryTime}
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <LocationOn sx={{ mr: 1, color: 'text.secondary' }} />
          <Typography variant="body1">
            <strong>Location:</strong> {food.location || '123 Main St, City'}
          </Typography>
        </Box>
      </Paper>
      
      <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Caterer Information
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar src={caterer.avatar} sx={{ mr: 2 }} />
          <Box>
            <Typography variant="subtitle1">{caterer.name}</Typography>
            <Typography variant="body2" color="text.secondary">
              ★ {caterer.rating} (24 reviews)
            </Typography>
          </Box>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Phone sx={{ mr: 1, color: 'text.secondary' }} />
          <Typography variant="body1">{caterer.contact}</Typography>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Email sx={{ mr: 1, color: 'text.secondary' }} />
          <Typography variant="body1">{caterer.email}</Typography>
        </Box>
      </Paper>
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Button variant="outlined" size="large" sx={{ flex: 1, mr: 1 }}>
          Message
        </Button>
        <Button variant="contained" size="large" sx={{ flex: 1, ml: 1 }}>
          Claim Donation
        </Button>
      </Box>
      
      <Typography variant="body2" color="text.secondary" align="center">
        By claiming, you agree to pick up the food within the specified time window.
      </Typography>
    </Container>
  );
}