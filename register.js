import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCartItems } from '../../redux/actions';
import './auth.css';

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  if (localStorage.getItem('userEmail')) {
    navigate('/');
    return null;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (formData.firstName.trim().length < 2) {
      setError('First name must be at least 2 characters');
      return;
    }
    
    if (formData.lastName.trim().length < 2) {
      setError('Last name must be at least 2 characters');
      return;
    }
    
    if (!formData.email.includes('@')) {
      setError('Please enter a valid email');
      return;
    }
    
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    const userData = {
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      address: formData.address.trim(),
      city: formData.city.trim(),
      zipCode: formData.zipCode.trim(),
      createdAt: new Date().toISOString()
    };
    
    const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    users.push({
      ...userData,
      password: formData.password
    });
    localStorage.setItem('registeredUsers', JSON.stringify(users));
    
    localStorage.setItem('userData', JSON.stringify(userData));
    localStorage.setItem('userEmail', formData.email);
    localStorage.setItem('isLoggedIn', 'true');
    
    const cartKey = `cart_${formData.email}`;
    localStorage.setItem(cartKey, JSON.stringify([]));
    console.log('👤 Створено порожню корзину для:', formData.email);
    
    dispatch(setCartItems([]));
    
    navigate('/');
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        <div className="auth-header">
          <h1>REGISTER</h1>
          <p>Create a new account</p>
        </div>
        
        <form onSubmit={handleSubmit} className="auth-form">
          {error && <div className="auth-error">{error}</div>}
          
          <div className="form-group">
            <label>First Name *</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Enter your first name"
              required
            />
          </div>
          
          <div className="form-group">
            <label>Last Name *</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Enter your last name"
              required
            />
          </div>
          
          <div className="form-group">
            <label>Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
              required
            />
          </div>
          
          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+1234567890"
            />
          </div>
          
          <div className="form-group">
            <label>Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Street address, PO Box"
            />
          </div>
          
          <div className="form-group">
            <label>City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Enter city"
            />
          </div>
          
          <div className="form-group">
            <label>ZIP Code</label>
            <input
              type="text"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              placeholder="12345"
            />
          </div>
          
          <div className="form-group">
            <label>Password *</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              required
            />
          </div>
          
          <div className="form-group">
            <label>Confirm Password *</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm password"
              required
            />
          </div>
          
          <button type="submit" className="auth-btn">
            Sign Up
          </button>
          
          <div className="auth-link">
            Already a member? <Link to="/login">Sign in</Link>
          </div>
        </form>
      </div>
    </div> 
  );
};

export default Register;