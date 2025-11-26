import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  background: ${({ theme }) => theme.colors.card};
  padding: 1rem;
  border-radius: 8px;
`;

const SelectGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.text};
`;

const Select = styled.select`
  padding: 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  background: ${({ theme }) => theme.colors.input};
  color: ${({ theme }) => theme.colors.text};
  min-width: 200px;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const SwapButton = styled.button`
  padding: 0.5rem;
  background: ${({ theme }) => theme.colors.primary};
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
    background: ${({ theme }) => theme.colors.accent};
    transform: rotate(180deg);
  }
`;

interface CurrencySelectProps {
  fromCurrency: string;
  toCurrency: string;
  onFromCurrencyChange: (currency: string) => void;
  onToCurrencyChange: (currency: string) => void;
  onSwap: () => void;
}

const currencies = [
  { code: 'LKR', name: 'Sri Lankan Rupee' },
  { code: 'USD', name: 'US Dollar' },
  { code: 'EUR', name: 'Euro' },
  { code: 'GBP', name: 'British Pound' },
  { code: 'JPY', name: 'Japanese Yen' },
  { code: 'AUD', name: 'Australian Dollar' },
  { code: 'CAD', name: 'Canadian Dollar' },
  { code: 'CHF', name: 'Swiss Franc' },
  { code: 'CNY', name: 'Chinese Yuan' },
  { code: 'INR', name: 'Indian Rupee' },
];

const CurrencySelect: React.FC<CurrencySelectProps> = ({
  fromCurrency,
  toCurrency,
  onFromCurrencyChange,
  onToCurrencyChange,
  onSwap,
}) => {
  return (
    <Container>
      <SelectGroup>
        <Label>From</Label>
        <Select
          value={fromCurrency}
          onChange={(e) => onFromCurrencyChange(e.target.value)}
        >
          {currencies.map((currency) => (
            <option key={currency.code} value={currency.code}>
              {currency.code} - {currency.name}
            </option>
          ))}
        </Select>
      </SelectGroup>

      <SwapButton onClick={onSwap} title="Swap currencies">
        ↔
      </SwapButton>

      <SelectGroup>
        <Label>To</Label>
        <Select
          value={toCurrency}
          onChange={(e) => onToCurrencyChange(e.target.value)}
        >
          {currencies.map((currency) => (
            <option key={currency.code} value={currency.code}>
              {currency.code} - {currency.name}
            </option>
          ))}
        </Select>
      </SelectGroup>
    </Container>
  );
};

export default CurrencySelect; 