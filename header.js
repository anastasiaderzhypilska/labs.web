import React from "react";
import { NavLink } from "react-router-dom";
import "./header.css";

function Header() {
  return (
    <header className="header">
      <div className="logo">Zoo Portal</div>

      <nav className="nav">
        <ul>
          <li><NavLink to="/" end className={({isActive})=>isActive ? "active" : ""}>Home</NavLink></li>
          <li><NavLink to="/catalog" className={({isActive})=>isActive ? "active" : ""}>Catalog</NavLink></li>
          <li><NavLink to="/about" className={({isActive})=>isActive ? "active" : ""}>About</NavLink></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
