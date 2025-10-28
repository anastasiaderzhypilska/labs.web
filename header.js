import React from "react";
import "./header.css";

function Header() {
  return (
    <header className="header">
      <div className="logo">Zoo Portal</div>

      <nav className="nav">
        <ul>
          <li className="active">Home</li>
          <li>Catalog</li>
          <li>About</li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
