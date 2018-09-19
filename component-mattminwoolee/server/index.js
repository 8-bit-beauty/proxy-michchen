// require('dotenv').config();
const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const db = require('../database');

app.use((req, res, next) => {
  console.log(`${req.method} request receieved at ${req.url}.`);
  next();
});
app.use(express.static('./client/dist'));

app.get('/checkout/*', bodyParser.json(), (req, res) => {
  // * representing the product ID
  const productId = req.originalUrl.split('/')[2];
  db.retrieveInformationById(productId, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.json(data[0]);
    }
  });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
