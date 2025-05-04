// src/components/StatsCard.js
import React from 'react';
import { Card, CardContent, Grid, Typography, Box } from '@mui/material';
import { Restaurant, Cloud } from '@mui/icons-material';

export default function StatsCard({ totalSaved, mealsProvided, co2Reduced }) {
  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Your Impact
        </Typography>
        
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="subtitle1">{totalSaved}</Typography>
              <Typography variant="caption">Food Saved</Typography>
            </Box>
          </Grid>
          
          <Grid item xs={4}>
            <Box sx={{ textAlign: 'center' }}>
              <Restaurant color="primary" sx={{ fontSize: 40 }} />
              <Typography variant="subtitle1">{mealsProvided}</Typography>
              <Typography variant="caption">Meals Provided</Typography>
            </Box>
          </Grid>
          
          <Grid item xs={4}>
            <Box sx={{ textAlign: 'center' }}>
              <Cloud color="primary" sx={{ fontSize: 40 }} />
              <Typography variant="subtitle1">{co2Reduced}</Typography>
              <Typography variant="caption">CO₂ Reduced</Typography>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}