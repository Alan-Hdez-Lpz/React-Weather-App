import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import WeatherApp from './components/WeatherApp';
import Forecast from './components/Forecast';

export default function App() {
  return (
    <Router>
      <nav style={{ padding: '1rem', background: '#282c34' }}>
        <Link to="/" style={{ color: '#61dafb', marginRight: '1rem' }}>Current Weather</Link>
        <Link to="/forecast" style={{ color: '#61dafb' }}>Forecast</Link>
      </nav>
      <Routes>
        <Route path="/" element={<WeatherApp />} />
        <Route path="/forecast" element={<Forecast />} />
      </Routes>
    </Router>
  );
}
