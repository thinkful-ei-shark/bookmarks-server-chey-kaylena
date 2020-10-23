// Imports
require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const { NODE_ENV } = require("./config");
const bearerToken = require('./bearerToken')
const app = express();

const morganOption = NODE_ENV === "production" ? "tiny" : "common";

// USE

app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());
app.use(bearerToken)

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.use(errorHandler)

module.exports = app;
