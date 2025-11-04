import React from "react";
import { Link } from "react-router-dom";
import "./zoocard.css";

function ZooCard({ zoo, compact }) {
  return (
    <div className={`zoo-card ${compact ? "compact" : ""}`}>
      <img src={zoo.image} alt={zoo.name} className="zoo-img" />
      <div className="zoo-body">
        <h3>{zoo.name}</h3>
        {!compact && <p className="zoo-desc">{zoo.description}</p>}
        <p className="meta"><b>Visitors:</b> {zoo.visitors.toLocaleString()} </p>
       <p className="meta"> &nbsp; <b>Animals:</b> {zoo.animals}</p>
        <p className="meta"><b>Type:</b> {zoo.type}</p>
        <div className="zoo-actions">
          <Link to={`/item/${zoo.id}`} className="primary-btn">View details</Link>
        </div>
      </div>
    </div>
  );
}

export default ZooCard;
