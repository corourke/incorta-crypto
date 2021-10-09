import React, { useState, useEffect } from 'react';
import axios, { AxiosRequestConfig } from 'axios';
import Icon from 'react-crypto-icons';
import { getIconColors } from './color_utils';
import { Buffer } from 'buffer';

interface IconProps {
  symbol: string;
}

// TODO: Need to handle errors and provide a fallback on bad symbol or no API result
// TODO: Refactor to be more general-purpose
// TODO: Do something to co-locate the CSS for this component here

export const IconBox: React.FC<IconProps> = ({ symbol }) => {
  const [backgroundColor, setBackgroundColor] = useState<string>('#E1E4EA');
  const iconUrl = `https://cryptoicon-api.vercel.app/api/icon/${symbol}`;
  const [image, setImage] = useState<Buffer>();

  useEffect(() => {
    // Fetch the crypto icon (must be PNG)
    fetch(iconUrl, { mode: 'no-cors' })
      .then(r => r.arrayBuffer())
      .then(buffer => {
        setImage(Buffer.from(buffer));
      }),
      (err: any) => {
        console.error(err);
        throw err;
      };
  }, [symbol]);

  // useEffect(() => {
  //   // Compute a suitable background color
  //   if (image) {
  //     const { color, background } = getIconColors(image);
  //     setBackgroundColor(background);
  //   }
  // }, [image]);

  return (
    <div className="iconBox" style={{ background: backgroundColor }}>
      <img src={image ? `data:image/png;base64,${image.toString('base64')}` : ''} />
    </div>
  );
};

// To try fetching the icon from an API, replace the img element above:
// <img src={iconUrl} />
// with:
//<img src={image ? `data:image/png;base64,${image.toString('base64')}` : ''} />
// To try the react-crypto-icons library, use
//<Icon name={symbol} size={96} />
