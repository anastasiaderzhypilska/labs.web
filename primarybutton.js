import React from "react";
import "./primarybutton.css";

function PrimaryButton({ children, onClick }) {
  return (
    <button className="primary-btn" onClick={onClick}>
      {children}
    </button>
  );
}

export default PrimaryButton;
