import axios from 'axios';

const API_URL = 'https://api.exchangerate-api.com/v4/latest/';

export const fetchRates = async (baseCurrency: string) => {
    
  try {
    const response = await axios.get(`${API_URL}${baseCurrency}`);
    return response.data.rates;
  } catch (error) {
    throw new Error('Failed to fetch currency data');
  }
};
