import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  // State to store the weather data fetched from the API
  const [data, setData] = useState({});
  
  // State to store the location input by the user
  const [location, setLocation] = useState('');

  // Your OpenWeatherMap API key and the base URL for fetching weather data
  const apiKey = '895284fb2d2c50a520ea537456963d9c';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=${apiKey}`;

  // Function to handle searching for weather data when the user presses Enter
  const searchLocation = async (event) => {
    if (event.key === 'Enter') {
      try {
        // Fetching weather data from the API asynchronously
        const response = await axios.get(url);
        
        // Storing the fetched data in the state
        setData(response.data);
        
        // Logging the data to the console for debugging purposes
        console.log(response.data);
      } catch (error) {
        // Error handling in case the API call fails
        console.error('Error fetching weather data:', error);
      }
      
      // Resetting the location input after the search
      setLocation('');
    }
  };

  return (
    <div className="app">
      <div className="search">
        {/* Input field where users enter the location */}
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder="Enter Location"
          type="text"
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            {/* Displaying the location name if data is available */}
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {/* Displaying the temperature if data is available */}
            {data.main ? <h1>{data.main.temp.toFixed()}°F</h1> : null}
          </div>
          <div className="description">
            {/* Displaying the weather description if data is available */}
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>

        {/* Displaying additional weather details if the location data is available */}
        {data.name && (
          <div className="bottom">
            <div className="feels">
              {/* Displaying the 'Feels Like' temperature if data is available */}
              {data.main ? <p className="bold">{data.main.feels_like.toFixed()}°F</p> : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {/* Displaying the humidity if data is available */}
              {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {/* Displaying the wind speed if data is available */}
              {data.wind ? <p className="bold">{data.wind.speed.toFixed()} MPH</p> : null}
              <p>Wind Speed</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;