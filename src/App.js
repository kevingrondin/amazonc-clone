import React, { useEffect } from "react";
import { Routes, Route, HashRouter } from "react-router-dom";
import Firebase from "./firebase";
import { useStateValue } from "./StateProvider";
import "./App.css";
import Header from "./Header";
import Home from "./Home";
import Checkout from "./Checkout";
import Login from "./Login";

function App() {
  const [{ user, basket }, dispatch] = useStateValue();
  useEffect(() => {
    Firebase.auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);
  console.log(basket, user);
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
