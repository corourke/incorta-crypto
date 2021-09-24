import React, { useState, useEffect } from 'react';
import './styles.less';
import axios, { AxiosResponse } from 'axios';
import { Sparklines, SparklinesLine } from 'react-sparklines';

interface SparklineProps {
  coinId: string;
  currency: string;
}

export const Sparkline: React.FC<SparklineProps> = ({ coinId, currency }) => {
  const [response, setResponse] = useState<AxiosResponse>();
  const [lastUpdate, setLastUpdate] = useState<string>('');
  const [chartData, setChartData] = useState([]);

  axios.defaults.baseURL = 'https://api.coingecko.com/api/v3/coins/';
  const axiosOptions = '/market_chart?vs_currency=usd&days=1&interval=hourly';

  useEffect(() => {
    axios
      .get(coinId + axiosOptions)
      .then(Response => {
        setResponse(Response);
        console.log('AXIOS (SPARKLINE) RESPONSE:', Response);
        const prices: [] = Response.data.prices;
        setChartData(prices.map(data => data[1]));

        // This is to force a periodic read of the API
        const timer = setTimeout(() => {
          console.log('TIMEOUT (SPARKLINE)', lastUpdate);
          setLastUpdate(new Date().toUTCString());
        }, 3600000); // 1 hour
      })
      .catch(error => {
        console.error('AXIOS ERROR (SPARKLINE)', error.toJSON());
        setResponse(undefined);
      });
  }, [lastUpdate]);

  return (
    <Sparklines data={chartData} width={100} height={20}>
      <SparklinesLine color="blue" />
    </Sparklines>
  );
};
