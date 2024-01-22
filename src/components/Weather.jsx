import React, { useEffect, useState } from "react";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const cityName = "Toronto";
  const apiKey = "5261b96a2fec55c101eb1f095c74b537";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;

  const fetchData = async () => {
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(
          `Failed to fetch data from the defined resource: Status ${response.status}`
        );
      } else {
        const data = await response.json();
        setWeatherData(data);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleChange = (e) => {
    setCity(e.target.value);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h1>WEATHER DATA</h1>
      <div className="inputContainer">
        <input
          type="text"
          id="cityInput"
          placeholder="Enter your city.."
          value={city}
          onChange={handleChange}
        />
        <button onClick={fetchData}>GET WEATHER DATA</button>
        {error ? (
          <p>Error: {error}</p>
        ) : (
          weatherData && (
            <div className="weatherData">
              <p>City: {weatherData.name}</p>
              <p>Temperature: {weatherData.main.temp} &deg;C</p>
              <p>Description: {weatherData.weather[0].description}</p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Weather;
