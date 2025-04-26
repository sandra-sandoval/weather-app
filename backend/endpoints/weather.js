const express = require("express");
const axios = require("axios");
const router = express.Router();
const NodeCache = require("node-cache");
const cache = new NodeCache({ stdTTL: 600 });

router.get("/", async (req, res) => {
  const city = req.query.city;
  const aqi = req.query.aqi || "no";
  if (!city) {
    return res.status(500).send({ error: "Please input valid city." });
  }

  const cacheKey = city + ", " + aqi;
  const cachedData = cache.get(cacheKey);

  if (cachedData) {
    console.log("fetching from cached data");
    return res.json(cachedData);
  }

  try {
    const response = await axios.get(
      "http://api.weatherapi.com/v1/current.json?key=" +
        process.env.WEATHER_API_KEY +
        "&q=" +
        city +
        "&aqi=" +
        aqi
    );

    cache.set(cacheKey, response.data);
    console.log("saved new data to cache");

    res.json(response.data);
  } catch (err) {
    res
      .status(500)
      .send({ error: "Failed to fetch weather forecast for " + city });
  }
});

module.exports = router;
