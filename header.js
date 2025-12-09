import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from 'react-redux';
import "./header.css";

function Header() {
  const cartItemsCount = useSelector(state => 
    state.cartItems.reduce((total, item) => total + item.quantity, 0)
  );

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
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;