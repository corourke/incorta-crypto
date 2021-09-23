import React, { useState, useEffect } from 'react';
import './styles.less';

interface IconProps {
  symbol: string;
}

// I was using https://cryptoicons.org/ which is versatile, but it doesn't have all the coins
// See: https://github.com/TokenTax/cryptoicon-api
// Alternate: https://github.com/ErikThiart/cryptocurrency-icons
// Alternate: https://github.com/reddavis/Crypto-Icons-API/tree/master/public/svg/icon

// TODO: Need to try fetching icon data and handle errors
// TODO: Might be better to have all the SVG files in the project

export const IconBox: React.FC<IconProps> = ({ symbol }) => {
  return (
    <div className="iconBox">
      <img src={`https://cryptoicon-api.vercel.app/api/icon/${symbol}`} />
    </div>
  );
};
