import { useEffect, useState } from 'react';
import WeatherCard from './WeatherCard';
import { Container, CardGrid } from './styles';

const API_KEY = 'YOUR_API_KEY';

export default function Forecast() {
  const [cityName, setCity] = useState('Mexico city');
  const [query, setQuery] = useState('Mexico city');
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchForecast(cityName) {
      setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=${API_KEY}`
      );
      if (!res.ok) throw new Error('City not found');
      const data = await res.json();
      const daily = data.list.filter(item => item.dt_txt.includes('12:00:00'));
      setForecast(daily);
    } catch (err) {
      setError(err.message);
      setForecast([]);
    } finally {
      setLoading(false);
    }
    }
    fetchForecast(cityName);
  }, [cityName]);

   const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      setCity(query.trim());
    }
  };

  return (
    <Container>
      <h1>5-Day Forecast</h1>

      <form onSubmit={handleSearch} style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Enter city"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ padding: '0.5rem', fontSize: '1rem', marginRight: '0.5rem' }}
        />
        <button type="submit" style={{ padding: '0.5rem 1rem' }}>Search</button>
      </form>

      <h2>{cityName}</h2>

      {loading ? (
        <p>Loading forecast...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <CardGrid>
          {forecast.map(day => {
            const date = new Date(day.dt_txt);
            const weekday = date.toLocaleDateString('en-US', { weekday: 'long' });

            return (
              <div key={day.dt}>
                <h3>{weekday}</h3>
                <WeatherCard
                  weather={{
                    weather: day.weather,
                    main: day.main,
                    wind: day.wind,
                    name: cityName,
                  }}
                />
              </div>
            );
          })}
        </CardGrid>
      )}
    </Container>
  );
}
