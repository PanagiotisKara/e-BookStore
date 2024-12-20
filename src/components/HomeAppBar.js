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
import { ChevronRight } from '@mui/icons-material';
import LoginIcon from '@mui/icons-material/Login';



const theme = createTheme({
  palette: {
    primary: {
      main: "#cda34f"
    }
  }
});

export default function ButtonAppBar() {
  const navigate = useNavigate()
  return (
    <Box style={{width: '100%',position: 'fixed', top: 0,  backgroundColor: '#cda34f', zIndex: '1'}}>
      <ThemeProvider theme={theme}>
      <AppBar position="static" className="basics-appbar">
        <Toolbar>
          
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <img onClick={() => navigate('/home')} src={require('../logoBlanc.png')} alt='logo' width={200} height={20}/>
          
          </Typography>
          
          
          <Button onClick={() => navigate('/signin')} color="inherit"><LoginIcon/></Button>
        </Toolbar>
              </AppBar>
      </ThemeProvider>
    </Box>
  );
}
