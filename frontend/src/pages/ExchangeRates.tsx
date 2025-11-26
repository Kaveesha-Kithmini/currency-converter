import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { fetchExchangeRates } from '../services/api';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.primary};
  text-align: center;
  margin-bottom: 2rem;
`;

const SearchContainer = styled.div`
  margin-bottom: 2rem;
  display: flex;
  gap: 1rem;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  background: ${({ theme }) => theme.colors.input};
  color: ${({ theme }) => theme.colors.text};
`;

const SearchButton = styled.button`
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

const RatesTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: ${({ theme }) => theme.colors.card};
  border-radius: 8px;
  overflow: hidden;
`;

const TableHeader = styled.th`
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.navbarText};
  padding: 1rem;
  text-align: left;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background: ${({ theme }) => theme.colors.input};
  }
`;

const TableCell = styled.td`
  padding: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const ExchangeRates: React.FC = () => {
  const [rates, setRates] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredRates, setFilteredRates] = useState<Record<string, number>>({});

  useEffect(() => {
    const loadRates = async () => {
      try {
        const data = await fetchExchangeRates();
        setRates(data);
        setFilteredRates(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load exchange rates');
        setLoading(false);
      }
    };

    loadRates();
  }, []);

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setFilteredRates(rates);
      return;
    }

    const filtered = Object.entries(rates)
      .filter(([currency]) => 
        currency.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .reduce((acc, [currency, rate]) => {
        acc[currency] = rate;
        return acc;
      }, {} as Record<string, number>);

    setFilteredRates(filtered);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  if (loading) {
    return <div>Loading exchange rates...</div>;
  }

  if (error) {
    return <div style={{ color: 'red' }}>{error}</div>;
  }

  return (
    <Container>
      <Title>Current Exchange Rates</Title>
      <SearchContainer>
        <SearchInput
          type="text"
          placeholder="Search currency (e.g., USD, EUR)"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <SearchButton onClick={handleSearch}>Search</SearchButton>
      </SearchContainer>
      <RatesTable>
        <thead>
          <tr>
            <TableHeader>Currency</TableHeader>
            <TableHeader>Rate (USD)</TableHeader>
          </tr>
        </thead>
        <tbody>
          {Object.entries(filteredRates).map(([currency, rate]) => (
            <TableRow key={currency}>
              <TableCell>{currency}</TableCell>
              <TableCell>{rate.toFixed(4)}</TableCell>
            </TableRow>
          ))}
        </tbody>
      </RatesTable>
    </Container>
  );
};

export default ExchangeRates; 