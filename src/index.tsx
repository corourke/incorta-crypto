// Displays current cryptocurency price and market information
// See API documentation at https://www.coingecko.com/en/api/documentation
// TODO: Needs internationalization

import React, { useState, useEffect } from 'react';
import { VisualProps } from '@incorta-org/visual-sdk';
import './styles.less';
import axios, { AxiosResponse } from 'axios';

axios.defaults.baseURL = 'https://api.coingecko.com/api/v3/coins/';
const axiosOptions =
  '?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false';

const IncortaCrypto = (props: VisualProps) => {
  const [response, setResponse] = useState<AxiosResponse>();
  const [notice, setNotice] = useState<string>('');
  const [maxTiles, setMaxTiles] = useState<number>();
  const [coin, setCoin] = useState<string>(); // TODO: use bindings
  console.log('COMPONENT:', props);

  useEffect(() => {
    // This seems to fire on just about any update to props,
    // Probably need to use something like https://www.npmjs.com/package/use-deep-compare-effect
    // TODO: Component only renders 1 tile for now -- eventually will rendule multiple
    console.log('SETTINGS CHANGE');
    const settings = props.insight.context.insight.settings;
    if (settings) {
      // guard
      if (settings.maxTiles !== maxTiles) {
        setMaxTiles(settings.maxTiles);
        console.log('MAXTILES UPDATE');
      }
      if (settings.coin !== coin) {
        setCoin(settings.coin);
        console.log('COIN SETTING UPDATE');
      }
    }
  }, [props.insight.context.insight.settings]);

  useEffect(() => {
    // This seems to fire on any change might need to use useDeepCompareEffect
    console.log('BINDINGS CHANGE');
  }, [props.insight.context.insight.bindings]);

  useEffect(() => {
    // Need to move coin out of settings -- this is just temporary
    if (coin) {
      console.log('SENDING QUERY, COIN: ', coin);

      axios
        .get(coin + axiosOptions)
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
  }, [coin]);

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

  // TODO: Refactor to render multiple coins
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

  return <div className="boundingBox">{notice ? <p>{notice}</p> : renderCoinData()}</div>;
};

export default IncortaCrypto;
