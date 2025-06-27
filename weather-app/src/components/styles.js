import styled from 'styled-components';

export const Container = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const CardGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const WeatherCardStyled = styled.div`
  background-color: ${({ condition }) =>
    condition === 'Clear' ? '#ffeb3b' :
    condition === 'Rain' ? '#90caf9' :
    condition === 'Clouds' ? '#cfd8dc' :
    condition === 'Snow' ? '#e1f5fe' :
    '#e0e0e0'};
  color: #333;
  padding: 1.5rem;
  border-radius: 12px;
  width: 260px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;

  h2 {
    margin-bottom: 0.5rem;
  }

  @media (max-width: 768px) {
    width: 90%;
  }
`;
