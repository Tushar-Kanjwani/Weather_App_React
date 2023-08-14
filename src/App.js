import React, { useState, useEffect } from "react";
import axios from 'axios';

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');

  const searchLocation = async () => {
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=9&appid=e3419a97f4c534b57cb83accc1fb2a77`;
    
    try {
      const response = await axios.get(url);
      setData(response.data[0]);
      setLocation('');
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (data.name) {
      const fetchWeatherData = async () => {
        const weatherUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${data.lat}&lon=${data.lon}&appid=e3419a97f4c534b57cb83accc1fb2a77`;
        
        try {
          const response = await axios.get(weatherUrl);
          setData(prevData => ({ ...prevData, weather: response.data }));
        } catch (error) {
          console.error(error);
        }
      };

      fetchWeatherData();
    }
  }, [data]);

  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyUp={(event) => {
            if (event.keyCode === 13) {
              searchLocation();
            }
          }}
          placeholder="Enter Location"
          type="text"
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.weather ? <h1>{(1.8*(data.weather.main.temp-273)+32).toFixed()} °F</h1> : null}
          </div>
          <div className="description">
            <p>{data.weather ? data.weather.weather[0].description : null}</p>
          </div>
        </div>
        <div className="bottom">
          <div className="feels">
            <p className="bold">{data.weather ? 
            (1.8*(data.weather.main.feels_like-273.15)+32).toFixed() : null} °F</p>
            <p>Feels Like</p>
          </div>
          <div className="humidity">
            <p className="bold">{data.weather ? data.weather.main.humidity : null}%</p>
            <p>Humidity</p>
          </div>
          <div className="wind">
            <p className="bold">{data.weather ? data.weather.wind.speed.toFixed() : null} MPH</p>
            <p>Wind Speed</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
