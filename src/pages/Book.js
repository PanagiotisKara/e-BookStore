import React, { useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import { Pagination } from '@mui/material';
import '../App.css';
import TextWrapper from './TextWrapper.js';
import background from "../download.jpg";

function Book() {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const itemsPerPage = 10;

  const addToCart = async (book) => {
    try {
      const response = await fetch('http://localhost:8080/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          bookId: book.id,
          bookTitle: book.title,
          thumbnail: book.thumbnail,
          videoCourseId: null,
          videoCourseTitle: null,
          videoCourseLink: null,
          price: book.price,
          quantity: 1,
        })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Book added to cart:', data);
    } catch (error) {
      console.error('There was an error adding the book to the cart!', error);
    }
  };

  useEffect(() => {
    fetch("http://127.0.0.1:8080/book/getAllBooksByTitle")
      .then(res => res.json())
      .then((result) => {
        setBooks(result);
        setTotalPages(Math.ceil(result.length / itemsPerPage));
      });

      fetch("http://127.0.0.1:8080/book/categories")
      .then(res => res.json())
      .then((categories) => {
        console.log("Categories:", categories); // Check the value of categories
        setCategories(categories);
      })
      .catch(error => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  const handleChange = (e, p) => {
    console.log(e, p);
    setPage(p);
    window.scrollTo(0, 0);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setPage(1); // Reset to the first page
    const filteredBooks = category
      ? books.filter(book => book.categories && book.categories.includes(category))
      : books;
    setTotalPages(Math.ceil(filteredBooks.length / itemsPerPage));
  };

  const filteredBooks = selectedCategory
    ? books.filter(book => book.categories && book.categories.includes(selectedCategory))
    : books;

  const visibleBooks = filteredBooks.slice((page - 1) * itemsPerPage, page * itemsPerPage);

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

      <div style={{ display: 'flex', justifyContent: 'center' }}> {/* Center the books div horizontally */}
        {/* Books Display */}
        <div style={{
          zIndex: '1',
          width: '500px',
          alignItems: 'center',
          marginTop:'100px',
          position: 'relative'
           // Center horizontally
        }}>
          <Stack spacing={2}>
            <ul style={{ listStyleType: 'none', padding: '0', color: 'white' }}>
              {visibleBooks.map(book => (
                <li key={book.id}>
                  <h2>{book.title}</h2>
                  <img src={book.thumbnail} alt={book.title} style={{ maxWidth: '100px' }} />
                  <p><b>Author(s):</b> {book.authors}</p>
                  <p><b>Categories:</b> {book.categories}</p>
                  <p><b>Published Year:</b> {book.published_year}</p>
                  <TextWrapper text={book.description} maxLength={100} />
                  <p><b>Price:</b> {book.price}</p>
                  <p><b>Average Rating:</b> {book.average_rating}</p>
                  <button type="button" style={{ backgroundColor: 'blue', color: 'white', marginBottom: '10px' }} onClick={() => addToCart(book)}>ADD TO CART</button>
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

      {/* Categories Sidebar */}
      <div style={{
        width: '200px',
        padding: '20px',
        background: 'rgba(255, 255, 255, 0.8)',
        zIndex: '1',
        overflowY: 'scroll', // Enable vertical scrolling
        maxHeight: 'calc(100vh - 40px)', // Adjusted to fit within the viewport
        position: 'fixed', // Change to absolute positioning
        right: '0', // Positioned at the right side of the books div
        top: '30px' // Positioned at the top of the books div
      }}>
        <h3>Categories</h3>
        <ul style={{ listStyleType: 'none', padding: '0' }}>
          {categories.map(category => (
            <li key={category}>
              <button onClick={() => handleCategoryChange(category)}>
                {category}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Book;
