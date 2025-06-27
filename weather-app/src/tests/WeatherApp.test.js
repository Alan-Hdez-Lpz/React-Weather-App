import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import WeatherApp from '../components/WeatherApp';

// Dynamic fetch mock
beforeEach(() => {
  global.fetch = jest.fn((url) => {
    const city = url.includes('Tokyo') ? 'Tokyo' : 'Mexico City';

    return Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve({
          name: city,
          main: { temp: 22, humidity: 60 },
          wind: { speed: 3 },
          weather: [{ main: 'Clear' }],
        }),
    });
  });

  fetch.mockClear();
});

test('renders title and input', async () => {
  render(<WeatherApp />);

  expect(screen.getByText(/Current Weather/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Enter city/i)).toBeInTheDocument();

  const cityHeader = await screen.findByText(/Mexico City/i);
  expect(cityHeader).toBeInTheDocument();
});

test('shows loading and fetches data', async () => {
  render(<WeatherApp />);
  expect(screen.getByText(/Loading/i)).toBeInTheDocument();

  const city = await screen.findByText(/Mexico City/i);
  expect(city).toBeInTheDocument();
  expect(screen.getByText(/Temperature:/i)).toBeInTheDocument();
});

test('searches and updates city to Tokyo', async () => {
  render(<WeatherApp />);

  const input = screen.getByPlaceholderText(/Enter city/i);
  fireEvent.change(input, { target: { value: 'Tokyo' } });
  fireEvent.click(screen.getByText(/Search/i));

  await waitFor(() => {
    expect(screen.getByText(/Tokyo/i)).toBeInTheDocument();
  });
});

test('handles API error gracefully', async () => {
  // Simulate failed fetch
  fetch.mockImplementationOnce(() => Promise.resolve({ ok: false }));

  render(<WeatherApp />);

  await waitFor(() => {
    expect(screen.getByText(/City not found/i)).toBeInTheDocument();
  });
});
