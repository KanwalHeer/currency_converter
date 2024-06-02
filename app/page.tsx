
'use client'
import { useState } from 'react';
import { fetchRates } from './api/api';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Heading from '@/components/heading';
import Container from '@/components/container';
import CustomSelect from '@/components/select';

const currencies = ["USD", "EUR", "PKR", "GBP", "JPY", "AUD", "CAD", "CHF", "CNY", "SEK", "NZD", 
"MXN", "SGD", "HKD", "NOK", "KRW", "TRY", "RUB", "INR", "BRL", "ZAR", "MYR",
"IDR", "PHP", "THB", "VND", "SAR", "PLN", "CZK", "HUF", "RON", "AED", "ILS",
"CLP", "COP", "PEN", "ARS", "BGN", "HRK", "DKK", "ISK", "LKR", "MAD", "NGN",
"TWD", "BDT", "UAH", "EGP", "JOD", "KWD", "OMR", "QAR", "BHD", "KES", "GHS",
"TZS", "UGX", "BWP", "MUR", "NAD", "ETB", "BND", "NPR", "LBP", "PKR", "IRR",
"IQD", "AFN", "ALL", "AMD", "AOA", "AZN", "BAM", "BBD", "BSD", "BZD", "BMD",
"BOB", "BTN", "BWP", "BYN", "CDF", "CRC", "CUP", "DJF", "DOP", "DZD", "ERN",
"FJD", "FKP", "GEL", "GIP", "GMD", "GTQ", "GYD", "HTG", "HNL", "JMD", "KYD",
"LAK", "LSL", "LYD", "MKD", "MGA", "MOP", "MVR", "MWK", "MZN", "NAD", "NIO",
"PAB", "PGK", "PYG", "RSD", "RWF", "SBD", "SCR", "SHP", "SLL", "SOP", "SRD",
"STD", "SYP", "SZL", "TJS", "TMT", "TOP", "TTD", "TVD", "UYU", "UZS", "VUV",
"WST", "XAF", "XCD", "XOF", "XPF", "YER", "ZMW", "ZWL"];

const Home = () => {
  const [baseCurrency, setBaseCurrency] = useState('USD');
  const [targetCurrency, setTargetCurrency] = useState('EUR');
  const [amount, setAmount] = useState<any>(1);
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [conversionClicked, setConversionClicked] = useState(false);
  const [originalAmount, setOriginalAmount] = useState<any>(1);

  const handleConvert = async () => {
    setLoading(true);
    try {
      const rates = await fetchRates(baseCurrency);
      const rate = rates[targetCurrency];
      setOriginalAmount(amount);
      setConvertedAmount(amount * rate);
      setConversionClicked(true);
      setAmount(''); 
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
    setConversionClicked(false); 
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
            <option key={currency} value={currency}>{currency}</option>
          ))}
        </CustomSelect>
        <Input
          className='bg-gray-100 mt-4 font-bold shadow-lg'
          type="text"
          value={amount}
          onChange={handleAmountChange}
        />
        <Button onClick={handleConvert} disabled={loading} className='mt-4 p-4 bg-purple-950 text-white font-bold hover:bg-purple-600'>
          {loading ? 'Converting...' : 'Convert'}
        </Button>
        {conversionClicked && convertedAmount !== null && (
          <div>
            <p className='mt-8 font-bold text-white shadow-lg'>
              {originalAmount} {baseCurrency} equals {convertedAmount.toFixed(2)} {targetCurrency}
            </p>
          </div>
        )}
      </Container>
    </div>
  );
};

export default Home;
