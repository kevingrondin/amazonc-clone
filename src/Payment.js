import React from "react";
import { Link } from "react-router-dom";
import "./Payment.css";
import CheckoutProduct from "./CheckoutProduct";
import { useStateValue } from "./StateProvider";

function Payment() {
  const [{ user, basket }] = useStateValue();
  return (
    <div className="payment">
      <div className="payment__container">
        <h1>
          <Link to="/checkout">{basket?.length} items</Link>
        </h1>
        <div className="payment__section">
          <div className="payment__title">
            <h3>Delivery Adress</h3>
          </div>
          <div className="payment__address">
            <p>{user?.email}</p>
            <p>123 react Lane</p>
            <p>Los angeles, CA</p>
          </div>
        </div>

        <div className="payment__section">
          <div className="payment__title">
            <h3>Review items and Delivery</h3>
          </div>
          <div className="payment__items">
            {basket.map((item, i) => (
              <CheckoutProduct
                key={+item.id + i}
                id={item.id}
                title={item.title}
                price={item.price}
                rating={item.rating}
              />
            ))}
          </div>
        </div>

        <div className="payment__section">
          <div className="payment__title">
            <h3>Review items and Delivery</h3>
          </div>
          <div className="payment__detail">
            <h3>Review items and Delivery</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
