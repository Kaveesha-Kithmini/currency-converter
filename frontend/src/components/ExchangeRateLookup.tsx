import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const Card = styled.div`
  background: ${({ theme }) => theme.colors.card};
  padding: 2rem;
  border-radius: 16px;
  max-width: 600px;
  margin: 2rem auto;
  box-shadow: 0 4px 24px rgba(0,0,0,0.2);
`;

const Label = styled.label`
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 0.5rem;
  display: block;
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.input};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 1rem;
  font-size: 1rem;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
`;

const Th = styled.th`
  background: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.text};
  padding: 0.75rem;
`;

const Td = styled.td`
  color: ${({ theme }) => theme.colors.text};
  padding: 0.75rem;
  text-align: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const ErrorMsg = styled.div`
  color: ${({ theme }) => theme.colors.error};
  text-align: center;
  margin-top: 1rem;
`;

const currencies = [
  { code: 'USD', name: 'US Dollar' },
  { code: 'EUR', name: 'Euro' },
  { code: 'GBP', name: 'British Pound' },
  { code: 'INR', name: 'Indian Rupee' },
  { code: 'LKR', name: 'Sri Lankan Rupee' },
  { code: 'JPY', name: 'Japanese Yen' },
  { code: 'AUD', name: 'Australian Dollar' },
  { code: 'CAD', name: 'Canadian Dollar' },
  // Add more as needed
];

const ExchangeRateLookup: React.FC = () => {
  const [base, setBase] = useState('USD');
  const [rates, setRates] = useState<{ [key: string]: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchRates = async (currency: string) => {
    setError(null);
    setRates(null);
    setLoading(true);
    try {
      const res = await axios.get(`https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_UzuX4i3pH0Zbcb9ScXzaaShfhvjw6oAy1A5Aoa2A&base_currency=${currency}`);
      setRates(res.data.data);
    } catch (e: any) {
      setError('Failed to fetch rates. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchRates(base);
    // eslint-disable-next-line
  }, [base]);

  return (
    <Card>
      <Label htmlFor="base">Base Currency</Label>
      <Select id="base" value={base} onChange={e => setBase(e.target.value)}>
        {currencies.map(c => <option key={c.code} value={c.code}>{c.code} - {c.name}</option>)}
      </Select>
      {loading && <div style={{ color: '#fff', textAlign: 'center' }}>Loading...</div>}
      {error && <ErrorMsg>{error}</ErrorMsg>}
      {rates && (
        <Table>
          <thead>
            <tr>
              <Th>Currency</Th>
              <Th>Rate</Th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(rates)
              .filter(([code]) => code !== base)
              .map(([code, rate]) => (
                <tr key={code}>
                  <Td>{code}</Td>
                  <Td>{rate}</Td>
                </tr>
              ))}
          </tbody>
        </Table>
      )}
    </Card>
  );
};

export default ExchangeRateLookup; 