import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Forecast from '../components/Forecast';

beforeEach(() => {
  global.fetch = jest.fn((url) => {
    const city = url.includes('London') ? 'London' : 'Mexico city';

    return Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve({
          city: { name: city },
          list: [
            {
              dt: 1751006400, // Fri, June 27, 2025 12:00:00 GMT
              dt_txt: '2025-06-27 12:00:00',
              main: { temp: 22, humidity: 50 },
              weather: [{ main: 'Clouds' }],
              wind: { speed: 4 },
            },
          ],
        }),
    });
  });

  fetch.mockClear();
});

test('renders forecast and displays weather for initial city', async () => {
  render(<Forecast />);

  expect(screen.getByText(/5-Day Forecast/i)).toBeInTheDocument();
  expect(screen.getByText(/Loading forecast/i)).toBeInTheDocument();

  const weekday = await screen.findByText(/Friday/i);
  expect(weekday).toBeInTheDocument();
  expect(screen.getByText(/Mexico city/i)).toBeInTheDocument();
  expect(screen.getByText(/Temperature:/i)).toBeInTheDocument();
  expect(screen.getByText(/Humidity:/i)).toBeInTheDocument();
  expect(screen.getByText(/Wind:/i)).toBeInTheDocument();
});

test('searches for a new city and updates forecast', async () => {
  render(<Forecast />);

  const input = screen.getByPlaceholderText(/Enter city/i);
  fireEvent.change(input, { target: { value: 'London' } });
  fireEvent.click(screen.getByText(/Search/i));

  await waitFor(() => {
    expect(screen.getByText(/London/i)).toBeInTheDocument();
    expect(screen.getByText(/Friday/i)).toBeInTheDocument();
  });
});

test('handles API error gracefully', async () => {
  fetch.mockImplementationOnce(() => Promise.resolve({ ok: false }));

  render(<Forecast />);

  await waitFor(() => {
    expect(screen.getByText(/City not found/i)).toBeInTheDocument();
  });
});
