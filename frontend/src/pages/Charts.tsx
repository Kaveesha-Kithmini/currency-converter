import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { fetchExchangeRates } from '../services/api';
import CurrencySelect from '../components/charts/CurrencySelect';
import ExchangeRateDisplay from '../components/charts/ExchangeRateDisplay';
import TimeframeSelector from '../components/charts/TimeframeSelector';
import RateChart from '../components/charts/RateChart';

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
`;

const TopBar = styled.div`
  max-width: 1200px;
  margin: 0 auto 1rem auto;
  padding: 0.5rem 0;
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: white;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 8px;
  color: ${props => props.theme.colors.primary};
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

  &:hover {
    transform: translateX(-4px);
    background: ${props => props.theme.colors.background};
  }

  &:active {
    transform: translateX(-2px);
  }
`;

const BackIcon = styled.span`
  font-size: 1.2rem;
`;

const Title = styled.h1`
  color: #0a1a3c; // Dark blue color
  text-align: center;
  margin-bottom: 1rem;
  font-size: 1.8rem;
  font-weight: 600;
`;

const Subtitle = styled.h2`
  color: #1e2a47; // Slightly lighter dark blue
  text-align: center;
  margin-bottom: 2rem;
  font-size: 1rem;
  opacity: 0.9;
`;

const ChartContainer = styled.div`
  background: #FFFDD0; // Very light butter color
  border-radius: 12px;
  padding: 2rem;
  margin-top: 2rem;
  box-shadow: 0 4px 6px rgba(212, 175, 55, 0.1); // Butter-colored shadow
`;

const SelectionContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
  background: #FFF8DC; // Cream butter color
  padding: 1rem;
  border-radius: 8px;
`;

export type Timeframe = '12H' | '1D' | '1W' | '1M' | '1Y' | '2Y' | '5Y';

interface ChartDataPoint {
  date: string;
  rate: number;
}

const Charts: React.FC = () => {
  const navigate = useNavigate();
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('LKR');
  const [timeframe, setTimeframe] = useState<Timeframe>('1Y');
  const [exchangeRate, setExchangeRate] = useState<number | null>(null);
  const [percentChange, setPercentChange] = useState<number | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Function to get currency full name
  const getCurrencyFullName = (code: string) => {
    const currencyNames: { [key: string]: string } = {
      'LKR': 'Sri Lankan Rupee',
      'USD': 'US Dollar',
      'EUR': 'Euro',
      'GBP': 'British Pound',
      // Add more currencies as needed
    };
    return currencyNames[code] || code;
  };

  const generateMockData = (timeframe: Timeframe): ChartDataPoint[] => {
    const now = new Date();
    const data: ChartDataPoint[] = [];
    let points: number;
    let interval: number;

    switch (timeframe) {
      case '12H':
        points = 12;
        interval = 60 * 60 * 1000; // 1 hour in milliseconds
        break;
      case '1D':
        points = 24;
        interval = 60 * 60 * 1000; // 1 hour in milliseconds
        break;
      case '1W':
        points = 7;
        interval = 24 * 60 * 60 * 1000; // 1 day in milliseconds
        break;
      case '1M':
        points = 30;
        interval = 24 * 60 * 60 * 1000; // 1 day in milliseconds
        break;
      case '1Y':
        points = 12;
        interval = 30 * 24 * 60 * 60 * 1000; // ~1 month in milliseconds
        break;
      case '2Y':
        points = 24;
        interval = 30 * 24 * 60 * 60 * 1000; // ~1 month in milliseconds
        break;
      case '5Y':
        points = 60;
        interval = 30 * 24 * 60 * 60 * 1000; // ~1 month in milliseconds
        break;
      default:
        points = 12;
        interval = 30 * 24 * 60 * 60 * 1000;
    }

    // Generate data points
    for (let i = points - 1; i >= 0; i--) {
      const date = new Date(now.getTime() - (i * interval));
      // Generate a random rate between 95 and 105
      const baseRate = 100;
      const variation = Math.random() * 10 - 5; // Random number between -5 and 5
      const rate = baseRate + variation;
      
      data.push({
        date: date.toISOString(),
        rate: rate
      });
    }

    return data;
  };

  // Update chart data when currencies or timeframe changes
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Generate mock data based on timeframe
        const mockData = generateMockData(timeframe);
        setChartData(mockData);
        
        // Set the current exchange rate as the last data point
        const lastPoint = mockData[mockData.length - 1];
        setExchangeRate(lastPoint.rate);
        
        // Calculate percent change
        const firstPoint = mockData[0];
        const percentChange = ((lastPoint.rate - firstPoint.rate) / firstPoint.rate) * 100;
        setPercentChange(percentChange);
        
        setLastUpdated(new Date());
      } catch (err) {
        setError('Failed to fetch exchange rate data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [fromCurrency, toCurrency, timeframe]);

  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <PageContainer>
      <TopBar>
        <BackButton onClick={() => navigate('/')}>
          <BackIcon>←</BackIcon>
          Back to Home
        </BackButton>
      </TopBar>

      <Title>
        {getCurrencyFullName(fromCurrency)} to {getCurrencyFullName(toCurrency)} Exchange Rate Chart
      </Title>
      <Subtitle>Historical Currency Exchange Rates Chart</Subtitle>

      <SelectionContainer>
        <CurrencySelect
          fromCurrency={fromCurrency}
          toCurrency={toCurrency}
          onFromCurrencyChange={setFromCurrency}
          onToCurrencyChange={setToCurrency}
          onSwap={handleSwapCurrencies}
        />
      </SelectionContainer>

      <ExchangeRateDisplay
        fromCurrency={fromCurrency}
        toCurrency={toCurrency}
        rate={exchangeRate}
        percentChange={percentChange}
        lastUpdated={lastUpdated}
      />

      <ChartContainer>
        <TimeframeSelector
          selectedTimeframe={timeframe}
          onTimeframeChange={setTimeframe}
        />
        <RateChart
          data={chartData}
          loading={loading}
          error={error}
          timeframe={timeframe}
        />
      </ChartContainer>
    </PageContainer>
  );
};

export default Charts; 