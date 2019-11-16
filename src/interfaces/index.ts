import BigNumber from 'bignumber.js';

export interface CryptoCurrency {
  [currency: string]: BigNumber.Instance
};
