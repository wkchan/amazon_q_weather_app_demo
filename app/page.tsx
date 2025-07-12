'use client';

import { useState } from 'react';
import { WeatherData } from './types';
import { fetchWeatherData } from './weatherService';

export default function Home() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleWeatherSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!city.trim()) return;

    setLoading(true);
    setError('');
    
    try {
      const data = await fetchWeatherData(city);
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
      
      <form onSubmit={handleWeatherSearch} className="search-form">
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