import { decode, IDecodedPNG } from 'fast-png';
import chroma from 'chroma-js';

// Returns dominant color in icon and a suitable background color
// { color: '#f7931a', background: '#f6ebc0' }
// Usage const { color, background } = getIconColors(image);

type iconColors = {
  color: string;
  background: string;
};

export function getIconColors(image: Buffer): iconColors {
  const di: IDecodedPNG = decode(image);
  const colorFreq = new Map();

  // Scan the image array
  for (var i = 0; i < di.data.length; i++) {
    var rgba = new Array();
    // If a PNG palette is present, lookup colors in the palette
    if (di.palette) {
      rgba = di.palette[di.data[i]];
    } else {
      rgba = [di.data[i], di.data[i + 1], di.data[i + 2], di.data[i + 3]];
      i = i + 3;
    }

    // Convert the RGB colors to a chroma-js object and get the hex code.
    const color = chroma(rgba[0], rgba[1], rgba[2]).hex();
    // Count the instances of each color
    if (colorFreq.get(color)) {
      colorFreq.set(color, colorFreq.get(color) + 1);
    } else {
      colorFreq.set(color, 1);
    }
  }
  // Remove black and white
  colorFreq.delete('#000000');
  colorFreq.delete('#ffffff');

  // A sorted array [['#f7931a', 320], ...]
  //const sorted = [...colorCodes.entries()].sort((a, b) => b[1] - a[1]);
  const sorted = Array.from(colorFreq.entries()).sort((a, b) => b[1] - a[1]);

  const iconColor: string = sorted[0][0];
  const bkgdColor: string = chroma(iconColor).set('hsl.s', 0.5).set('hsl.l', 0.9).hex();
  return { color: iconColor, background: bkgdColor };
}
