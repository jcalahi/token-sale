import readline from 'readline';
import BigNumber from 'bignumber.js';

import { CryptoCurrency } from './interfaces';

BigNumber.set({ ROUNDING_MODE: BigNumber.ROUND_DOWN });

const rl = readline.createInterface({
  input: process.stdin,
});

let counter = 0;
let currencies = [];
let currencyRate: CryptoCurrency;

rl.on('line', (line) => {
  counter++;
  if (counter === 1) {
    currencies = line.split(' ');
    currencyRate = {
      BTC: new BigNumber(currencies[0]),
      ETH: new BigNumber(currencies[1]),
      DOGE: new BigNumber(currencies[2])
    };
  } else {
    const lineItems = line.split(' ');
    let x = new BigNumber(lineItems[0]);
    let y = new BigNumber(lineItems[3]);
    let decimalPlaces = parseInt(lineItems[1]);
    let initial = x.multipliedBy(y).multipliedBy(currencyRate[lineItems[2]]).dividedBy(currencyRate.ETH);
    console.log(initial.toFixed(decimalPlaces));
  }
});
