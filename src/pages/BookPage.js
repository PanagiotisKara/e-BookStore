import React from 'react';
import InsideButtonAppBar from '../components/InsideAppBar';
import Book from './Book';
import { Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="/home">
        eBookStore
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function BookP() {
    return (
        <div>
            <InsideButtonAppBar/>
            <Book />
            <Container maxWidth={false} style={{width: '100%',position: 'fixed', bottom: 0,  backgroundColor: '#cda34f',zIndex:'2'}}>
                <Typography variant="h4" component="h1" gutterBottom >
                </Typography>
                <Copyright />
            </Container>
        </div>
    )
}