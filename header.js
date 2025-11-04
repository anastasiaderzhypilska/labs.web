import React from "react";
import { NavLink } from "react-router-dom";
import './header.css';


function Header() {
  return (
    <header className="header">
      <div className="logo">Zoo Portal</div>

      <nav className="nav">
        <ul>
          <li>
            <NavLink to="/" className={({isActive})=> isActive ? "active" : ""} end>Home</NavLink>
          </li>
          <li>
            <NavLink to="/catalog" className={({isActive})=> isActive ? "active" : ""}>Catalog</NavLink>
          </li>
          <li>
            <a href="#about">About</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
