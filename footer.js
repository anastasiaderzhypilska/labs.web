import React from "react";
import "./footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="branding">
          <h4>About Zoo Portal</h4>
          <p>
            A simple React project to explore different zoos and learn more 
            about wildlife from around the globe.
          </p>
        </div>

        <div className="footer-logo">
          <p>Zoo Portal</p>
        </div>

        <div className="socials">
          <a href="#"><i className="fab fa-facebook-f"></i></a>
          <a href="#"><i className="fab fa-twitter"></i></a>
          <a href="#"><i className="fab fa-instagram"></i></a>
        </div>
      </div>

      <p className="copyright">
        © 2025 Zoo Portal — All rights reserved
      </p>
    </footer>
  );
}

export default Footer;
