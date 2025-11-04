import React from "react";
import Header from "../header/header";
import Footer from "../footer/footer";

function About() {
  return (
    <div>
      <Header />
      <section style={{ textAlign: "center", padding: "60px 20px" }}>
        <h1>About Zoo Portal</h1>
        <p>
          Zoo Portal is a React-based web app designed to showcase information
          about different zoos, their animals, and visitor statistics.
        </p>
      </section>
      <Footer />
    </div>
  );
}

export default About;
