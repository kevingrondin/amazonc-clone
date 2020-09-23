import React, { useEffect } from "react";
import { Routes, Route, HashRouter } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useStateValue } from "./StateProvider";
import Firebase from "./firebase";
import "./App.css";
import Header from "./Header";
import Home from "./Home";
import Checkout from "./Checkout";
import Login from "./Login";
import Payment from "./Payment";

const promise = loadStripe("pk_test_0rjEsHT7VjcE7V7MRBykPq5k00eWkjLlao");

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(basket, user);
  return (
    <>
      <HashRouter>
        <div className="App">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/payment"
              element={
                <>
                  <Header />
                  <Elements stripe={promise}>
                    <Payment />
                  </Elements>
                </>
              }
            />
            <Route
              path="/checkout"
              element={
                <>
                  <Header />
                  <Checkout />
                </>
              }
            />
            <Route
              path="/"
              element={
                <>
                  <Header />
                  <Home />
                </>
              }
            />
            <Route
              path="*"
              element={
                <>
                  <Header />
                  <Home />
                </>
              }
            />
          </Routes>
        </div>
      </HashRouter>
    </>
  );
}

export default App;
