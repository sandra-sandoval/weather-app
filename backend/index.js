const express = require("express");
const axios = require("axios");
require("dotenv").config();
const cors = require("cors");

const app = express();
const PORT = 3000;

// const NodeCache = require("node-cache");
// const cache = new NodeCache({ stdTTL: 600 });
app.use(cors());
// app.use(
//   cors({
//     origin: "http://localhost:3005", // Allow only frontend running on this port
//   })
// );

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

// app.get("/weather", async (req, res) => {
//   const city = req.query.city;
//   const aqi = req.query.aqi || "yes";
//   if (!city) {
//     return res.status(500).send({ error: "Please input valid city." });
//   }
//   const cacheKey = city + ", " + aqi;
//   const cachedData = cache.get(cacheKey);

//   if (cachedData) {
//     console.log("fetched from cache");
//     return res.json(cachedData);
//   }

//   try {
//     const response = await axios.get(
//       "http://api.weatherapi.com/v1/current.json?key=" +
//         process.env.WEATHER_API_KEY +
//         "&q=" +
//         city +
//         "&aqi=" +
//         aqi
//     );

//     cache.set(cacheKey, response.data);
//     console.log("added to cache");

//     res.json(response.data);
//   } catch (err) {
//     res.status(500).send({ error: "Failed to fetch weather data for ${city}" });
//   }
// });

// app.get("/forecast", async (req, res) => {
//   const city = req.query.city;
//   const days = req.query.days || "3";
//   const aqi = req.query.aqi || "yes";
//   if (!city) {
//     return res.status(500).send({ error: "Please input valid city." });
//   }

//   const cacheKey = city + ", " + days + ", " + aqi;
//   const cachedData = cache.get(cacheKey);

//   if (cachedData) {
//     console.log("fetching from cached data");
//     return res.json(cachedData);
//   }

//   try {
//     const response = await axios.get(
//       "http://api.weatherapi.com/v1/forecast.json?key=" +
//         process.env.WEATHER_API_KEY +
//         "&q=" +
//         city +
//         "&days=" +
//         days +
//         "&aqi=" +
//         aqi +
//         "&alerts=yes"
//     );

//     cache.set(cacheKey, response.data);
//     console.log("saved new data to cache");

//     res.json(response.data);
//   } catch (err) {
//     res
//       .status(500)
//       .send({ error: "Failed to fetch weather forecast for " + city });
//   }
// });
