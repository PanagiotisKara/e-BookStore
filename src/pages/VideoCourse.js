import React, { useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import { Pagination } from '@mui/material';
import '../App.css';
import background from "../pic2.jpg";

function Video() {
  const [videos, setVideos] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10; // Now displaying 10 items per page
  const [video,setVideo] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8080/video/getTopRatedVideos")
      .then(res => res.json())
      .then((result) => {
        setVideos(result);
      });
  }, []);

  useEffect(() => {
    fetch("http://127.0.0.1:8080/video/getAllVideos")
      .then(res => res.json())
      .then((result) => {
        setVideo(result);
        setTotalPages(Math.ceil(result.length / itemsPerPage));
      });
  }, []);

  const handleChange = (event, value) => {
    setPage(value);
    window.scrollTo(0, 0);
  };

  const visibleVideos = video.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const addToCart = async (video) => {
    try {
      const response = await fetch('http://localhost:8080/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          bookId: null,
          bookTitle: null,
          thumbnail: null,
          videoCourseId: video.id, // Assuming these fields might be optional or not used
          videoCourseTitle: video.title,
          videoCourseLink: video.link,
          price: video.price,
          quantity: 1,
        })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Video course added to cart:', data);
    } catch (error) {
      console.error('There was an error adding the video course to the cart!', error);
    }
  };

  return (
    <div>
      <div style={{
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        filter: 'blur(0.3em)',
        zIndex: '-1',
        position: 'fixed',
        width: '100%',
        height: '100%',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        scrollBehavior: 'smooth'
      }}></div>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {/* Video Courses Display */}
        <div style={{
          zIndex: '1',
          width: '500px',
          marginTop:'100px',
          alignItems: 'center',
          position: 'relative',
          // Center horizontally
        }}>
          <Stack spacing={2}>
            <ul style={{ listStyleType: 'none', padding: '0', color: 'white' }}>
              {visibleVideos.map(video => (
                <li key={video.id}>
                  <h2>{video.title}</h2>
                  <p><b>Summary:</b> {video.summary}</p>
                  <p><b>Enrollment:</b> {video.enrollment}</p>
                  <p><b>Ratings:</b> {video.rating}</p>
                  <p><b>Stars:</b> {video.stars}</p>
                  <p><b>Price:</b> {video.price}</p>
                  <button type="button" style={{ backgroundColor: 'blue', color: 'white', marginBottom: '10px' }} onClick={() => addToCart(video)}>ADD TO CART</button>
                  <hr />
                </li>
              ))}
            </ul>
          </Stack>
          <br />
          <Pagination
            style={{ display: 'flex', justifyContent: 'center' }}
            sx={{ '& .MuiPaginationItem-root': { color: 'white' } }}
            count={totalPages}
            page={page}
            onChange={handleChange}
          />
          <br />
          <br />
          <br />
        </div>
      </div>

      {/* Video Courses Sidebar */}
      <div style={{
        width: '200px',
        padding: '20px',
        background: 'rgba(255, 255, 255, 0.8)',
        zIndex: '1',
        overflowY: 'scroll',
        maxHeight: 'calc(100vh - 40px)',
        position: 'fixed',
        right: '0',
        top: '30px'
      }}>
        <h3>Top Rated Video Courses</h3>
        <ul style={{ listStyleType: 'none', padding: '0', color: 'black' }}>
          {videos.slice(0, 100).map(video => (
            <li key={video.id}>
              <p><b>Title:</b> {video.title}</p>
              <p><b>Rating:</b> {video.rating}</p>
              <p><b>Stars:</b> {video.stars}</p>
              <hr />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Video;
