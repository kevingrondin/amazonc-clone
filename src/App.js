import React from "react";
import { Routes, Route, HashRouter } from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import Checkout from "./Checkout";
import Login from "./Login";
import "./App.css";

function App() {
  return (
    <>
      <HashRouter>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/" element={<Home />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </div>
      </HashRouter>
    </>
  );
}

export default App;
