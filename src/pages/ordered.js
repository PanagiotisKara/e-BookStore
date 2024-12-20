import React, { useState, useEffect } from 'react';
import './cart.css';
import { useNavigate } from 'react-router-dom';

export default function Ordered() {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");

  useEffect(() => {
    fetchCartData();
  }, []);

  useEffect(() => {
    calculateTotalPrice();
  }, [cartItems]);

  const fetchCartData = async () => {
    try {
      const response = await fetch('/api/cart'); // Update the endpoint to match your backend
      if (response.ok) {
        const data = await response.json();
        setCartItems(data);
      } else {
        console.error('Failed to fetch cart data');
      }
    } catch (error) {
      console.error('Error occurred while fetching cart data:', error);
    }
  };

  const handleDelete = async (cartId) => {
    try {
      const response = await fetch(`/api/cart/${cartId}`, { method: 'DELETE' });
      if (response.ok) {
        // Update the cart items in the state after deletion
        setCartItems(cartItems.filter(item => item.cartId !== cartId));
      } else {
        console.error('Failed to delete cart item');
      }
    } catch (error) {
      console.error('Error occurred while deleting cart item:', error);
    }
  };

  const calculateTotalPrice = () => {
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotalPrice(total);
  };

  const shippingCost = totalPrice === 0 ? 0 : 3.99;

  const handleClick = () => {
    navigate('/books'); // Navigate to the specified route
    clearCart(); // Call the function to clear the cart
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

  return (
    <section className="h-100 h-custom" style={{ backgroundColor: '#eee' }}>
      <div className="container py-5 h-100">
        <div className="row justify-content-center align-items-center h-100">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-7">
                    <h5 onClick={handleClick}>
                      <a href="#!" className="card-link">
                        <i className="fas fa-long-arrow-alt-left me-2"></i> BACK TO HOME
                      </a>
                    </h5>

                    <hr />

                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <div>
                        <h2 className="mb-1">YOUR PURCHASE COMPLETED</h2>
                        <h1 className="mb-0">THANK YOU</h1>
                      </div>
                    </div>

                    {cartItems.map((item) => (
                      item.videoCourseTitle ? (
                        <div className="card mb-3" key={item.cartId}>
                          <div className="card-body">
                            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}} className="card-details">
                              <div className="d-flex flex-row align-items-center">
                                <div className="ms-3">
                                  <div>
                                    <h3>You purchased a video course. Copy the link.</h3>
                                  </div>
                                  <h5 className="card-title">Title: {item.videoCourseTitle}</h5>
                                  <h5 className="card-title">Link: {item.videoCourseLink}</h5>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : null
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
