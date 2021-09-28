import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getIconColors } from './color_utils';
import { Buffer } from 'buffer';

interface IconProps {
  symbol: string;
}

// Finding a reliable source of crypto icons is the challenge
// I was using https://cryptoicons.org/ which is versatile, but it doesn't have all the coins
// Currently using https://cryptoicon-api.vercel.app/ but it is sometimes unreliable
// It might be better to have all the SVG files in the project:
//   https://github.com/ErikThiart/cryptocurrency-icons
//   https://github.com/reddavis/Crypto-Icons-API/tree/master/public/svg/icon

// TODO: Need to handle errors and provide a fallback on bad symbol or no API result
// TODO: Refactor to be more general-purpose
// TODO: Do something to co-locate the CSS for this component here

export const IconBox: React.FC<IconProps> = ({ symbol }) => {
  const [backgroundColor, setBackgroundColor] = useState<string>('#d5dbe5');
  const iconUrl = `https://cryptoicon-api.vercel.app/api/icon/${symbol}`;
  const [image, setImage] = useState<Buffer>();

  useEffect(() => {
    // Fetch the crypto icon (must be PNG)

    axios
      .get(iconUrl, { responseType: 'arraybuffer' })
      .then(response => {
        setImage(Buffer.from(response.data, 'binary'));
      })
      .catch(err => {
        console.error(err);
        throw err;
      });
  }, [symbol]);

  useEffect(() => {
    // Compute a suitable background color
    if (image) {
      const { color, background } = getIconColors(image);
      setBackgroundColor(background);
    }
  }, [image]);

  return (
    <div className="iconBox" style={{ background: backgroundColor }}>
      <img src={image ? `data:image/png;base64,${image.toString('base64')}` : ''} />
    </div>
  );
};
