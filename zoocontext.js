import React, { createContext, useState } from "react";

export const ZooContext = createContext();

export function ZooProvider({ children }) {
  const initialZoos = [
    { id: 1, name: "City Zoo", visitors: 50000, animals: 200, type: "Urban Area", image: "/zoo1.jpg", description: "A cozy city zoo with family-friendly exhibits." },
    { id: 2, name: "Safari Park", visitors: 75000, animals: 300, type: "Wildlife Reserve", image: "/zoo2.jpg", description: "Large open enclosures, great for safari-style visits." },
    { id: 3, name: "National Zoo", visitors: 100000, animals: 500, type: "National Park", image: "/zoo3.jpg", description: "A flagship national zoo with rare species." },
    { id: 4, name: "Riverside Zoo", visitors: 32000, animals: 150, type: "Urban Area", image: "/zoo4.jpg", description: "Small but charming riverside zoo." },
    { id: 5, name: "Savannah Reserve", visitors: 88000, animals: 350, type: "Wildlife Reserve", image: "/zoo5.jpg", description: "Expansive grassy enclosures with herds." }
  ];

  const [zoos, setZoos] = useState(initialZoos);

  function addZoos(newZoos) {
    setZoos(prev => [...prev, ...newZoos]);
  }

  return (
    <ZooContext.Provider value={{ zoos, setZoos, addZoos }}>
      {children}
    </ZooContext.Provider>
  );
}
