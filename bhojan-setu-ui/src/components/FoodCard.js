// src/components/FoodCard.js
import React from 'react';
import { Card, CardContent, CardMedia, Typography, Chip, Stack, Box } from '@mui/material';
import { AccessTime, LocationOn, Fastfood, People } from '@mui/icons-material';

export default function FoodCard({ food, onClick }) {
  return (
    <Card sx={{ mb: 2, cursor: 'pointer' }} onClick={onClick}>
      <CardMedia
        component="img"
        height="140"
        image={food.image || '/placeholder-food.jpg'}
        alt={food.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {food.name}
        </Typography>
        
        <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
          <Chip icon={<Fastfood />} label={food.type} size="small" />
          <Chip icon={<People />} label={`${food.quantity} servings`} size="small" />
        </Stack>
        
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <AccessTime sx={{ mr: 1, fontSize: '16px' }} />
          <Typography variant="body2">Pickup by: {food.pickupTime}</Typography>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <LocationOn sx={{ mr: 1, fontSize: '16px' }} />
          <Typography variant="body2">{food.distance} km away</Typography>
        </Box>
      </CardContent>
    </Card>
  );
}