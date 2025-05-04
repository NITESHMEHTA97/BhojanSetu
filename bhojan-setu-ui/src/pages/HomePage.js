// src/pages/HomePage.js
import React from 'react';
import { Container, Typography, Button, Grid, Paper, Box } from '@mui/material';
import { AddCircle, Search } from '@mui/icons-material';
import FoodCard from '../components/FoodCard';
import StatsCard from '../components/StatsCard';

const sampleFoods = [
  {
    id: 1,
    name: 'Vegetarian Lunch Pack',
    type: 'Vegetarian',
    quantity: 25,
    pickupTime: 'Today, 3:00 PM',
    distance: 1.2,
    image: '/veg-food.jpg'
  },
  {
    id: 2,
    name: 'Sandwich Platter',
    type: 'Vegetarian',
    quantity: 15,
    pickupTime: 'Today, 5:00 PM',
    distance: 2.5,
    image: '/sandwiches.jpg'
  }
];

export default function HomePage() {
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          FoodShare
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Connect caterers with NGOs to reduce food waste
        </Typography>
      </Box>

      <StatsCard 
        totalSaved="1,245 kg" 
        mealsProvided="3,500" 
        co2Reduced="2,100 kg" 
      />

      <Grid container spacing={2} sx={{ my: 2 }}>
        <Grid item xs={6}>
          <Button 
            variant="contained" 
            fullWidth 
            startIcon={<AddCircle />}
            href="/post"
            sx={{ py: 2 }}
          >
            Post Food
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button 
            variant="outlined" 
            fullWidth 
            startIcon={<Search />}
            href="/browse"
            sx={{ py: 2 }}
          >
            Browse
          </Button>
        </Grid>
      </Grid>

      <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
        Recent Donations Nearby
      </Typography>
      
      {sampleFoods.map(food => (
        <FoodCard 
          key={food.id} 
          food={food} 
          onClick={() => window.location.href = `/food/${food.id}`}
        />
      ))}
    </Container>
  );
}