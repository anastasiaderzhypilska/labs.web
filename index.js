import React from "react";
import { createRoot } from "react-dom/client";
import App from "./app";
import { ZooProvider } from "./zoocontext";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ZooProvider>
      <App />
    </ZooProvider>
  </React.StrictMode>
);
