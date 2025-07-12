'use client';

import { useState } from 'react';
import { WeatherData } from './types';

export default function Home() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchWeather = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!city.trim()) return;

    setLoading(true);
    setError('');
    
    try {
      const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      
      if (!response.ok) {
        throw new Error('City not found');
      }
      
      const data: WeatherData = await response.json();
      setWeather(data);
    } catch (err) {
      setError('Failed to fetch weather data. Please check the city name.');
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1 className="title">Weather Portal</h1>
      
      <form onSubmit={fetchWeather} className="search-form">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name..."
          className="search-input"
        />
        <button 
          type="submit" 
          disabled={loading}
          className="search-button"
        >
          {loading ? 'Loading...' : 'Search'}
        </button>
      </form>

      {error && (
        <div className="error">
          {error}
        </div>
      )}

      {weather && (
        <div className="weather-card">
          <h2 className="city-name">
            {weather.name}, {weather.sys.country}
          </h2>
          
          <div className="temperature">
            {Math.round(weather.main.temp)}°C
          </div>
          
          <div className="description">
            {weather.weather[0].description}
          </div>
          
          <div className="weather-details">
            <div className="detail-item">
              <div className="detail-label">Feels like</div>
              <div className="detail-value">{Math.round(weather.main.feels_like)}°C</div>
            </div>
            <div className="detail-item">
              <div className="detail-label">Humidity</div>
              <div className="detail-value">{weather.main.humidity}%</div>
            </div>
            <div className="detail-item">
              <div className="detail-label">Pressure</div>
              <div className="detail-value">{weather.main.pressure} hPa</div>
            </div>
            <div className="detail-item">
              <div className="detail-label">Wind Speed</div>
              <div className="detail-value">{weather.wind.speed} m/s</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}