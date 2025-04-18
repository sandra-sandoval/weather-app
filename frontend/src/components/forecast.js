import React, { useState } from "react";
import "./forecast.css";

export async function FetchForecast(city, aqi, days) {
  console.log("city: " + city);
  const res = await fetch(
    "/forecast?city=" + city + "&aqi=" + aqi + "&days=" + days
  );
  const data = await res.json();
  if (data.error) throw new Error(data.error);
  return data;
}

export function DisplayForecast({ forecast }, { aqi }) {
  if (!forecast || !forecast.location) {
    return null;
  }
  return (
    <div className="weather-display">
      <h2>
        {forecast.location.name}, {forecast.location.country}
      </h2>
      <div className="forecast-container">
        {forecast.forecast.forecastday.map((day) => (
          <section key={day.date} className="weather-card">
            <img
              src={`https:${day.day.condition.icon}`}
              alt={day.day.condition.text}
            ></img>
            <h3>{day.date}</h3>
            {/* <p>Max temp: {day.day.maxtemp_f}</p>
           <p>Min temp: {day.day.mintemp_f}</p> */}
            <div className="info">
              <p>Avg temp: {day.day.avgtemp_f}</p>
              <p>Condition: {day.day.condition.text} </p>
              <p>Chance of rain: {day.day.daily_chance_of_rain}%</p>
              {aqi === "yes" && day.day.air_quality && (
                <div id="Air Quality">
                  <p>Air Quality: </p>
                  <ul>
                    <li>US EPA Index: {day.day.air_quality["us-epa-index"]}</li>
                    <li> PM2.5: {day.day.air_quality.pm2_5}</li>
                    <li>O3: {day.day.air_quality.o3}</li>
                  </ul>
                </div>
              )}
            </div>
          </section>
        ))}
      </div>
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
