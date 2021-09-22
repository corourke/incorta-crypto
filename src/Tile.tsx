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
  console.log('TILE');

  axios.defaults.baseURL = 'https://api.coingecko.com/api/v3/coins/';
  const axiosOptions =
    '?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false';

  useEffect(() => {
    /// TODO: Set up periodic real-time refresh
    if (true) {
      console.log('SENDING QUERY');

      axios
        .get(coinId + axiosOptions)
        .then(Response => {
          console.log('AXIOS RESPONSE:', Response);
          setResponse(Response);
          setNotice('');
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
  }, []);

  // TODO: Show holdings and/or value instead of volume
  // TODO: Make the overall tile narrower and or responsive
  const renderCoinData = () => {
    return response ? (
      <>
        <div className="coinName">{response.data.name}</div>
        <div className="percentChange">
          {formatNumber(response.data.market_data.price_change_percentage_24h, 4)}%
        </div>
        <img className="icon" src={response.data.image.small} />
        <div className="tradingPair">
          {response.data.symbol.toUpperCase()}
          <span className="lighter">/USD</span>
        </div>
        <div className="price">
          {response.data.market_data.current_price.usd}
          <span className="currency">USD</span>
        </div>
        <div className="priceChange">
          {formatNumber(response.data.market_data.price_change_24h_in_currency.usd, 8)}
        </div>
        <div className="volume">
          Vol: {formatNumber(response.data.market_data.total_volume.usd, 8)}
        </div>
      </>
    ) : (
      ''
    );
  };

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
