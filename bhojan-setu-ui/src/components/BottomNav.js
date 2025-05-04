// src/components/BottomNav.js
import React from 'react';
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import { Home, AddBox, Search, Person } from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';

export default function BottomNav() {
  const [value, setValue] = React.useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (location.pathname === '/') setValue(0);
    else if (location.pathname === '/post') setValue(1);
    else if (location.pathname === '/browse') setValue(2);
    else if (location.pathname === '/profile') setValue(3);
  }, [location]);

  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          switch(newValue) {
            case 0: navigate('/home'); break;
            case 1: navigate('/post'); break;
            case 2: navigate('/browse'); break;
            case 3: navigate('/profile'); break;
            default: navigate('/home');
          }
        }}
      >
        <BottomNavigationAction label="Home" icon={<Home />} />
        <BottomNavigationAction label="Post" icon={<AddBox />} />
        <BottomNavigationAction label="Browse" icon={<Search />} />
        <BottomNavigationAction label="Profile" icon={<Person />} />
      </BottomNavigation>
    </Paper>
  );
}