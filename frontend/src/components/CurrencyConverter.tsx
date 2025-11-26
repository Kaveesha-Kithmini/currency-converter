import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { fetchExchangeRates } from '../services/api';

const ConverterContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;

const InputGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const Input = styled.input`
  flex: 1;
  padding: 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  background: ${({ theme }) => theme.colors.input};
  color: ${({ theme }) => theme.colors.text};
`;

const Select = styled.select`
  padding: 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  background: ${({ theme }) => theme.colors.input};
  color: ${({ theme }) => theme.colors.text};
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  background: ${({ theme }) => theme.colors.button};
  color: ${({ theme }) => theme.colors.buttonText};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.accent};
  }
`;

const Result = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  background: ${({ theme }) => theme.colors.card};
  border-radius: 4px;
  text-align: center;
`;

const CurrencyConverter: React.FC = () => {
  const [amount, setAmount] = useState<string>('1');
  const [fromCurrency, setFromCurrency] = useState<string>('USD');
  const [toCurrency, setToCurrency] = useState<string>('EUR');
  const [result, setResult] = useState<number | null>(null);
  const [rates, setRates] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadRates = async () => {
      try {
        const data = await fetchExchangeRates();
        setRates(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load exchange rates');
        setLoading(false);
      }
    };

    loadRates();
  }, []);

  const handleConvert = () => {
    if (!rates[toCurrency] || !rates[fromCurrency]) {
      setError('Invalid currency selection');
      return;
    }

    const amountNum = parseFloat(amount);
    if (isNaN(amountNum)) {
      setError('Please enter a valid amount');
      return;
    }

    const result = (amountNum * rates[toCurrency]) / rates[fromCurrency];
    setResult(result);
    setError(null);
  };

  if (loading) {
    return <div>Loading exchange rates...</div>;
  }

  return (
    <ConverterContainer>
      <InputGroup>
        <Input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
        />
        <Select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
          {Object.keys(rates).map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </Select>
      </InputGroup>

      <InputGroup>
        <Select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
          {Object.keys(rates).map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </Select>
        <Button onClick={handleConvert}>Convert</Button>
      </InputGroup>

      {error && <div style={{ color: 'red' }}>{error}</div>}

      {result !== null && !error && (
        <Result>
          {amount} {fromCurrency} = {result.toFixed(2)} {toCurrency}
        </Result>
      )}
    </ConverterContainer>
  );
};

export default CurrencyConverter; 