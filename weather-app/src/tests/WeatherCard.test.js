import { render, screen } from '@testing-library/react';
import WeatherCard from '../components/WeatherCard';

test('displays weather details correctly', () => {
  const mockWeather = {
    main: { temp: 22, humidity: 55 },
    wind: { speed: 3 },
    weather: [{ main: 'Rain' }],
  };

  render(<WeatherCard weather={mockWeather} />);

  expect(screen.getByText(/Temperature:/i)).toHaveTextContent('22');
  expect(screen.getByText(/Humidity:/i)).toHaveTextContent('55');
  expect(screen.getByText(/Wind:/i)).toHaveTextContent('3');
  expect(screen.getByText(/Rain/i)).toBeInTheDocument();
});
