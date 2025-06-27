import { WeatherCardStyled } from './styles';

export default function WeatherCard({ weather }) {
  const condition = weather?.weather?.[0]?.main || 'Unknown';

  return (
    <WeatherCardStyled condition={condition}>
      <h2>{condition}</h2>
      <p>Temperature: {weather?.main?.temp ?? '--'} °C</p>
      <p>Humidity: {weather?.main?.humidity ?? '--'}%</p>
      <p>Wind: {weather?.wind?.speed ?? '--'} m/s</p>
    </WeatherCardStyled>
  );
}
