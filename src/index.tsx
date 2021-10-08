// Incorta component Displays current cryptocurency price and market information

// TODO: Needs internationalization
import React, { useState, useEffect } from 'react';
import { VisualProps } from '@incorta-org/visual-sdk';
import { Tile } from './Tile';

const IncortaCryptoTiles = (props: VisualProps) => {
  const maxTiles = props.insight.context.insight.settings?.maxTiles || 4;

  // Extract the crypto holdings
  const holdings: { coinId: string; quantity: number }[] = props.insight.data.data.map(cell => {
    return { coinId: cell[0].value, quantity: Number(cell[1].value) };
  });
  console.log('HOLDINGS', holdings);

  // Render a tile for each row returned, up to the maxTiles setting
  const renderedTiles = holdings.slice(0, maxTiles).map(cell => {
    return <Tile key={cell.coinId} coinId={cell.coinId} />;
  });

  return (
    <div>
      <div className="tiles">{renderedTiles}</div>
    </div>
  );
};

export default IncortaCryptoTiles;
