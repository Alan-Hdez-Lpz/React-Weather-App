import { useState, useEffect } from 'react';
import WeatherCard from './WeatherCard';
import { Container } from './styles';

const API_KEY = 'YOUR_API_KEY';

export default function WeatherApp() {
  const [cityName, setCity] = useState('Mexico city');
  const [query, setQuery] = useState('Mexico city');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchWeather(cityName) {
        setLoading(true);
        setError(null);
        try {
        const res = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`
        );
        if (!res.ok) throw new Error('City not found');
        const data = await res.json();
        setWeather(data);
        } catch (err) {
        setError(err.message);
        } finally {
        setLoading(false);
        }
    }
    fetchWeather(cityName);
  }, [cityName]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      setCity(query.trim());
    }
  };

  return (
    <Container>
      <h1>Current Weather</h1>
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
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
         <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <>
          <h2>{weather.name}</h2>
          <WeatherCard weather={weather} />
        </>
      )}
    </Container>
  );
}
