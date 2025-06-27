import { render } from '@testing-library/react';
import { WeatherCardStyled } from '../components/styles';

test('WeatherCardStyled renders correctly', () => {
  const { container } = render(
    <WeatherCardStyled condition="Clear">Sunny</WeatherCardStyled>
  );
  expect(container.firstChild).toMatchSnapshot();
});
