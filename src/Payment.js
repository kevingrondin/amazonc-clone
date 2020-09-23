import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import CurrencyFormat from "react-currency-format";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "./axios";
import "./Payment.css";
import CheckoutProduct from "./CheckoutProduct";
import { useStateValue } from "./StateProvider";
import { getBasketTotal } from "./reducer";

function Payment() {
  const navigate = useNavigate();
  const [{ user, basket }] = useStateValue();

  const stripe = useStripe();
  const elements = useElements();

  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");
  const [error, setError] = useState(null);
  const [disabled] = useState(true);
  const [clientSecret, setClientSecret] = useState(true);

  useEffect(() => {
    const getClientSecret = async () => {
      let { data } = await axios({
        method: "post",
        url: `/payments/create?total=${getBasketTotal(basket) * 100}`,
      });
      setClientSecret(data.clientSecret);
    };
    getClientSecret();
  }, [basket]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        setSucceeded(true);
        setError(null);
        setProcessing(false);

        navigate("/orders", { replace: true });
      });
  };
  const handleChange = (e) => {};

  return (
    <div className="payment">
      <div className="payment__container">
        <h1>
          Checkout (<Link to="/checkout">{basket?.length} items</Link>)
        </h1>

        {/* Payment section - delivery address */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment__address">
            <p>{user?.email}</p>
            <p>123 React Lane</p>
            <p>Los Angeles, CA</p>
          </div>
        </div>

        {/* Payment section - Review Items */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Review items and delivery</h3>
          </div>
          <div className="payment__items">
            {basket.map((item, i) => (
              <CheckoutProduct
                key={+item.id + i}
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
            ))}
          </div>
        </div>

        {/* Payment section - Payment method */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment__details">
            {/* Stripe magic will go */}

            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />

              <div className="payment__priceContainer">
                <CurrencyFormat
                  renderText={(value) => <h3>Order Total: {value}</h3>}
                  decimalScale={2}
                  value={getBasketTotal(basket)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
                <button disabled={processing || disabled || succeeded}>
                  <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                </button>
              </div>

              {/* Errors */}
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
