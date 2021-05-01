require('dotenv-safe').config({ path: `./.env.${process.env.NODE_ENV}` })
const passport = require('passport')
const initMongo = require('./app/config/mongo')
const cors = require("cors");
const express = require("express");
const app = express();

var corsOptions = {
  origin: process.env.FRONTEND_URL
};

// use cors and set allowed origin
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT)

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to COVID-19 stats application." });
});

app.use(passport.initialize())
app.use(require('./app/routes'))


// Init MongoDB
initMongo()

module.exports = app //only for tests