const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")
('sk_test_51LXsgwCribC7BDSxMdVjcjYbdXTApCgNp7FEbGCIXEA2wFwL11caViJYVvn0r6e4RBHrA9VRtGYLXVJcXmPuuC7k00EQqZFbQL')

// - API

// - App config\
const app = express();
// - Middlewares
app.use(cors({origin: true}));
app.use(express.json());

// - API routes
app.get("/", (request, response)=> response.status(200).send("hello world"));

app.post('/payments/create', async(request, response) => {
    const total = request.query.total;

    console.log('Payment Requst Received for this amount', total)

    const payment = await stripe.paymentIntents.create({
        amount: total,
        currency: "usd",
    });
    // ok - created
    response.status(201).sen({
        clientSecret: paymentIntent.clientSecret,
    })
})
// - Listen command
exports.api = functions.https.onRequest(app)

// http://localhost:5001/fir-challenge-43c34/us-central1/api