const express = require('express');
const http = require('http');
const cors = require('cors');
const path = require('path');
const stripe = require('stripe')(
  'sk_test_51HQHMtGqHXpcGo1it0rqHFaX7BvWu6td6Ef4dCxR3tSNRIgf8wQrhmmcDDWPmAOpmjbaG1ocnbAhiUxyYKzABkNS00vhZRno5o'
);
const PORT = process.env.PORT || '5000';
const app = express();
const server = http.createServer(app);

app.use(cors({ origin: true }));
app.use(express.json());
app.use('/', express.static(path.join(__dirname, 'client', 'build')));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

app.post('/payments/create', async (req, res) => {
  const total = req.query.total;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: 'usd',
  });
  res.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

server.listen(PORT, () => console.log(`Server started on ${PORT}`));
