// src/pages/PostFoodPage.js
import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Grid, MenuItem, Paper, Box } from '@mui/material';
import { PhotoCamera, Schedule, LocationOn } from '@mui/icons-material';

const foodTypes = [
  'Vegetarian',
  'Vegan',
  'Non-vegetarian',
  'Gluten-free',
  'Desserts',
  'Other'
];

export default function PostFoodPage() {
  const [formData, setFormData] = useState({
    foodType: '',
    quantity: '',
    description: '',
    preparationTime: '',
    expiryTime: '',
    location: '',
    specialInstructions: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here you would typically send the data to your backend
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom sx={{ mt: 2 }}>
        Post Available Food
      </Typography>
      
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                select
                fullWidth
                label="Food Type"
                name="foodType"
                value={formData.foodType}
                onChange={handleChange}
                required
              >
                {foodTypes.map(type => (
                  <MenuItem key={type} value={type}>{type}</MenuItem>
                ))}
              </TextField>
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Quantity (servings)"
                name="quantity"
                type="number"
                value={formData.quantity}
                onChange={handleChange}
                required
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                multiline
                rows={2}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Preparation Time"
                name="preparationTime"
                type="datetime-local"
                InputLabelProps={{ shrink: true }}
                value={formData.preparationTime}
                onChange={handleChange}
                required
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Expiry/Pickup Deadline"
                name="expiryTime"
                type="datetime-local"
                InputLabelProps={{ shrink: true }}
                value={formData.expiryTime}
                onChange={handleChange}
                required
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Special Instructions"
                name="specialInstructions"
                value={formData.specialInstructions}
                onChange={handleChange}
                multiline
                rows={2}
              />
            </Grid>
            
            <Grid item xs={12}>
              <Button
                variant="contained"
                component="label"
                startIcon={<PhotoCamera />}
                fullWidth
                sx={{ mb: 2 }}
              >
                Upload Photo
                <input type="file" hidden accept="image/*" />
              </Button>
            </Grid>
            
            <Grid item xs={12}>
              <Button 
                type="submit" 
                variant="contained" 
                color="primary" 
                fullWidth
                size="large"
              >
                Post for NGOs
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}