## Incorta SDK Cryptocurrency Component

Retrieves current cryptocurrency price data and displays a dashboard tile for each coin
position in a portfolio. It also refreshes the data periodically. This is an example
of combinining real-time data fetched from an external source with stored data. This
technique could also be used in FOREX appliciations.

<img width="341" alt="Sample of rendered crypto tile" src="assets/tile_sample.png">

To try it out:

- `git clone` the repository
- `cd` into the project directory and install dependencies: `npm install`
- Run the incorta component server: `create-incorta-component start`
- Upload the `data/positions.csv` file into Incorta and create a schema for it. Be sure to load the data.
- Navigate to the Incorta analyzer and choose the Developer Visual plugin
- Drag columns containing coin identifiers (i.e. 'bitcoin', 'ethereum'), and column containing coin holdings (quantity) into the binding tray

See the [SETUP](./SETUP.md) doc for development environement setup instructions.

#### Future improvements

- Internationalization
- Allow the user to select a base currency
- Computation of total portfolio value
- Add tests
