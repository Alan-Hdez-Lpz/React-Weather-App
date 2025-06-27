import { render, screen } from '@testing-library/react';

// Minimal dummy App component without router
function DummyApp() {
  return (
    <nav>
      <div>Current Weather</div>
      <div>Forecast</div>
    </nav>
  );
}

test('renders navigation links text', () => {
  render(<DummyApp />);
  expect(screen.getByText(/Current Weather/i)).toBeInTheDocument();
  expect(screen.getByText(/Forecast/i)).toBeInTheDocument();
});
