import { WeatherData } from './types';

export async function fetchWeatherData(city: string): Promise<WeatherData> {
  const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
  );
  
  if (!response.ok) {
    throw new Error('City not found');
  }
  
  return response.json();
}