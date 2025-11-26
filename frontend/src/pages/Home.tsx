import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, Link } from 'react-router-dom';
import { fetchExchangeRates } from '../services/api';

const Container = styled.div`
  min-height: 100vh;
  background: ${props => props.theme.colors.background};
  padding: 2rem;
`;

const BannerContainer = styled.div`
  position: relative;
  width: 100%;
  height: 300px;
  margin-bottom: 1rem;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const BannerImage = styled.div`
  width: 100%;
  height: 100%;
  background-image: url('/currency-exchange.jpg');
  background-size: cover;
  background-position: center;
  filter: brightness(0.7);
`;

const BannerText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  text-align: center;
  z-index: 1;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);

  h2 {
    font-size: 2rem;
    margin-bottom: 0.5rem;
  }

  p {
    font-size: 1.1rem;
    opacity: 0.9;
  }
`;

const NavButtonsContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  background: white;
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const NavButton = styled.button<{ active?: boolean }>`
  flex: 1;
  padding: 0.75rem;
  border: none;
  border-radius: 8px;
  background: ${({ active }) => active ? '#4169E1' : '#f5f5f5'};
  color: ${({ active }) => active ? 'white' : '#666'};
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover {
    background: #4169E1;
    color: white;
  }
`;

const ButtonIcon = styled.span`
  font-size: 0.9rem;
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.primary};
  text-align: center;
  margin-bottom: 2rem;
  font-size: 1.5rem;
`;

const ConverterCard = styled.div`
  background: ${({ theme }) => theme.colors.card};
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const InputGroup = styled.div`
  margin-bottom: 2rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.8rem;
`;

const AmountInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  font-size: 0.9rem;
  background: ${({ theme }) => theme.colors.input};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 1rem;
`;

const CurrencyRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  justify-content: space-between;
  gap: 0.5rem;
`;

const SelectWrapper = styled.div`
  flex: 1;
  max-width: 45%;
`;

const CurrencySelect = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.input};
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.8rem;
  cursor: pointer;
`;

const SwapButton = styled.button`
  padding: 0.5rem;
  background: #4169E1;
  color: white;
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.3s ease;
  margin: 0 0.5rem;
  font-size: 1rem;

  &:hover {
    background: #2850c7;
    transform: rotate(180deg);
  }
`;

const ConvertButton = styled.button`
  width: 50%;
  margin: 0 auto;
  display: block;
  padding: 0.75rem;
  background: #4169E1;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background: #2850c7;
  }
`;

const Result = styled.div`
  margin-top: 2rem;
  text-align: center;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.text};
`;

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState<string>('');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [rates, setRates] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<number | null>(null);

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

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const handleConvert = () => {
    if (!amount || !rates[fromCurrency] || !rates[toCurrency]) return;

    const fromRate = rates[fromCurrency];
    const toRate = rates[toCurrency];
    const convertedAmount = (parseFloat(amount) / fromRate) * toRate;
    setResult(convertedAmount);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <Container>
      <BannerContainer>
        <BannerImage />
        <BannerText>
          <h2>Real-Time Currency Exchange</h2>
          <p>Fast, reliable, and secure currency conversion at your fingertips</p>
        </BannerText>
      </BannerContainer>

      <NavButtonsContainer>
        <NavButton active>
          <ButtonIcon>💱</ButtonIcon>
          Convert
        </NavButton>
        <NavButton onClick={() => navigate('/charts')}>
          <ButtonIcon>📊</ButtonIcon>
          Charts
        </NavButton>
      </NavButtonsContainer>

      <Title>Currency Converter</Title>
      <ConverterCard>
        <InputGroup>
          <Label>Amount</Label>
          <AmountInput
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
          />
        </InputGroup>

        <CurrencyRow>
          <SelectWrapper>
            <Label>From</Label>
            <CurrencySelect
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
            >
              {Object.keys(rates).map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </CurrencySelect>
          </SelectWrapper>

          <SwapButton onClick={handleSwap}>↔</SwapButton>

          <SelectWrapper>
            <Label>To</Label>
            <CurrencySelect
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
            >
              {Object.keys(rates).map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </CurrencySelect>
          </SelectWrapper>
        </CurrencyRow>

        <ConvertButton onClick={handleConvert}>
          Convert
        </ConvertButton>

        {result !== null && (
          <Result>
            {amount} {fromCurrency} = {result.toFixed(2)} {toCurrency}
          </Result>
        )}
      </ConverterCard>
    </Container>
  );
};

export default Home;