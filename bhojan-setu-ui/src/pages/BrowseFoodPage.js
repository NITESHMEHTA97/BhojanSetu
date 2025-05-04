// src/pages/BrowseFoodPage.js
import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Grid, Paper, Box, Chip } from '@mui/material';
import { Search, FilterList, LocationOn } from '@mui/icons-material';
import FoodCard from '../components/FoodCard';

const sampleFoods = [
  // ... same as in HomePage plus more samples
];

const foodTypeFilters = ['All', 'Vegetarian', 'Vegan', 'Non-vegetarian', 'Gluten-free'];

export default function BrowseFoodPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [distanceFilter, setDistanceFilter] = useState(5);

  const filteredFoods = sampleFoods.filter(food => {
    const matchesSearch = food.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         food.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'All' || food.type === selectedType;
    const matchesDistance = food.distance <= distanceFilter;
    
    return matchesSearch && matchesType && matchesDistance;
  });

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom sx={{ mt: 2 }}>
        Available Donations
      </Typography>
      
      <Box sx={{ display: 'flex', mb: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search food donations..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: <Search sx={{ mr: 1 }} />,
          }}
        />
        <Button variant="outlined" sx={{ ml: 1 }}>
          <FilterList />
        </Button>
      </Box>
      
      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle2" gutterBottom>
          Food Type:
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {foodTypeFilters.map(type => (
            <Chip
              key={type}
              label={type}
              onClick={() => setSelectedType(type)}
              color={selectedType === type ? 'primary' : 'default'}
            />
          ))}
        </Box>
      </Box>
      
      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle2" gutterBottom>
          Distance: Up to {distanceFilter} km
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <LocationOn sx={{ mr: 1 }} />
          <input
            type="range"
            min="1"
            max="20"
            value={distanceFilter}
            onChange={(e) => setDistanceFilter(parseInt(e.target.value))}
            style={{ flexGrow: 1 }}
          />
        </Box>
      </Box>
      
      {filteredFoods.length > 0 ? (
        filteredFoods.map(food => (
          <FoodCard 
            key={food.id} 
            food={food} 
            onClick={() => window.location.href = `/food/${food.id}`}
          />
        ))
      ) : (
        <Paper sx={{ p: 3, textAlign: 'center' }}>
          <Typography>No food donations match your filters</Typography>
        </Paper>
      )}
    </Container>
  );
}