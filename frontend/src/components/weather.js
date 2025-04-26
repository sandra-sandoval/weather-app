import React, { useState } from "react";
import "./weather.css";

export async function FetchWeather(city, aqi) {
  console.log("city: " + city);
  const res = await fetch("/weather?city=" + city + "&aqi=" + aqi);
  // const res = await fetch("/mock-weather");
  const data = await res.json();
  if (data.error) throw new Error(data.error);
  return data;
}

export function DisplayWeather({ weather }, { aqi }, { degree }) {
  if (!weather || !weather.location) {
    return null;
  }
  return (
    <div className="weather-display">
      <h2>
        📍 {weather.location.name}, {weather.location.country}
      </h2>
      <section className="current-card">
        <div id="current-top">
          <div id="time">
            <p>As of {weather.current.last_updated}</p>
          </div>
          <div id="temp">
            <p>
              {degree === "F"
                ? weather.current.temp_f + "°F"
                : weather.current.temp_c + "°C"}
            </p>
            <img
              src={`https:${weather.current.condition.icon}`}
              alt={weather.current.condition.text}
            ></img>
          </div>
        </div>
        <div className="info">
          <div className="p-sec">
            <p>Feels Like:</p>
            <p>
              {degree === "F"
                ? weather.current.feelslike_f + "°F"
                : weather.current.feelslike_c + "°C"}
            </p>
          </div>
          <div className="p-sec">
            <p>Condition:</p>
            <p>{weather.current.condition.text}</p>
          </div>
          <div className="p-sec">
            <p>Wind mph</p>
            <p>{weather.current.wind_mph}</p>
          </div>
          <div className="p-sec">
            <p>Humidity</p>
            <p>{weather.current.humidity}</p>
          </div>
          <div className="p-sec">
            <p>UV:</p>
            <p>{weather.current.uv}</p>
          </div>
          {aqi === "yes" && weather.current.air_quality && (
            <div id="Air Quality">
              <p>Air Quality: </p>
              {/* <ul> */}
              <div className="p-sec">
                <p>US EPA Index: </p>
                <p>{weather.current.air_quality["us-epa-index"]}</p>
              </div>
              <div className="p-sec">
                <p>PM2.5:</p>
                <p>{weather.current.air_quality.pm2_5}</p>
              </div>
              <div className="p-sec">
                <p>O3:</p>
                <p>{weather.current.air_quality.o3}</p>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
