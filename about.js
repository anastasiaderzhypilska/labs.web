import React, { useEffect, useState } from "react";
import Header from "../header/header";
import Footer from "../footer/footer";
import { getZoos } from "../../api/zoos";

function About() {
  const [zoosCount, setZoosCount] = useState(0);

  useEffect(() => {
    getZoos()
      .then(data => setZoosCount(data.length))
      .catch(err => console.error("Failed to fetch zoos:", err));
  }, []);

  return (
    <div>
      <Header />
      <section style={{ textAlign: "center", padding: "60px 20px" }}>
        <h1>About Zoo Portal</h1>
        <p>
          Zoo Portal is a React-based web app designed to showcase information
          about different zoos, their animals, and visitor statistics.
        </p>
        <p>Total zoos available: {zoosCount}</p>
      </section>
      <Footer />
    </div>
  );
}

export default About;
