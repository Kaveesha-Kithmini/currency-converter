import React from 'react';
import styled from 'styled-components';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  TooltipProps,
} from 'recharts';
import { Timeframe } from '../../pages/Charts';

const ChartWrapper = styled.div`
  width: 100%;
  height: 400px;
  background: #FFFDD0;
  border-radius: 8px;
  padding: 1rem;
`;

const LoadingOverlay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400px;
  background: #FFFDD0;
  color: #D4AF37;
  font-size: 1.1rem;
`;

const ErrorOverlay = styled(LoadingOverlay)`
  color: ${({ theme }) => theme.colors.error};
`;

interface RateChartProps {
  data: any[];
  loading: boolean;
  error: string | null;
  timeframe: Timeframe;
}

const formatDate = (date: string, timeframe: Timeframe) => {
  const dateObj = new Date(date);
  switch (timeframe) {
    case '12H':
    case '1D':
      return dateObj.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      });
    case '1W':
      return dateObj.toLocaleDateString([], {
        weekday: 'short'
      });
    case '1M':
      return dateObj.toLocaleDateString([], {
        month: 'short',
        day: 'numeric'
      });
    case '1Y':
    case '2Y':
    case '5Y':
      return dateObj.toLocaleDateString([], {
        month: 'short',
        year: 'numeric'
      });
    default:
      return date;
  }
};

interface CustomTooltipProps extends TooltipProps<number, string> {
  timeframe: Timeframe;
}

const CustomTooltip = ({ active, payload, label, timeframe }: CustomTooltipProps) => {
  if (active && payload && payload.length > 0) {
    const value = payload[0].value;
    const formattedValue = typeof value === 'number' ? value.toFixed(6) : value;
    
    return (
      <div
        style={{
          background: '#FFFDD0',
          padding: '10px',
          border: '1px solid #D4AF37',
          borderRadius: '4px',
        }}
      >
        <p style={{ margin: 0, color: '#C5A14E' }}>
          {`Date: ${formatDate(label || '', timeframe)}`}
        </p>
        <p style={{ margin: 0, color: '#D4AF37' }}>
          {`Rate: ${formattedValue}`}
        </p>
      </div>
    );
  }
  return null;
};

const RateChart: React.FC<RateChartProps> = ({
  data,
  loading,
  error,
  timeframe,
}) => {
  if (loading) {
    return <LoadingOverlay>Loading chart data...</LoadingOverlay>;
  }

  if (error) {
    return <ErrorOverlay>{error}</ErrorOverlay>;
  }

  return (
    <ChartWrapper>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#E6D27F" />
          <XAxis
            dataKey="date"
            tickFormatter={(value) => formatDate(value, timeframe)}
            stroke="#C5A14E"
            interval={timeframe === '1W' ? 0 : 'preserveStartEnd'}
          />
          <YAxis
            domain={['auto', 'auto']}
            tickFormatter={(value) => value.toFixed(6)}
            stroke="#C5A14E"
          />
          <Tooltip content={<CustomTooltip timeframe={timeframe} />} />
          <Line
            type="monotone"
            dataKey="rate"
            stroke="#D4AF37"
            strokeWidth={2}
            dot={timeframe === '1W' || timeframe === '1M'}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
};

export default RateChart; 