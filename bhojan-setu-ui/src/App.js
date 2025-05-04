// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import HomePage from './pages/HomePage';
import PostFoodPage from './pages/PostFoodPage';
import BrowseFoodPage from './pages/BrowseFoodPage';
import FoodDetailPage from './pages/FoodDetailPage';
import ProfilePage from './pages/ProfilePage';
import AuthPage from './pages/AuthPage';
import BottomNav from './components/BottomNav';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4CAF50', // Green
    },
    secondary: {
      main: '#FF9800', // Orange
    },
    background: {
      default: '#f5f5f5',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div style={{ paddingBottom: '56px' }}> {/* Space for bottom nav */}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/post" element={<PostFoodPage />} />
            <Route path="/browse" element={<BrowseFoodPage />} />
            <Route path="/food/:id" element={<FoodDetailPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/auth" element={<AuthPage />} />
          </Routes>
        </div>
        <BottomNav />
      </Router>
    </ThemeProvider>
  );
}

export default App;