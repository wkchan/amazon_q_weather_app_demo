import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Home from '../page';
import * as weatherService from '../weatherService';

jest.mock('../weatherService');

describe('Weather Portal', () => {
  test('shouldDisplaySearchForm', () => {
    render(<Home />);
    
    expect(screen.getByPlaceholderText('Enter city name...')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();
  });

  test('shouldDisplayWeatherDataAfterSuccessfulSearch', async () => {
    const mockWeatherData = {
      name: 'London',
      main: { temp: 20, feels_like: 18, humidity: 65, pressure: 1013 },
      weather: [{ main: 'Clear', description: 'clear sky', icon: '01d' }],
      wind: { speed: 3.5 },
      sys: { country: 'GB' }
    };

    jest.spyOn(weatherService, 'fetchWeatherData').mockResolvedValue(mockWeatherData);

    render(<Home />);
    
    fireEvent.change(screen.getByPlaceholderText('Enter city name...'), {
      target: { value: 'London' }
    });
    fireEvent.click(screen.getByRole('button', { name: 'Search' }));

    await waitFor(() => {
      expect(screen.getByText('London, GB')).toBeInTheDocument();
      expect(screen.getByText('20°C')).toBeInTheDocument();
    });
  });
});