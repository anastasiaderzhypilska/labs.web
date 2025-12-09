import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { setCartItems } from '../../redux/actions';
import "./header.css";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const cartItems = useSelector(state => state.cartItems);
  
  const cartItemsCount = cartItems.reduce((total, item) => {
    return total + (item.quantity || 1);
  }, 0);
  
  const userEmail = localStorage.getItem('userEmail');

  const handleLogout = () => {
    if (userEmail) {
      const cartKey = `cart_${userEmail}`;
      localStorage.setItem(cartKey, JSON.stringify(cartItems));
      console.log(' Збережено корзину при виході для:', userEmail);
    }
    
    localStorage.removeItem('userEmail');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userData');
    
    dispatch(setCartItems([]));
    
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="container">
        <div className="logo">Zoo Portal</div>

        <nav className="nav">
          <ul>
            <li>
              <NavLink 
                to="/" 
                end 
                className={({isActive}) => isActive ? "active" : ""}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/catalog" 
                className={({isActive}) => isActive ? "active" : ""}
              >
                Catalog
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/about" 
                className={({isActive}) => isActive ? "active" : ""}
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/cart" 
                className={({isActive}) => isActive ? "active" : ""}
              >
                Cart ({cartItemsCount})
              </NavLink>
            </li>
            {userEmail && (
              <>
                <li className="user-info">
                  <span className="user-email">{userEmail}</span>
                </li>
                <li>
                  <button onClick={handleLogout} className="logout-btn">
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;