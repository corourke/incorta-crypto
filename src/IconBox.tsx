import React, { useState, useEffect } from 'react';
import ImageColors from 'react-native-image-colors';
import { WebImageColors } from 'react-native-image-colors/lib/typescript/types';
import './styles.less';

interface IconProps {
  symbol: string;
}

// I was using https://cryptoicons.org/ which is versatile, but it doesn't have all the coins
// Currently using https://cryptoicon-api.vercel.app/
// It might be better to have all the SVG files in the project:
//   https://github.com/ErikThiart/cryptocurrency-icons
//   https://github.com/reddavis/Crypto-Icons-API/tree/master/public/svg/icon

// TODO: Need to handle errors and provide a fallback

export const IconBox: React.FC<IconProps> = ({ symbol }) => {
  const [backgroundColor, setBackgroundColor] = useState<string>('');

  // Determine a suitable background color based on the icon
  const iconUrl = `https://cryptoicon-api.vercel.app/api/icon/${symbol}`;
  useEffect(() => {
    const fetchColors = async () => {
      const imageColors = (await ImageColors.getColors(iconUrl, {
        fallback: '#d5dbe5'
      })) as WebImageColors;
      console.log('COLORS, ', symbol, imageColors);
      setBackgroundColor(imageColors.lightVibrant || '#d5dbe5');
    };
    // console.log('IconBox.useEffect COLOR');
    fetchColors();
    // console.log('backgroundColor: COLOR', backgroundColor);
  }, []);

  return (
    <div className="iconBox" style={{ color: backgroundColor }}>
      <img src={iconUrl} />
    </div>
  );
};
