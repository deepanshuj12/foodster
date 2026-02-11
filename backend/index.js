const express = require('express');
const app = express();
const mongoDB = require("./db");
const cors = require('cors');

mongoDB();

app.use(cors({
  origin: process.env.PUBLIC_BASE_URL
}));

app.use(express.json());

app.use('/api', require("../Routes/CreateUser"));
app.use('/api', require("../Routes/Login"));
app.use('/api', require("../Routes/CardData"));
app.use('/api', require("../Routes/OrderData"));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

module.exports = app;
