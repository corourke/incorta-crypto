## Incorta SDK Cryptocurrency Component

This Incorta component uses an external API to fetch cryptocurrency values and format
the data into a tile.

The plans for this are to read a crypto portfolio from a table, and render multiple
tiles, and possibly do something with the portfolio positions as well.

The current code is still rough -- right now it pulls the coin name from settings and only
renders one tile. Valid coin names can be
found in the id element from here: (ex: bitcoin, ethereum, cardano, poladot)

`https://api.coingecko.com/api/v3/coins/list`

This component queries the cryptocurrency API at:

https://www.coingecko.com/en/api/documentation

To try it out:

- In the project directory `npm install`
- Run the incorta component server `create-incorta-visual start`
- Navigate to the Incorta analyzer and choose the Developer Visual plugin
- Drag any measure or dimension to the binding tray
