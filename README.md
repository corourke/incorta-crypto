## Incorta SDK Cryptocurrency Component

This Incorta component uses an external API to fetch cryptocurrency values and format
the data into tiles. It also multiplies the position by the current price to display the market value.

<img width="362" alt="Screen Shot 2021-09-22 at 8 59 32 AM" src="https://user-images.githubusercontent.com/100151/134379687-37266346-6cf1-4444-93ba-f544f54a7e59.png">

To try it out:

- `git clone` the repository
- `cd` into the project directory and install dependencies: `npm install`
- Run the incorta component server: `create-incorta-visual start`
- Navigate to the Incorta analyzer and choose the Developer Visual plugin
- Drag any measure or dimension to the binding tray

See the [SETUP](./SETUP.md) doc for development environement setup instructions.

#### Future improvements

- Internationalization
- Allow the user to select a base currency
- Real-time updating
- Computation of total portfolio value

#### Dependencies

Packages:
[@incorta-org/visual-sdk](https://www.npmjs.com/package/@incorta-org/visual-sdk) -- the Incorta component SDK
[@incorta-org/create-incorta-visual](https://www.npmjs.com/package/@incorta-org/create-incorta-visual) -- CLI to create new Incorta components
[axios](https://www.npmjs.com/package/axios) -- for REST API calls
[use-deep-compare-effect](https://www.npmjs.com/package/use-deep-compare-effect) -- to properly detect changes in the bindings and settings properties

Public APIs:
[CoinGecko API](https://www.coingecko.com/en/api/documentation) -- Market data
[Crypto Icons API](https://cryptoicons.org/) -- Icons
