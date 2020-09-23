const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")("sk_test_XYVXF4z64xFTF7xlCZdrfc1s009VFCDgUY");

const app = express();

app.use(cors({ origin: true }));
app.use(express.json());

app.get("/", (request, response) => response.status(200).send("Hello World"));

app.post("/payments/create", async (request, response) => {
  const total = request.query.total;
  console.log("Payment Request >>>", total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "usd",
  });

  response.status(201).send({
    clientSecret: paymentIntent.clientSecret,
  });
});

exports.api = functions.https.onRequest(app);

// http://localhost:5001/kg-amaz/us-central1/api
