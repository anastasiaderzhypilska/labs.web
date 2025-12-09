import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../header/header";
import Footer from "../footer/footer";
import ZooCard from "../zoocard/zoocard";
import { getZoosPaginated } from "../../api/zoos";

import "./home.css";

function Home() {
  const navigate = useNavigate();
  const initialShow = 3;
  const [zoos, setZoos] = useState([]);
  const [visibleCount, setVisibleCount] = useState(initialShow);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    setLoading(true);
    getZoosPaginated(page, 2) 
      .then(data => {
        if (data.length === 0) {
          setHasMore(false);
        } else {
          setZoos(prev => [...prev, ...data]);
        }
      })
      .finally(() => setLoading(false));
  }, [page]);

  function handleViewMore() {
    if (hasMore && !loading) {
      setPage(prev => prev + 1);
      setVisibleCount(prev => prev + 2); 
    }
  }

  return (
    <div className="home">
      <Header />

      <section className="hero">
        <div className="hero-wrapper">
          <img src="/zoo.jpg" alt="Zoo view" className="hero-image" />
          <div className="hero-text">
            <h1>Welcome to the Zoo Portal</h1>
            <p>
              Discover amazing zoos from around the world!
              Learn about their animals, habitats, and visitor experiences.
            </p>
          </div>
        </div>
      </section>

      <section className="tiles">
        {zoos.slice(0, visibleCount).map(zoo => (
          <ZooCard key={zoo.id} zoo={zoo} compact />
        ))}
      </section>

      <div className="view-more">
        {hasMore ? (
          <button onClick={handleViewMore} disabled={loading}>
            {loading ? "Loading..." : "View more"}
          </button>
        ) : (
          <button onClick={() => navigate("/catalog")}>
            Go to catalog
          </button>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default Home;
