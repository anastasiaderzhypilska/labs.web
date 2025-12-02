import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import { ZooProvider } from './zoocontext';
import store from './redux/store';
import Home from "./components/home/home";
import Catalog from "./components/catalog/catalog";
import ItemPage from "./components/itempage/itempage";
import About from "./components/about/about";
import Cart from "./components/cart/Cart";
import "./index.css";

function App() {
  return (
    <Provider store={store}>
      <ZooProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/item/:id" element={<ItemPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/cart" element={<Cart />} />
            {/* Checkout */}
          </Routes>
        </Router>
      </ZooProvider>
    </Provider>
  );
}

export default App;