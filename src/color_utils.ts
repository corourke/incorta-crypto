import Jimp from 'jimp';
import chroma from 'chroma-js';

// Returns dominant color in icon and a suitable background color
// { color: '#f7931a', background: '#f6ebc0' }
// Usage getIconColors(buffer).then(() => {})

type iconColors = {
  color: string;
  background: string;
};

export function getIconColors(image: string): Promise<iconColors> {
  return Jimp.read(image)
    .then(b => {
      const colorCodes = new Map();
      b.resize(25, Jimp.AUTO).scan(0, 0, b.bitmap.width, b.bitmap.height, function (x, y, idx) {
        // x, y is the position of this pixel on the image
        // idx is the start position of this rgba tuple in the bitmap Buffer

        const red = +this.bitmap.data[idx + 0];
        const green = +this.bitmap.data[idx + 1];
        const blue = +this.bitmap.data[idx + 2];
        const alpha = +this.bitmap.data[idx + 3] / 255;

        const color = chroma(red, green, blue).hex();
        if (colorCodes.get(color)) {
          colorCodes.set(color, colorCodes.get(color) + 1);
        } else {
          colorCodes.set(color, 1);
        }
      });
      // Remove black and white
      colorCodes.delete('#000000');
      colorCodes.delete('#ffffff');

      // A sorted array [['#f7931a', 320], ...]
      //const sorted = [...colorCodes.entries()].sort((a, b) => b[1] - a[1]);
      const sorted = Array.from(colorCodes.entries()).sort((a, b) => b[1] - a[1]);
      // return sorted[0][0];

      const iconColor: string = sorted[0][0];
      const bkgdColor: string = chroma(iconColor).set('hsl.s', 0.5).set('hsl.l', 0.9).hex();
      return { color: iconColor, background: bkgdColor };
    })
    .catch(e => {
      console.error(e);
      throw e;
    });
}
