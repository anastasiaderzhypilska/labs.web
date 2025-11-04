import React, { useContext } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../header/header";
import Footer from "../footer/footer";
import { ZooContext } from '../../zoocontext';
import "./itempage.css";

function ItemPage() {
  const { id } = useParams();
  const { zoos } = useContext(ZooContext);
  const zoo = zoos.find(z => String(z.id) === String(id));

  return (
    <div className="item-page">
      <Header />
      <main className="item-main">
        {!zoo ? (
          <div className="not-found">
            <h2>Zoo not found</h2>
            <p>The requested zoo does not exist.</p>
            <Link to="/catalog" className="back-link">Back to Catalog</Link>
          </div>
        ) : (
          <div className="item-card">
            <img src={zoo.image} alt={zoo.name} className="item-img" />
            <div className="item-info">
              <h2>{zoo.name}</h2>
              <p className="item-desc">{zoo.description}</p>
              <p><b>Type:</b> {zoo.type}</p>
              <p><b>Visitors:</b> {zoo.visitors.toLocaleString()}</p>
              <p><b>Animals:</b> {zoo.animals}</p>
              <div className="item-actions">
                <Link to="/catalog" className="primary-btn">Back to Catalog</Link>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default ItemPage;
