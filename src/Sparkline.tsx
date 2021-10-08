import React, { useState, useEffect } from 'react';
import './styles.less';
import axios, { AxiosResponse } from 'axios';
import { Sparklines, SparklinesLine } from 'react-sparklines';

interface CryptoPairProps {
  coinId: string;
  currency: string;
}

// Given a coin identifier (bitcoin, ethereum) and a currency (USD) render a 24H sparkline

export const Sparkline: React.FC<CryptoPairProps> = ({ coinId, currency }) => {
  const [lastUpdate, setLastUpdate] = useState<string>('');
  const [chartData, setChartData] = useState([]);

  axios.defaults.baseURL = 'https://api.coingecko.com/api/v3/coins/';
  // TODO: Use proper parameter object
  const axiosOptions = '/market_chart?vs_currency=usd&days=1&interval=hourly';

  useEffect(() => {
    axios.get(coinId + axiosOptions).then(Response => {
      const prices: [] = Response.data.prices;
      setChartData(prices.map(data => data[1]));

      // This is to force a periodic read of the API
      const timer = setTimeout(() => {
        setLastUpdate(new Date().toUTCString());
      }, 3600000); // 1 hour
    });
  }, [lastUpdate]);

  return (
    <Sparklines data={chartData} width={100} height={20}>
      <SparklinesLine color="blue" />
    </Sparklines>
  );
};
