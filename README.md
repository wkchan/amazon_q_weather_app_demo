# Weather Portal

A simple weather portal built with Next.js and TypeScript that displays current weather information for any city.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Get a free API key from [OpenWeatherMap](https://openweathermap.org/api)

3. Update `.env.local` with your API key:
   ```
   NEXT_PUBLIC_WEATHER_API_KEY=your_actual_api_key_here
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Features

- Search weather by city name
- Display current temperature, weather description
- Show additional details: feels like, humidity, pressure, wind speed
- Responsive design with clean UI
- Error handling for invalid cities

## Tech Stack

- Next.js 14 with App Router
- TypeScript
- OpenWeatherMap API
- CSS3 with modern styling