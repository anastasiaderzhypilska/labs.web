import React from "react";
import PrimaryButton from '../PrimaryButton/PrimaryButton';
import "./ZooCard.css";

function ZooCard({ zoo }) {
  return (
    <div className="zoo-card">
      <img src={zoo.image} alt={zoo.name} className="zoo-img" />
      <div className="zoo-body">
        <h3>{zoo.name}</h3>
        <p className="zoo-desc">{zoo.description}</p>
        <p><b>Visitors:</b> {zoo.visitors.toLocaleString()}</p>
        <p><b>Animals:</b> {zoo.animals}</p>
        <p><b>Type:</b> {zoo.type}</p>
        <div className="zoo-actions">
          <PrimaryButton onClick={()=>{}}>View details</PrimaryButton>
        </div>
      </div>
    </div>
  );
}

export default ZooCard;
