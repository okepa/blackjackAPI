const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require("./routes/routes");

const app = module.exports = express();

//View Engine
app.set('view engine' , 'ejs');

//connect to the database
mongoose.connect("mongodb://localhost/blackjackApi");

//Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(mongoose);
app.use(express.static('public'));
app.use(routes);

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server listening on port ${process.env.PORT || 3000}`);
});