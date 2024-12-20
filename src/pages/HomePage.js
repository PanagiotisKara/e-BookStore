import React, { useState, useEffect } from 'react';
import ButtonAppBar from '../components/HomeAppBar';
import { Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import background from "../wallpaperflare.com_wallpaper.jpg";

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

export default function Home() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8080/book/getAllBooks")
      .then(res => res.json())
      .then((result) => {
        setBooks(result);
      })
  }, []);

  const bottomBooks = books.slice(0, 10);

  return (
    <div>
      <ButtonAppBar/>
      <div style={{ 
        position: 'absolute', 
        width: '100%', 
        height: '70%', 
        backgroundImage: `url(${background})`,
        backgroundSize: '100% 100%', // Set specific width and height for the background image
        backgroundPosition: 'center', // Centers the background image within the container
        backgroundRepeat: 'no-repeat' // Prevents the background image from repeating
      }}><h1 style={{fontSize:'60px',color:'white', position:'absolute', left:'5%',top:'20%', width:'40%', height:'80%'}}>
        SignUp and<br></br>GET your Subscription or buy<br></br>your Books and<br></br> Video Courses NOW</h1>
      </div>
      <div style={{ 
        position: 'absolute', 
        bottom: '30px', 
        width: '100%', 
        display: 'flex', // Use flexbox for horizontal alignment
        justifyContent: 'center', // Center the books horizontally
        alignItems: 'center', // Center the books vertically
        height: '25%' 
      }}>
        {bottomBooks.map(book => (
          <div key={book.id} style={{ margin: '0 35px', textAlign: 'center' }}>
            <img src={book.thumbnail} alt={book.title} style={{ maxWidth: '80px' }} />
            <p>{book.title}</p>
          </div>
        ))}
      </div>
      <Container maxWidth={false} style={{width: '100%', position: 'fixed', bottom: 0, backgroundColor: '#cda34f'}}>
        <Typography variant="h4" component="h1" gutterBottom>
        </Typography>
        <Copyright />
      </Container>
    </div>
  );
}
