import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCartItems } from '../../redux/actions';
import './auth.css';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  React.useEffect(() => {
    localStorage.removeItem('userEmail');
    localStorage.removeItem('isLoggedIn');
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!email.includes('@')) {
      setError('Please enter a valid email');
      return;
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    
    const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
      setError('Invalid email or password');
      return;
    }
    
    localStorage.setItem('userData', JSON.stringify({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email
    }));
    
    localStorage.setItem('userEmail', email);
    localStorage.setItem('isLoggedIn', 'true');
    
    const cartKey = `cart_${email}`;
    const userCart = JSON.parse(localStorage.getItem(cartKey) || '[]');
    
    console.log(' Завантажено корзину для', email, ':', userCart);
    
    dispatch(setCartItems(userCart));
    
    navigate('/');
  };

  const handleClearAllData = () => {
    localStorage.clear();
    sessionStorage.clear();
    setEmail('');
    setPassword('');
    alert('All data has been cleared! You need to register again.');
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        <div className="auth-header">
          <h1>LOGIN</h1>
          <p>Submit the form to sign in</p>
        </div>
        
        <form onSubmit={handleSubmit} className="auth-form">
          {error && <div className="auth-error">{error}</div>}
          
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          
          <button type="submit" className="auth-btn">
            Sign In
          </button>
          
          <div className="auth-links">
            <div className="auth-link">
              Not a member? <Link to="/register">Sign up</Link>
            </div>
            
            <button 
              type="button" 
              onClick={handleClearAllData}
              className="clear-data-btn"
            >
              Clear All Data
            </button>
            
            <div className="auth-note">
              Use "Clear All Data" if automatically logged in
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;