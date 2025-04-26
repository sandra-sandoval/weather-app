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
  const [aqi, setAqi] = useState("no");
  const [days, setDays] = useState("3");
  const [degree, setDegree] = useState("F");

  const handleWeather = async () => {
    try {
      const data = await FetchWeather(city, aqi);
      setWeather(data);
      setError("");
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
        <div className="head-container">
          <h1> 🌤️ Weather App</h1>
          <p>Plan ahead with the Weather App!</p>
        </div>
        <div className="user-input">
          <div id="search-container">
            <input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter City name"
              className="w-full border border-gray-300 rounded-full py-2 px-4 pr-12 focus:outline-none"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  {
                    handleFetch();
                  }
                }
              }}
            />
            <button
              onClick={handleFetch}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white"
              aria-label="Search"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="15"
                height="15"
                viewBox="0 0 50 50"
                fill="black"
              >
                <path d="M 21 3 C 11.622998 3 4 10.623005 4 20 C 4 29.376995 11.622998 37 21 37 C 24.712383 37 28.139151 35.791079 30.9375 33.765625 L 44.085938 46.914062 L 46.914062 44.085938 L 33.886719 31.058594 C 36.443536 28.083 38 24.223631 38 20 C 38 10.623005 30.377002 3 21 3 z M 21 5 C 29.296122 5 36 11.703883 36 20 C 36 28.296117 29.296122 35 21 35 C 12.703878 35 6 28.296117 6 20 C 6 11.703883 12.703878 5 21 5 z"></path>
              </svg>
            </button>
          </div>
          <div id="mode-container">
            <button
              className={
                mode === "weather" ? "mode-button-selected" : "mode-button"
              }
              onClick={() => setMode("weather")}
            >
              Today
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
        </div>
      </header>
      <main>
        <div id="select-container">
          <div className="select-component">
            <p>Degree</p>
            <select id="degree" onChange={(e) => setDegree(e.target.value)}>
              <option value="F">F</option>
              <option value="C">C</option>
            </select>
          </div>
          {mode === "weather" && (
            <div className="select-component">
              <p>Air Quality</p>
              <select id="aqi" onChange={(e) => setAqi(e.target.value)}>
                <option value="no">No</option>
                <option value="yes">Yes</option>
              </select>
            </div>
          )}
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
        {error && <p style={{ color: "red" }}>{error}</p>}
        {mode === "forecast" &&
          forecast &&
          DisplayForecast({ forecast }, { degree })}

        {mode === "weather" &&
          weather &&
          DisplayWeather({ weather }, { aqi }, { degree })}
      </main>
      <footer></footer>
    </div>
  );
}

export default App;
