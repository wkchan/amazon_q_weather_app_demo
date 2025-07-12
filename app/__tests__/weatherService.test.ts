import { fetchWeatherData } from '../weatherService';

describe('WeatherService', () => {
  test('shouldFetchWeatherDataForValidCity', async () => {
    const mockWeatherData = {
      name: 'London',
      main: { temp: 20, feels_like: 18, humidity: 65, pressure: 1013 },
      weather: [{ main: 'Clear', description: 'clear sky', icon: '01d' }],
      wind: { speed: 3.5 },
      sys: { country: 'GB' }
    };

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockWeatherData)
    });

    const result = await fetchWeatherData('London');
    
    expect(result).toEqual(mockWeatherData);
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('London')
    );
  });

  test('shouldThrowErrorForInvalidCity', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 404
    });

    await expect(fetchWeatherData('InvalidCity'))
      .rejects
      .toThrow('City not found');
  });
});