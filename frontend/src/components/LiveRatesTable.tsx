import React from 'react';
import styled from 'styled-components';

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
  background: ${({ theme }) => theme.colors.card};
  border-radius: 8px;
  overflow: hidden;
`;

const Th = styled.th`
  background: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.text};
  padding: 1rem;
  text-align: left;
`;

const Td = styled.td`
  color: ${({ theme }) => theme.colors.text};
  padding: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const Tr = styled.tr`
  &:hover {
    background: ${({ theme }) => theme.colors.secondary};
  }
`;

interface LiveRatesTableProps {
  rates: { [key: string]: number };
  baseCurrency: string;
}

const LiveRatesTable: React.FC<LiveRatesTableProps> = ({ rates, baseCurrency }) => (
  <Table>
    <thead>
      <tr>
        <Th>Currency</Th>
        <Th>Rate</Th>
      </tr>
    </thead>
    <tbody>
      {Object.entries(rates)
        .filter(([code]) => code !== baseCurrency)
        .map(([code, rate]) => (
          <Tr key={code}>
            <Td>{code}</Td>
            <Td>{rate.toFixed(4)}</Td>
          </Tr>
        ))}
    </tbody>
  </Table>
);

export default LiveRatesTable; 