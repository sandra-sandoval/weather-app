import React, { useState } from "react";
import "./forecast.css";

export async function FetchWeather(city, aqi) {
  console.log("city: " + city);
  const res = await fetch("/weather?city=" + city + "&aqi=" + aqi);
  const data = await res.json();
  if (data.error) throw new Error(data.error);
  return data;
}

export function DisplayWeather({ weather }) {
  if (!weather || !weather.location) {
    return null;
  }
  return (
    <div className="weather-display">
      <h2>{weather.location.name}</h2>
      <section className="weather-card">
        <img
          src={`https:${weather.current.condition.icon}`}
          alt={weather.current.condition.text}
        ></img>
        <h3> Time: {weather.location.localtime}</h3>
        <p>Temp: {weather.current.temp_f}</p>
        <p>Feels Like: {weather.current.feelslike_f}</p>
        <p>Condition: {weather.current.condition.text}</p>
      </section>
    </div>
  );

  // {weather && (
  //     <div>
  //       <h2>{weather.location.name}</h2>
  //       <section className="weather-card">
  //         <h3>Time: {weather.location.localtime}</h3>
  //         <p>Temp: {weather.current.temp_f}</p>
  //         <p>Feels Like: {weather.current.feelslike_f}</p>
  //         <p>Condition: {weather.current.condition.text}</p>
  //       </section>
  //     </div>
  // )}
}
