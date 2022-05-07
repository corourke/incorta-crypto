import React, { useState, useEffect } from 'react';

interface IconProps {
  symbol: string;
}

// TODO: Relocate the CSS for this component here

export const IconBox: React.FC<IconProps> = ({ symbol }) => {
  const iconUrl = `https://cryptoicons.org/api/icon/${symbol}/96`;

  return (
    <div className="iconBox">
      <img src={iconUrl} />
    </div>
  );
};

