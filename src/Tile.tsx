import React, { useState, useEffect } from 'react';
import './styles.less';
import axios, { AxiosResponse } from 'axios';

interface TileProps {
  coinId: string;
  aggPosition: number;
}

export const Tile: React.FC<TileProps> = ({ coinId, aggPosition }) => {
  const [response, setResponse] = useState<AxiosResponse>();
  const [notice, setNotice] = useState<string>('');
  const [lastUpdate, setLastUpdate] = useState<string>('');

  axios.defaults.baseURL = 'https://api.coingecko.com/api/v3/coins/';
  const axiosOptions =
    '?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false';

  useEffect(() => {
    /// TODO: Set up periodic real-time refresh
    if (true) {
      console.log('SENDING QUERY: ', coinId);

      axios
        .get(coinId + axiosOptions)
        .then(Response => {
          console.log('AXIOS RESPONSE:', Response);
          setResponse(Response);
          setNotice('');

          // This is to force a periodic read of the API
          const timer = setTimeout(() => {
            console.log('TIMEOUT', lastUpdate);
            setLastUpdate(new Date().toUTCString());
          }, 15000);
        })
        .catch(error => {
          console.error('AXIOS ERROR', error.toJSON());
          setResponse(undefined);
          setNotice('Error retrieving coin data');
          console.error('AXIOS ERROR DATA', error.response.data.error);
          if (error.response) {
            setNotice(error.response.data.error);
          }
        });
    }
  }, [lastUpdate]);

  // TODO: Make the overall tile narrower and or responsive
  const renderCoinData = () => {
    // TODO: Need to allow for different currencies and locales
    const iso_4217_code = 'USD';
    return response ? (
      <>
        <div className="coinName">{response.data.name}</div>
        <div className="percentChange">
          {formatNumber(response.data.market_data.price_change_percentage_24h, 4)}%
        </div>
        <img className="icon" src={response.data.image.small} />
        <div className="tradingPair">
          {response.data.symbol.toUpperCase()}
          <span className="lighter">/{iso_4217_code}</span>
        </div>
        <div className="price">
          {response.data.market_data.current_price.usd}
          <span className="currency">{iso_4217_code}</span>
        </div>
        <div className="priceChange">
          {formatNumber(response.data.market_data.price_change_24h_in_currency.usd, 8)}
        </div>
        <div className="value">
          Mkt Value:{' '}
          {(Number(response.data.market_data.current_price.usd) * aggPosition).toLocaleString(
            'default',
            { style: 'currency', currency: iso_4217_code }
          )}
        </div>
      </>
    ) : (
      ''
    );
  };

  // TODO: Need to test to see how the tile looks when numbers are positive
  // A rather naive number formatter
  const formatNumber = (parseableString: string, digits: number) => {
    const number = Number(parseableString);
    const negative = number < 0 ? 'red' : '';
    return (
      <span className={`${negative}`}>
        {number.toLocaleString('default', { maximumSignificantDigits: digits })}
      </span>
    );
  };

  return <div className="boundingBox">{notice ? <p>{notice}</p> : renderCoinData()}</div>;
};
