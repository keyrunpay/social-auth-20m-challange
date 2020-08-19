const express = require("express");
const app = express();
const cors = require("cors");

//Allow Cross Origin Request
app.use(cors());

//Allow JSON
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Bring in the routes!
app.use(require("./routes"));

module.exports = app;
