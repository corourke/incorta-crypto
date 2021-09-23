import React, { useState, useEffect } from 'react';
import './styles.less';

interface IconProps {
  symbol: string;
}

// I was using https://cryptoicons.org/ which is versatile, but it doesn't have all the coins
// See alternate: https://github.com/TokenTax/cryptoicon-api
// It might be better to have all the SVG files in the project:
//   https://github.com/ErikThiart/cryptocurrency-icons
//   https://github.com/reddavis/Crypto-Icons-API/tree/master/public/svg/icon

// TODO: Need to handle errors and provide a fallback
// TODO: Set the background color to a tint of the main icon color

export const IconBox: React.FC<IconProps> = ({ symbol }) => {
  return (
    <div className="iconBox">
      <img src={`https://cryptoicon-api.vercel.app/api/icon/${symbol}`} />
    </div>
  );
};
