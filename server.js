require('dotenv-safe').config({ path: `./.env.${process.env.NODE_ENV}` })
const express = require("express");
const cors = require("cors");
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

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to COVID-19 stats application." });
});

//set routes
app.use(require('./app/routes'))

// set port, listen for requests
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});