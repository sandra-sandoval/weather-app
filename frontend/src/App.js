import "./App.css";
import React, { useState } from "react";
import { DisplayWeather, FetchWeather } from "./components/weather";
import { DisplayForecast, FetchForecast } from "./components/forecast";
function App() {
  const [city, setCity] = useState("");
  const [forecast, setForecast] = useState(null);
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [mode, setMode] = useState("weather");
  const [aqi, setAqi] = useState("yes");
  const [days, setDays] = useState("3");

  const handleWeather = async () => {
    try {
      const data = await FetchWeather(city, aqi);
      setWeather(data);
      setError("");
      // displayWeather({ city });
    } catch (err) {
      setError(err.message);
      setWeather(null);
    }
  };

  const handleForecast = async () => {
    try {
      const data = await FetchForecast(city, aqi, days);
      setForecast(data);
      setError("");
    } catch (err) {
      setError(err.message);
      setForecast(null);
    }
  };

  const handleFetch = async () => {
    try {
      console.log(mode);
      if (mode === "weather") {
        const data = await FetchWeather(city, aqi);
        setWeather(data);
        setError("");
      } else {
        const data = await FetchForecast(city, aqi, days);
        setForecast(data);
        setError("");
      }
    } catch (err) {
      setError(err.message);
      setForecast(null);
      setWeather(null);
    }
  };

  return (
    <div className="App">
      <header>
        <h1>Weather App</h1>
        <p>Plan ahead with the Weather App!</p>
      </header>
      <div className="user-input">
        <input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter City name"
        />
        <div id="mode-container">
          <button
            className={
              mode === "weather" ? "mode-button-selected" : "mode-button"
            }
            onClick={() => setMode("weather")}
          >
            {" "}
            Weather
          </button>
          <button
            className={
              mode === "forecast" ? "mode-button-selected" : "mode-button"
            }
            onClick={() => setMode("forecast")}
          >
            Forecast
          </button>
        </div>
        <div id="select-container">
          <div className="select-component">
            <p>Air Quality</p>
            <select id="aqi" onChange={(e) => setAqi(e.target.value)}>
              <option value="select">Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          {mode === "forecast" && (
            <div className="select-component">
              <p>Days</p>
              <select id="days" onChange={(e) => setDays(e.target.value)}>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
              </select>
            </div>
          )}
        </div>
        <button id="submit-button" onClick={handleFetch}>
          Get Info
        </button>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {mode === "forecast" &&
        forecast &&
        DisplayForecast({ forecast }, { aqi })}

      {mode === "weather" && weather && DisplayWeather({ weather }, { aqi })}
    </div>
  );
}

export default App;
