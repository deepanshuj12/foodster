const express = require('express');
const app = express();
const mongoDB = require("./db");
const cors = require('cors');
import CreateUser from "./Routes/CreateUser";
import Login from "./Routes/Login";
import CardData from "./Routes/CardData";
import OrderData from "./Routes/OrderData";

mongoDB();

app.use(cors());
app.use(express.json());

app.use('/api/CreateUser', CreateUser);
app.use('/api/Login', Login);
app.use('/api/CardData', CardData);
app.use('/api/OrderData', OrderData);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

module.exports = app;
