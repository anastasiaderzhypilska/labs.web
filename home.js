import React, { useContext, useState } from "react";
import Header from "../header/header";
import Footer from "../footer/footer";
import { ZooContext } from '../../zoocontext';
import ZooCard from "../zoocard/zoocard";
import "./home.css";

function Home() {
  const { zoos } = useContext(ZooContext);
  const initialShow = 3;
  const [visibleCount, setVisibleCount] = useState(initialShow);

  function handleViewMore() {
    setVisibleCount(prev => Math.min(prev + 2, zoos.length));
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
        {visibleCount < zoos.length ? (
          <button onClick={handleViewMore}>View more</button>
        ) : (
          <button onClick={() => window.location.href = "/catalog"}>Go to catalog</button>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default Home;
