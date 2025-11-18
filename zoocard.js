import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./zoocard.css";

function ZooCard({ zoo, compact }) {
  const navigate = useNavigate();
  const location = useLocation(); 

  const handleViewDetailsClick = () => {
    navigate(`/item/${zoo.id}`, { state: { from: location.pathname } });
  };

  return (
    <div className={`zoo-card ${compact ? "compact" : ""}`}>
      <img src={zoo.image} alt={zoo.name} className="zoo-img" />
      <div className="zoo-body">
        <h3>{zoo.name}</h3>
        {!compact && <p className="zoo-desc">{zoo.description}</p>}
        <p className="meta"><b>Visitors:</b> {zoo.visitors.toLocaleString()} </p>
        <p className="meta"><b>Animals:</b> {zoo.animals}</p>
        <p className="meta"><b>Type:</b> {zoo.type}</p>
        <div className="zoo-actions">
          <button className="primary-btn" onClick={handleViewDetailsClick}>
            View details
          </button>
        </div>
      </div>
    </div>
  );
}

export default ZooCard;
