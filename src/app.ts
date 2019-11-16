import readline from 'readline';
import BigNumber from 'bignumber.js';

import { CryptoCurrency } from './interfaces';

BigNumber.set({ ROUNDING_MODE: BigNumber.ROUND_DOWN });

const rl = readline.createInterface({
  input: process.stdin,
});

let counter = 0;
let currencyList = [];
let currencyRate: CryptoCurrency;

rl.on('line', (line) => {
  counter++;
  if (counter === 1) {
    currencyList = line.split(' ');
    currencyRate = {
      BTC: new BigNumber(currencyList[0]),
      ETH: new BigNumber(currencyList[1]),
      DOGE: new BigNumber(currencyList[2])
    };
  } else {
    const lineValues = line.split(' ');
    const saleRate = new BigNumber(lineValues[0]);
    const purchaseAmount = new BigNumber(lineValues[3]);
    const decimalPlaces = parseInt(lineValues[1]);
    const purchaseCurrency = lineValues[2];

    const saleAmount = saleRate
      .multipliedBy(purchaseAmount)
      .multipliedBy(currencyRate[purchaseCurrency])
      .dividedBy(currencyRate.ETH);

    console.log(saleAmount.toFixed(decimalPlaces));
  }
});
