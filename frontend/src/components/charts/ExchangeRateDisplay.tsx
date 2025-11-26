import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  margin: 2rem 0;
`;

const Rate = styled.div`
  font-size: 2rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
`;

const PercentChange = styled.div<{ isPositive?: boolean }>`
  font-size: 1.1rem;
  color: ${({ isPositive, theme }) =>
    isPositive ? theme.colors.success : theme.colors.error};
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const LastUpdated = styled.div`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textLight};
`;

interface ExchangeRateDisplayProps {
  fromCurrency: string;
  toCurrency: string;
  rate: number | null;
  percentChange: number | null;
  lastUpdated: Date | null;
}

const ExchangeRateDisplay: React.FC<ExchangeRateDisplayProps> = ({
  fromCurrency,
  toCurrency,
  rate,
  percentChange,
  lastUpdated,
}) => {
  if (!rate) return null;

  const formatDate = (date: Date) => {
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short',
    });
  };

  return (
    <Container>
      <Rate>
        1 {fromCurrency} = {rate.toFixed(6)} {toCurrency}
      </Rate>
      {percentChange !== null && (
        <PercentChange isPositive={percentChange >= 0}>
          {percentChange >= 0 ? '↑' : '↓'} {Math.abs(percentChange).toFixed(2)}%
        </PercentChange>
      )}
      {lastUpdated && (
        <LastUpdated>Last updated: {formatDate(lastUpdated)}</LastUpdated>
      )}
    </Container>
  );
};

export default ExchangeRateDisplay; 