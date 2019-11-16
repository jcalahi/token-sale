import readline from 'readline';
import BigNumber from 'bignumber.js';

import { CryptoCurrency } from './interfaces';

export const createList = (currencyRate: CryptoCurrency) => {
  let currencyList: string[] = [];
  BigNumber.set({ ROUNDING_MODE: BigNumber.ROUND_DOWN });

  return (line: any) => {
    if (Object.keys(currencyRate).length === 0) {
      currencyList = line.split(' ');
      currencyRate = {
        BTC: new BigNumber(currencyList[0]),
        ETH: new BigNumber(currencyList[1]),
        DOGE: new BigNumber(currencyList[2])
      };
      return currencyList;
    }
    const lineValues = line.split(' ');
    const saleRate = new BigNumber(lineValues[0]);
    const purchaseAmount = new BigNumber(lineValues[3]);
    const decimalPlaces = parseInt(lineValues[1]);
    const purchaseCurrency = lineValues[2];
  
    const saleAmount = saleRate
      .multipliedBy(purchaseAmount)
      .multipliedBy(currencyRate[purchaseCurrency])
      .dividedBy(currencyRate.ETH)
      .toFixed(decimalPlaces);
    
    console.log(saleAmount); // for logging purposes
    return saleAmount;
  };
};

const currencyTypes: CryptoCurrency = {};
const fetchAmount = createList(currencyTypes);

const rl = readline.createInterface({
  input: process.stdin,
});

rl.on('line', fetchAmount);
