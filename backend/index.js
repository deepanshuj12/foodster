const express = require('express');
const app = express();
const mongoDB = require("./db");
const cors = require('cors');

mongoDB();

app.use(cors());

app.use(express.json());

app.use('/api', require("./Routes/CreateUser"));
app.use('/api', require("./Routes/Login"));
app.use('/api', require("./Routes/CardData"));
app.use('/api', require("./Routes/OrderData"));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

module.exports = app;
