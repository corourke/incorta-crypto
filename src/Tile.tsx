import React, { useState, useEffect } from 'react';
import './styles.less';
import axios, { AxiosResponse } from 'axios';
import { Sparkline } from './Sparkline';
import { IconBox } from './IconBox';

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
            setLastUpdate(new Date().toUTCString());
          }, 30000); // 30 seconds
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
        <IconBox symbol={response.data.symbol} />
        <div className="coinName">{response.data.name}</div>
        <div className="tradingPair">
          {response.data.symbol.toUpperCase()}
          <span className="lighter">/{iso_4217_code}</span>
        </div>
        <div className="changeFrame">
          {renderChangeArrow(Number(response.data.market_data.price_change_24h_in_currency.usd))}
          <div>
            {formatNumber(response.data.market_data.price_change_percentage_24h, 4, 'percent')}
          </div>
          <div>{formatNumber(response.data.market_data.price_change_24h_in_currency.usd, 8)}</div>
        </div>
        <div className="price">
          {formatNumber(response.data.market_data.current_price.usd, 8, 'currency', iso_4217_code)}
        </div>
        <div className="sparkline">
          <Sparkline coinId={coinId} currency={iso_4217_code} />
        </div>

        {/* <div className="value">
          Mkt Value:{' '}
          {(Number(response.data.market_data.current_price.usd) * aggPosition).toLocaleString(
            'default',
            { style: 'currency', currency: iso_4217_code }
          )}
        </div> */}
      </>
    ) : (
      ''
    );
  };

  // TODO: Need to properly color percentages
  // TODO: Need to allow +/- ahead of change values
  // TODO: Need to properly color change values
  // A rather naive number formatter
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
