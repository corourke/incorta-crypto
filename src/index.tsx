// Displays current cryptocurency price and market information
// See API documentation at https://www.coingecko.com/en/api/documentation
// TODO: Needs internationalization
import React, { useState, useEffect } from 'react';
import { VisualProps } from '@incorta-org/visual-sdk';
import { Tile } from './Tile';

const IncortaCrypto = (props: VisualProps) => {
  const [maxTiles, setMaxTiles] = useState<number>();

  useEffect(() => {
    // This seems to fire on just about any update to props,
    // Probably need to use something like https://www.npmjs.com/package/use-deep-compare-effect
    console.log('SETTINGS CHANGE');
    const settings = props.insight.context.insight.settings;
    if (settings) {
      if (settings.maxTiles !== maxTiles) {
        setMaxTiles(settings.maxTiles);
        console.log('MAXTILES UPDATE');
      }
    }
  }, [props.insight.context.insight.settings]);

  useEffect(() => {
    // This seems to fire on any change might need to use useDeepCompareEffect
    console.log('BINDINGS CHANGE');
  }, [props.insight.context.insight.bindings]);

  // TODO: Only render MAXTILES
  const renderedTiles = props.insight.data.data.map(cell => {
    const c: string = cell[0].value;
    const p: number = Number(cell[1].value);
    return <Tile key={c} coinId={c} aggPosition={p} />;
  });

  return <div className="tiles">{renderedTiles}</div>;
};

export default IncortaCrypto;
