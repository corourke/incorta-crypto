import {
  AppliedPrompts,
  Context,
  onDrillDownFunction,
  ResponseData,
  TContext
} from '@incorta-org/component-sdk';
import React from 'react';
import {Tile} from './Tile'

interface Props {
  context: Context<TContext>;
  prompts: AppliedPrompts;
  response: ResponseData;
  drillDown: onDrillDownFunction;
}

// Incorta component Displays current cryptocurency price and market information
// TODO: Needs internationalization
const CryptoTiles = ({ context, prompts, response, drillDown }: Props) => {
  console.log({ context, prompts, response, drillDown });

  const maxTiles = context.component.settings.maxTiles || 4;

  // Extract the crypto positions
  const holdings: { slug: string; quantity: number }[] = response.data.map(cell => {
    return { slug: cell[0].value, quantity: Number(cell[1].value) };
  });

  // Render a tile for each row returned, up to the maxTiles setting
  const renderedTiles = holdings.slice(0, maxTiles).map(cell => {
    return <Tile key={cell.slug} coinId={cell.slug} />;
  });

  return (
    <div>
      <div className="tiles">{renderedTiles}</div>
    </div>
  );

};

export default CryptoTiles;
