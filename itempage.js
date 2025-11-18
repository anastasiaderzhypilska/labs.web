import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import Header from "../header/header";
import Footer from "../footer/footer";
import { getZooById } from "../../api/zoos";

import "./itempage.css";

function ItemPage() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [zoo, setZoo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    getZooById(id)
      .then(data => {
        if (!data) setError(true);
        else setZoo(data);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [id]);

  const handleBack = () => {
    if (location.state?.from) {
      navigate(location.state.from);
    } else {
      navigate("/catalog");
    }
  };

  return (
    <div className="item-page">
      <Header />
      <main className="item-main">
        {loading && (
          <div className="loading">
            <h2>Loading...</h2>
          </div>
        )}

        {!loading && error && (
          <div className="not-found">
            <h2>Zoo not found</h2>
            <p>The requested zoo does not exist.</p>
            <button className="primary-btn" onClick={handleBack}>Back</button>
          </div>
        )}

        {!loading && zoo && (
          <div className="item-card">
            <img src={zoo.image} alt={zoo.name} className="item-img" />

            <div className="item-info">
              <h2>{zoo.name}</h2>
              <p className="item-desc">{zoo.description}</p>
              <p><b>Type:</b> {zoo.type}</p>
              <p><b>Visitors:</b> {zoo.visitors.toLocaleString()}</p>
              <p><b>Animals:</b> {zoo.animals}</p>

              <div className="item-actions">
                <button className="primary-btn" onClick={handleBack}>
                  Back
                </button>
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
