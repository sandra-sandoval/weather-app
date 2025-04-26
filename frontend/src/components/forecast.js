import React, { useState } from "react";
import "./forecast.css";

export async function FetchForecast(city, degree, days) {
  console.log("city: " + city);
  const res = await fetch(
    "/forecast?city=" + city + "&aqi=no" + "&days=" + days
  );
  const data = await res.json();
  if (data.error) throw new Error(data.error);
  return data;
}

export function DisplayForecast({ forecast }, { degree }) {
  if (!forecast || !forecast.location) {
    return null;
  }
  return (
    <div className="forecast-display">
      <h2>
        📍{forecast.location.name}, {forecast.location.country}
      </h2>
      <div className="forecast-container">
        {forecast.forecast.forecastday.map((day) => (
          <section key={day.date} className="weather-card">
            <img
              src={`https:${day.day.condition.icon}`}
              alt={day.day.condition.text}
            ></img>
            <h3>{day.date}</h3>
            <div className="f-info">
              <div className="f-p-sec">
                <p>Avg temp:</p>
                <p>
                  {degree === "F"
                    ? day.day.avgtemp_f + "°F"
                    : day.day.avgtemp_c + "°C"}
                </p>
              </div>
              <div className="f-p-sec">
                <p>Min temp:</p>
                <p>
                  {degree === "F"
                    ? day.day.mintemp_f + "°F"
                    : day.day.mintemp_c + "°C"}
                </p>
              </div>
              <div className="f-p-sec">
                <p>Max temp:</p>
                <p>
                  {degree === "F"
                    ? day.day.maxtemp_f + "°F"
                    : day.day.maxtemp_c + "°C"}
                </p>
              </div>
              <div className="f-p-sec">
                <p>Condition:</p>
                <p>{day.day.condition.text}</p>
              </div>
              <div className="f-p-sec">
                <p>Chance of rain:</p>
                <p>{day.day.daily_chance_of_rain}%</p>
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
