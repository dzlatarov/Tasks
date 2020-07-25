require('dotenv').config();
require('colors');
const express = require('express');
const countries = require('./routes/countries');

const app = express();

app.use(express.json());

app.use('/country', countries);

const PORT = process.env.PORT || 3100;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.cyan
      .underline.bold
  )
);