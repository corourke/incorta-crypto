import React, { useState, useEffect } from 'react';
import Icon from 'react-crypto-icons';

interface IconProps {
  symbol: string;
}

// TODO: Relocate the CSS for this component here

export const IconBox: React.FC<IconProps> = ({ symbol }) => {
  const iconUrl = `https://cryptoicon-api.vercel.app/api/icon/${symbol}`;

  return (
    <div className="iconBox">
      <img src={iconUrl} />
    </div>
  );
};

// To try the react-crypto-icons library, replace the img element with:
//<Icon name={symbol} size={96} />
