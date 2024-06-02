'use client'
import { useState } from 'react';
import { fetchRates } from './api/api';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Heading from '@/components/heading';
import Container from '@/components/container';
import CustomSelect from '@/components/select'; 

const currencies = ["USD", "EUR", "PKR", "GBP", "JPY", "AUD", "CAD", "CHF", "CNY", "SEK", "NZD", "MXN", "SGD", "HKD", "NOK", "KRW", "TRY", "RUB", "INR"];

const Home = () => {
  const [baseCurrency, setBaseCurrency] = useState('USD');
  const [targetCurrency, setTargetCurrency] = useState('EUR');
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const handleConvert = async () => {
    setLoading(true);
    try {
      const rates = await fetchRates(baseCurrency);
      const rate = rates[targetCurrency];
      setConvertedAmount(amount * rate);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='bg-purple-400'>
    <Container>
      <Heading as="h1">Currency Converter</Heading>
      <CustomSelect value={baseCurrency} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setBaseCurrency(e.target.value)}>
        {currencies.map(currency => (
          <option key={currency} value={currency}>{currency}</option>
        ))}
      </CustomSelect>
      <CustomSelect value={targetCurrency} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setTargetCurrency(e.target.value)}>
        {currencies.map(currency => (
          <option  key={currency} value={currency}>{currency}</option>
        ))}
      </CustomSelect>
      <Input className='bg-gray-100 mt-4 font-bold shadow-lg' type="number" value={amount} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAmount(Number(e.target.value))} />
      <Button onClick={handleConvert} disabled={loading} className='mt-4 p-4 bg-purple-950 text-white font-bold hover:bg-purple-600'>
        {loading ? 'Converting...' : 'Convert'}
      </Button>
      {convertedAmount !== null && <p className='mt-8 font-bold text-white shadow-lg '>{amount} {baseCurrency} equals {convertedAmount.toFixed(2)} {targetCurrency}</p>}
    </Container>
    </div>
  );
};

export default Home;
