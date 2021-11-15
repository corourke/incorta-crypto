// Incorta component Displays current cryptocurency price and market information

// TODO: Needs internationalization
import React, { useState, useEffect } from 'react';
import { ComponentProps } from '@incorta-org/component-sdk';
import { Tile } from './Tile';

const IncortaCrypto = (props: ComponentProps) => {
  const maxTiles = props.context.component.settings?.maxTiles || 4;

  console.log(props);

  // Extract the crypto positions
  const holdings: { coinId: string; quantity: number }[] = props.response.data.map(cell => {
    return { coinId: cell[0].value, quantity: Number(cell[1].value) };
  });

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

export default IncortaCrypto;
