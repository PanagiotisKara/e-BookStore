import React, { useState, useEffect } from 'react';
import './cart.css';
import { useNavigate } from 'react-router-dom';

export default function Basic() {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [subscriptionPrice, setSubscriptionPrice] = useState(0); // New state for subscription price
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
  }, [cartItems, subscriptionPrice]); // Recalculate total price if subscription changes

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

  const handleSubscriptionChange = (price) => {
    setSubscriptionPrice(price);
    setTotalPrice(price);
  };

  const shippingCost = totalPrice === 0 ? 0 : 3.99;

  return (
    <section className="h-100 h-custom" style={{ backgroundColor: '#eee' }}>
      <div className="container py-5 h-100">
        <div className="row justify-content-center align-items-center h-100">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-7">
                    <h5 onClick={() => navigate('/books')}>
                      <a href="#!" className="card-link">
                        <i className="fas fa-long-arrow-alt-left me-2"></i> Continue shopping
                      </a>
                    </h5>

                    <hr />

                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <div>
                        <p className="mb-1">Shopping cart</p>
                        <p className="mb-0">You have {cartItems.length} items in your cart</p>
                      </div>
                    </div>

                    {cartItems.map((item) => (
                      <div className="card mb-3" key={item.cartId}>
                        <div className="card-body">
                          <div className="card-details">
                            <div className="d-flex flex-row align-items-center">
                              <div className="ms-3">
                                {item.bookTitle ? (
                                  <>
                                    <div>
                                      <img
                                        src={item.thumbnail}
                                        alt="Shopping item"
                                        className="card-image"
                                      />
                                    </div>
                                    <h5 className="card-title">{item.bookTitle}</h5>
                                  </>
                                ) : (
                                  <>
                                    <h5 className="card-title">{item.videoCourseTitle}</h5>
                                  </>
                                )}
                              </div>
                            </div>
                            <div className="d-flex flex-row align-items-center">
                              <div style={{ width: '50px' }}>
                                <p className="card-quantity fw-normal mb-0">{item.quantity}</p>
                              </div>
                              <div style={{ width: '80px' }}>
                                <p className="card-price mb-0">${item.price}</p>
                              </div>
                              <button
                                onClick={() => handleDelete(item.cartId)}
                                className="btn btn-danger btn-sm"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="col-lg-5">
                    <div className="card bg-primary text-white rounded-3">
                      <div className="card-body">

                        <a href="#!" className="text-white">
                          <i className="fab fa-cc-mastercard fa-2x me-2"></i>
                        </a>
                        <a href="#!" className="text-white">
                          <i className="fab fa-cc-visa fa-2x me-2"></i>
                        </a>
                        <a href="#!" className="text-white">
                          <i className="fab fa-cc-amex fa-2x me-2"></i>
                        </a>
                        <a href="#!" className="text-white">
                          <i className="fab fa-cc-paypal fa-2x me-2"></i>
                        </a>

                        <div>
                          <h2 className="text-center">Subscription</h2>
                          <div className="subscription-options">
                            <button
                              style={{fontSize: '20px', marginRight:'5px'}}
                              className="btn btn-light mb-2"
                              onClick={() => handleSubscriptionChange(9.99)}
                            >
                              Basic Plan - $9.99/month
                            </button>
                            <button
                              style={{fontSize: '20px', marginRight:'5px'}}
                              className="btn btn-light mb-2"
                              onClick={() => handleSubscriptionChange(19.99)}
                            >
                              Standard Plan - $19.99/month
                            </button>
                            <button
                              style={{fontSize: '20px'}}
                              className="btn btn-light mb-2"
                              onClick={() => handleSubscriptionChange(29.99)}
                            >
                              Premium Plan - $29.99/month
                            </button>
                          </div>
                        </div>
                        <br></br>
                          <br></br>
                          <br></br>
                      <hr></hr>

                        <form className="card-form">
                          <h2 className="text-center">Credit Card Form</h2>
                          <div className="form-group mt-4">
                            <input
                              type="text"
                              className="form-control mt-3"
                              placeholder="Cardholder Name"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                            />
                            <input
                              type="text"
                              className="form-control mt-3"
                              placeholder="Card Number"
                              value={cardNumber}
                              onChange={(e) => setCardNumber(e.target.value)}
                            />
                            <div className="expiry-and-cvc-container mt-3">
                              <input
                                type="text"
                                className="form-control expiration-date-field"
                                placeholder="MM/YY"
                                value={expiry}
                                onChange={(e) => setExpiry(e.target.value)}
                              />
                              <input
                                type="text"
                                className="form-control cvc-field ml-3"
                                placeholder="CVC"
                                value={cvc}
                                onChange={(e) => setCvc(e.target.value)}
                              />
                            </div>
                          </div>
                          <br></br>
                          <br></br>
                          <br></br>
                          <hr />
                        </form>

                        <hr />

                        <div className="d-flex justify-content-between">
                          <p className="mb-2">Subtotal</p>
                          <p className="mb-2">${totalPrice.toFixed(2)}</p>
                        </div>

                        <div className="d-flex justify-content-between">
                          <p className="mb-2">Shipping</p>
                          <p className="mb-2">${shippingCost.toFixed(2)}</p>
                        </div>

                        <div className="d-flex justify-content-between">
                          <p className="mb-2">Total (Incl. taxes)</p>
                          <p className="mb-2">${(totalPrice + shippingCost).toFixed(2)}</p>
                        </div>

                        <button className="btn btn-info btn-lg btn-block">
                          <div className="d-flex justify-content-between">
                            <span onClick={() => navigate('/ordered')}>
                              Checkout <i className="fas fa-long-arrow-alt-right ms-2"></i>
                            </span>
                          </div>
                        </button>
                      </div>
                    </div>
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
