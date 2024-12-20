import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';
import SwipeableDrawer from '@mui/material';
import Divider from '@mui/material';
import { ChevronRight, Opacity } from '@mui/icons-material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useState } from 'react';
import zIndex from '@mui/material/styles/zIndex';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import SlowMotionVideoIcon from '@mui/icons-material/SlowMotionVideo';
import LogoutIcon from '@mui/icons-material/Logout';


const theme = createTheme({
  palette: {
    primary: {
      main: "#cda34f"
    }
  }
});



export default function InsideButtonAppBar() {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const clearCart = async () => {
    try {
        const response = await fetch('/api/cart/clear', {
            method: 'DELETE'
        });
        if (response.ok) {
            console.log('Cart cleared successfully');
            // Optionally, update your UI to reflect that the cart is cleared
        } else {
            console.log('Failed to clear cart');
            // Handle error scenario
        }
    } catch (error) {
        console.error('Error occurred while clearing cart:', error);
    }
  };

  const handleClick = () => {
    navigate('/home'); // Navigate to the specified route
    clearCart(); // Call the function to clear the cart
  };

  return (
    <Box style={{width: '100%',position: 'fixed', top: 0,  backgroundColor: '#cda34f', zIndex: '2'}}>
      <ThemeProvider theme={theme}>
      <AppBar position="static" className="basics-appbar">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleMenu}
            onMouseEnter={(e) => { e.target.style.backgroundColor = '#e9e7da' }} // Change background color on hover
              onMouseLeave={(e) => { e.target.style.backgroundColor = '#cda34f' }}
          >
            <MenuIcon />
          </IconButton>
          {isOpen && (
        <div style={{width:'180px', height: '800px', position: 'absolute', top: '70px', left: '0px', border: 'none', padding: '5px' }}>
          <ul style={{width: '100%'}}>
          <button
              onClick={() => navigate('/books')} 
              style={{
                width: '70%',
                position: 'absolute',
                top: '10px',
                right: '50px',
                backgroundColor: '#cda34f', // Default background color
                color: 'black', // Default text color
                fontSize: '20px',
                textAlign: 'center',
                border: 'none', // Remove default button border
                padding: '10px', // Add some padding for better appearance
                cursor: 'pointer', // Change cursor to pointer on hover
                transition: 'background-color 0.3s', // Add smooth transition for background color change
                borderRadius: '12px',
                marginBottom: '20px',
              }}
              onMouseEnter={(e) => { e.target.style.backgroundColor = 'white' }} // Change background color on hover
              onMouseLeave={(e) => { e.target.style.backgroundColor = '#cda34f' }} // Restore background color when not hovered
            ><MenuBookIcon/>
              <b>  Books</b>
            </button>
            <button 
              onClick={() => navigate('/videos')}
              style={{
                width: '70%',
                position: 'absolute',
                top: '60px',
                right: '50px',
                backgroundColor: '#cda34f', // Default background color
                color: 'black', // Default text color
                fontSize: '20px',
                border: 'none', // Remove default button border
                padding: '10px', // Add some padding for better appearance
                cursor: 'pointer', // Change cursor to pointer on hover
                transition: 'background-color 0.3s', // Add smooth transition for background color change
                borderRadius: '12px',
                marginBottom: '20px',
              }}
              onMouseEnter={(e) => { e.target.style.backgroundColor = 'white' }} // Change background color on hover
              onMouseLeave={(e) => { e.target.style.backgroundColor = '#cda34f' }} // Restore background color when not hovered
            > <SlowMotionVideoIcon/>
              <b>  Videos</b>
            </button>
            <button 
                onClick={handleClick}
                style={{
                width: '70%',
                position: 'absolute',
                bottom: '10px',
                right: '50px',
                backgroundColor: 'white', // Default background color
                color: 'black', // Default text color
                fontSize: '15px',
                border: 'none', // Remove default button border
                padding: '10px', // Add some padding for better appearance
                cursor: 'pointer', // Change cursor to pointer on hover
                transition: 'background-color 0.3s', // Add smooth transition for background color change
                borderRadius: '12px',
                marginBottom: '20px',
              }}
              onMouseEnter={(e) => { e.target.style.backgroundColor = '#cda34f' }} // Change background color on hover
              onMouseLeave={(e) => { e.target.style.backgroundColor = 'white' }}
            ><LogoutIcon/></button>
          </ul>
        </div>
      )}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <img onClick={() => navigate('/home')} src={require('../logoBlanc.png')} alt='logo' width={200} height={20}/>
          
          </Typography>
          
          
          <Button style={{color: 'black', borderRadius:'50px'}} onClick={() => navigate('/cart')}
            onMouseEnter={(e) => { e.target.style.backgroundColor = '#e9e7da' }} // Change background color on hover
            onMouseLeave={(e) => { e.target.style.backgroundColor = '#cda34f' }}
          ><ShoppingCartIcon /></Button>
        </Toolbar>
              </AppBar>
      </ThemeProvider>
    </Box>
  );
}
