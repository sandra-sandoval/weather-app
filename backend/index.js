const express = require("express");
const axios = require("axios");
require("dotenv").config();
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());

const forecastEndpoint = require("./endpoints/forecast");
const weatherEndpoint = require("./endpoints/weather");

app.get("/", (req, res) => {
  res.send("Weather app is running.");
});

app.use("/weather", weatherEndpoint);
app.use("/forecast", forecastEndpoint);
app.listen(PORT, () => {
  console.log("Server is running on http://localhost:" + PORT);
});
