import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Provider } from 'react-redux';
import { ZooProvider } from './zoocontext';
import store from './redux/store';

import Login from "./components/auth/login";
import Register from "./components/auth/register";
import ProtectedRoute from "./components/auth/protectedroute";

import Home from "./components/home/home";
import Catalog from "./components/catalog/catalog";
import ItemPage from "./components/itempage/itempage";
import About from "./components/about/about";
import Cart from "./components/cart/Cart";
import Checkout from "./components/checkout/checkout";
import Success from "./components/success/success";

import "./index.css";

function App() {
  return (
    <Provider store={store}>
      <ZooProvider>
        <Router>
          <Routes>
            {/* */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/**/}
            <Route path="/" element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } />
            <Route path="/catalog" element={
              <ProtectedRoute>
                <Catalog />
              </ProtectedRoute>
            } />
            <Route path="/item/:id" element={
              <ProtectedRoute>
                <ItemPage />
              </ProtectedRoute>
            } />
            <Route path="/about" element={
              <ProtectedRoute>
                <About />
              </ProtectedRoute>
            } />
            <Route path="/cart" element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            } />
            <Route path="/checkout" element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            } />
            <Route path="/success" element={
              <ProtectedRoute>
                <Success />
              </ProtectedRoute>
            } />
            
            {/* */}
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </Router>
      </ZooProvider>
    </Provider>
  );
}

export default App;