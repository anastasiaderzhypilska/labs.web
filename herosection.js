import React from "react"; 
import "./herosection.css"; 

function HeroSection() { 
  return ( 
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
  ); 
} 

export default HeroSection;