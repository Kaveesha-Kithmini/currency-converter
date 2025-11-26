import React from 'react';
import styled from 'styled-components';
import { Timeframe } from '../../pages/Charts';

const Container = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
  background: #FFF8DC;
  padding: 1rem;
  border-radius: 8px;
`;

const TimeButton = styled.button<{ active?: boolean }>`
  padding: 0.5rem 1rem;
  border: 1px solid #D4AF37;
  border-radius: 4px;
  background: ${({ active }) => active ? '#D4AF37' : '#FFFDD0'};
  color: ${({ active }) => active ? '#FFFFFF' : '#C5A14E'};
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;

  &:hover {
    background: ${({ active }) => active ? '#C5A14E' : '#FFF8DC'};
    border-color: #C5A14E;
  }
`;

interface TimeframeSelectorProps {
  selectedTimeframe: Timeframe;
  onTimeframeChange: (timeframe: Timeframe) => void;
}

const timeframes: { label: string; value: Timeframe }[] = [
  { label: '12H', value: '12H' },
  { label: '1D', value: '1D' },
  { label: '1W', value: '1W' },
  { label: '1M', value: '1M' },
  { label: '1Y', value: '1Y' },
  { label: '2Y', value: '2Y' },
  { label: '5Y', value: '5Y' },
];

const TimeframeSelector: React.FC<TimeframeSelectorProps> = ({
  selectedTimeframe,
  onTimeframeChange,
}) => {
  return (
    <Container>
      {timeframes.map(({ label, value }) => (
        <TimeButton
          key={value}
          active={selectedTimeframe === value}
          onClick={() => onTimeframeChange(value)}
        >
          {label}
        </TimeButton>
      ))}
    </Container>
  );
};

export default TimeframeSelector; 