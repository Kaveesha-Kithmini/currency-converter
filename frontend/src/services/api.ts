export const fetchExchangeRates = async (): Promise<Record<string, number>> => {
  try {
    const response = await fetch('https://v6.exchangerate-api.com/v6/cdd66f19cb97bb9e1b7834d3/latest/USD');
    if (!response.ok) {
      throw new Error('Failed to fetch exchange rates');
    }
    const data = await response.json();
    return data.conversion_rates;
  } catch (error) {
    console.error('Error fetching exchange rates:', error);
    throw new Error('Failed to fetch exchange rates');
  }
}; 