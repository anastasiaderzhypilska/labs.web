import React from "react";
import Header from "../header/header";
import Hero from "../herosection/herosection";
import Footer from "../footer/footer";
import "./Home.css";

function Home() {
  const zoos = [
    {
      name: "City Zoo",
      visitors: 50000,
      animals: 200,
      type: "Urban Area",
      image: "/zoo1.jpg",
    },
    {
      name: "Safari Park",
      visitors: 75000,
      animals: 300,
      type: "Wildlife Reserve",
      image: "/zoo2.jpg",
    },
    {
      name: "National Zoo",
      visitors: 100000,
      animals: 500,
      type: "National Park",
      image: "/zoo3.jpg",
    },
  ];

  return (
    <div className="home">
      <Header />
      <Hero />

      <section className="tiles">
        {zoos.map((zoo, index) => (
          <div className="tile" key={index}>
            <img src={zoo.image} alt={zoo.name} />
            <h3>{zoo.name}</h3>
            <p><b>Visitors:</b> {zoo.visitors.toLocaleString()}</p>
            <p><b>Animals:</b> {zoo.animals}</p>
            <p><b>Type:</b> {zoo.type}</p>
          </div>
        ))}
      </section>

      <div className="view-more">
        <button>View More Zoos</button>
      </div>

      <Footer />
    </div>
  );
}

export default Home;
