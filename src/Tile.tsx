// Queries cryptocurreny market data for a given coinID, formats a
// dashboard tile, periodicaly refreshes data.
// See API documentation at https://www.coingecko.com/en/api/documentation

import React, { useState, useEffect } from 'react';
import './styles.less';
import axios from 'axios';
import { Sparkline } from './Sparkline';
import { IconBox } from './IconBox';

interface TileProps {
  coinId: string;
}

export const Tile: React.FC<TileProps> = ({ coinId }) => {
  const [coinData, setCoinData] = useState<any>();
  const [notice, setNotice] = useState<string>('Loading...');
  const [lastUpdate, setLastUpdate] = useState<string>('');
  // TODO: Need to allow for different currencies and locales
  const iso_4217_code = 'USD';

  // Fetch the price data periodically
  useEffect(() => {
    axios.defaults.baseURL = 'https://api.coingecko.com/api/v3/coins/';
    const axiosOptions = {
      params: {
        localization: false,
        tickers: false,
        market_data: true,
        community_data: false,
        developer_data: false
      }
    };

    console.log('CRYPTO API REQUEST: ', coinId);
    axios
      .get(coinId, axiosOptions)
      .then(Response => {
        setCoinData(Response.data);
        setNotice('');

        // This is to force a periodic read of the API
        const timer = setTimeout(() => {
          setLastUpdate(new Date().toUTCString());
        }, 30000); // 30 seconds
        // Cleanup timer if component unmounts
        return () => {
          clearTimeout(timer);
        };
      })
      .catch(error => {
        setCoinData(undefined);
        setNotice(error.response.data.error);
        console.error('API ERROR', error.response.data.error);
      });
  }, [lastUpdate]);

  const renderCoinData = () => {
    return coinData ? (
      <React.Fragment>
        <IconBox symbol={coinData.symbol} />
        <div className="coinName">{coinData.name}</div>
        <div className="tradingPair">
          {coinData.symbol.toUpperCase()}
          <span className="lighter">/{iso_4217_code}</span>
        </div>

        <div className="changeFrame">
          {renderChangeArrow(Number(coinData.market_data.price_change_24h_in_currency.usd))}
          <div>{formatNumber(coinData.market_data.price_change_percentage_24h, 4, 'percent')}</div>
          <div>{formatNumber(coinData.market_data.price_change_24h_in_currency.usd, 8)}</div>
        </div>

        <div className="price">
          {formatNumber(coinData.market_data.current_price.usd, 8, 'currency', iso_4217_code)}
        </div>
        <div className="sparkline">
          <Sparkline coinId={coinId} currency={iso_4217_code} />
        </div>
      </React.Fragment>
    ) : (
      ''
    );
  };

  // A rather naive number formatter
  // TODO: Refactor into a component
  const formatNumber = (
    parseableString: string,
    digits: number,
    style: string = 'decimal',
    currency: string = 'USD'
  ) => {
    var number = Number(parseableString);
    const negative = number < 0 ? 'red' : '';
    if (style === 'percent') number /= 100; // Assume number is already x 100
    return (
      <span className={`${negative}`}>
        {number.toLocaleString('default', {
          maximumSignificantDigits: digits,
          style: style,
          currency: currency
        })}
      </span>
    );
  };

  // Renders an up or down arrow depending on the sign of the passed value
  // TODO: Rare, but what about an unchanged value?
  // TODO: Refactor into a reusable component
  const renderChangeArrow = (value: number) => {
    if (value < 0) {
      // red down arrow
      return (
        <svg
          width="11"
          height="8"
          viewBox="0 0 11 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.5 6.77874L0.525443 0.445833H10.4746L5.5 6.77874Z"
            fill="#F5222D"
            fill-opacity="0.5"
            stroke="#F5222D"
            stroke-width="0.891667"
          />
        </svg>
      );
    } else {
      //green up arrow
      return (
        <svg
          width="11"
          height="8"
          viewBox="0 0 11 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.5 0.581678L10.3631 6.77273L0.636871 6.77273L5.5 0.581678Z"
            fill="#009900"
            stroke="#006600"
          />
        </svg>
      );
    }
  };

  return <div className="boundingBox">{notice ? <p>{notice}</p> : renderCoinData()}</div>;
};
