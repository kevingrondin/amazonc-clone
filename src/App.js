import React from "react";
import { Routes, Route, HashRouter } from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import Checkout from "./Checkout";
import "./App.css";

function App() {
  return (
    <>
      <HashRouter>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </div>
      </HashRouter>
    </>
  );
}

export default App;
