import React from "react";
import Header from "../header/header";
import Footer from "../footer/footer";
import ZooCard from "../ZooCard/ZooCard";
import "./catalog.css";


function Catalog() {
  const zoos = [
    {
      id: 1,
      name: "City Zoo",
      visitors: 50000,
      animals: 200,
      type: "Urban Area",
      image: "/zoo1.jpg",
      description: "A cozy city zoo with family-friendly exhibits."
    },
    {
      id: 2,
      name: "Safari Park",
      visitors: 75000,
      animals: 300,
      type: "Wildlife Reserve",
      image: "/zoo2.jpg",
      description: "Large open enclosures, great for safari-style visits."
    },
    {
      id: 3,
      name: "National Zoo",
      visitors: 100000,
      animals: 500,
      type: "National Park",
      image: "/zoo3.jpg",
      description: "A flagship national zoo with rare species."
    }
  ];

  return (
    <div className="catalog-page">
      <Header />
      <main className="catalog-main">
        <h2>Zoo Catalog</h2>
        <p className="catalog-lead">Explore our demo zoos. Click "View details" to see more (not implemented in this lab).</p>

        <div className="catalog-grid">
          {zoos.map(zoo => (
            <ZooCard key={zoo.id} zoo={zoo} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Catalog;
