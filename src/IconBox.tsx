import React, { useState, useEffect } from 'react';
import { getIconColors } from './color_utils';

interface IconProps {
  symbol: string;
}

// Finding a reliable source of crypt icons is the challenge
// I was using https://cryptoicons.org/ which is versatile, but it doesn't have all the coins
// Currently using https://cryptoicon-api.vercel.app/ but it is sometimes unreliable
// It might be better to have all the SVG files in the project:
//   https://github.com/ErikThiart/cryptocurrency-icons
//   https://github.com/reddavis/Crypto-Icons-API/tree/master/public/svg/icon

// TODO: Need to handle errors and provide a fallback
// TODO: Refactor to be more general-purpose

export const IconBox: React.FC<IconProps> = ({ symbol }) => {
  const [backgroundColor, setBackgroundColor] = useState<string>('#d5dbe5');
  const iconUrl = `https://cryptoicon-api.vercel.app/api/icon/${symbol}`;

  useEffect(() => {
    // Determine a suitable background color based on the icon
    getIconColors(iconUrl).then(colors => {
      setBackgroundColor(colors.background);
    });
  }, []);

  return (
    <div className="iconBox" style={{ background: backgroundColor }}>
      <img src={iconUrl} />
    </div>
  );
};
