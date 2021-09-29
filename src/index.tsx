// Displays current cryptocurency price and market information
// See API documentation at https://www.coingecko.com/en/api/documentation

// TODO: Needs internationalization
import React, { useState, useEffect } from 'react';
import { VisualProps } from '@incorta-org/visual-sdk';
import { Tile } from './Tile';

const IncortaCrypto = (props: VisualProps) => {
  const [maxTiles, setMaxTiles] = useState<number>(4);

  useEffect(() => {
    // TODO: This seems to fire on just about any update to props,
    // Probably need to use something like https://www.npmjs.com/package/use-deep-compare-effect
    console.log('SETTINGS CHANGE');
    const settings = props.insight.context.insight.settings;
    if (settings) {
      if (settings.maxTiles !== maxTiles) {
        setMaxTiles(settings.maxTiles);
      }
    }
  }, [props.insight.context.insight.settings]);

  useEffect(() => {
    // TODO: This seems to fire on any change, might need to use useDeepCompareEffect
    console.log('BINDINGS CHANGE');
  }, [props.insight.context.insight.bindings]);

  // Render a tile for each row returned
  var tiles = 0;
  const renderedTiles = props.insight.data.data.map(cell => {
    const coinId: string = cell[0].value;
    const position: number = Number(cell[1].value);

    if (tiles++ < maxTiles) {
      return <Tile key={coinId} coinId={coinId} aggPosition={position} />;
    } else return null;
  });

  return (
    <div>
      <div className="tiles">{renderedTiles}</div>
    </div>
  );
};

export default IncortaCrypto;
