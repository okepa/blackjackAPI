require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const mongodb = require("mongodb");
const mongoose = require("mongoose");
const routes = require("./routes/routes");
const app = module.exports = express();

//Connecting to the mongoose database blackjackApi
mongoose.connect(process.env.DB);

//View Engine
app.set('view engine' ,'ejs');

//Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(routes);

//Listening on PORT 3000
app.listen(process.env.PORT || 3000, () => {
    console.log(`Server listening on port ${process.env.PORT || 3000}`);
});