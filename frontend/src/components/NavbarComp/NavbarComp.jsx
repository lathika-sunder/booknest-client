import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import booknestLogo from '../../assets/images/booknest.jpg'; // Adjust the path as needed

const NavbarComp = () => {
  const role = localStorage.getItem('role');

  return (
    <AppBar position="static" sx={{backgroundColor:"white"}}>
      <Toolbar>
        <IconButton edge="start"  aria-label="logo">
          <img src={booknestLogo} alt="BookNest Logo" style={{ width: 40, height: 40 }} />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          BookNest
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {role === 'admin' ? (
            <>
              <MenuItem component={Link} to="/home/admin" sx={{color:'black'}}>Users</MenuItem>
              <MenuItem component={Link} to="/home/books" sx={{color:'black'}}>Books</MenuItem>
              <MenuItem component={Link} to="/home/books/dues" sx={{color:'black'}}>Dues</MenuItem>
            </>
          ) : role === 'user' ? (
            <MenuItem component={Link} to="/history" sx={{color:'black'}}>History</MenuItem>
          ) : null}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavbarComp;
