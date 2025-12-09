import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearCart } from '../../redux/actions';
import './success.css';

function Success() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    dispatch(clearCart());
    localStorage.removeItem('reduxState');
    
    const savedData = localStorage.getItem('checkoutData');
    if (savedData) {
      setOrderData(JSON.parse(savedData));
    }
  }, [dispatch]);

  const handleGoToHome = () => {
    navigate('/');
  };

  const handleNewOrder = () => {
    navigate('/catalog');
  };

  return (
    <div className="success-wrapper">
      {/* */}
      <div className="success-header-top">
        <div className="header-content">
          <div className="logo">
            <Link to="/">Zoo Portal</Link>
          </div>
          <nav className="nav">
            <Link to="/">Home</Link>
            <Link to="/catalog">Catalog</Link>
            <Link to="/about">About</Link>
            <Link to="/cart">Cart (0)</Link>
          </nav>
        </div>
      </div>
      
      <div className="success-page">
        <div className="success-container">
          <div className="success-icon">
            <div className="checkmark">✓</div>
          </div>
          
          <h1 className="success-title">Success!</h1>
          <p className="success-message">
            Your order was sent to processing! Check your email box for further information.
          </p>
          
          <div className="order-details">
            <h3>Order Details</h3>
            <div className="details-grid">
              <div className="detail-row">
                <span className="detail-label">Name:</span>
                <span className="detail-value">
                  {orderData ? `${orderData.firstName} ${orderData.lastName}` : 'Anastasia Derzhypilska'}
                </span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Email:</span>
                <span className="detail-value">
                  {orderData ? orderData.email : 'itnastia04@gmail.com'}
                </span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Phone:</span>
                <span className="detail-value">
                  {orderData ? orderData.phone : '+380096357112'}
                </span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Address:</span>
                <span className="detail-value">
                  {orderData ? `${orderData.address}, ${orderData.city}, ${orderData.zipCode}` : 'Sakharova, Lviv, 12345'}
                </span>
              </div>
            </div>
          </div>
          
          <div className="success-actions">
            <button 
              className="home-btn"
              onClick={handleGoToHome}
            >
              ← Go Back to Home
            </button>
            
            <button 
              className="catalog-btn"
              onClick={handleNewOrder}
            >
              Make New Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Success;