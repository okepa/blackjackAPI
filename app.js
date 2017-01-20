require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes/routes");
const app = express();
const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const mongodb = require("mongodb");

//connecting to DB 
mongoose.connect(process.env.DB);

//View Engine
app.set('view engine', 'ejs');

//Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(routes);

//Specifies the listening port
app.listen(process.env.PORT || 3000, () => {
    console.log(`Server listening on port ${process.env.PORT || 3000}`);
});