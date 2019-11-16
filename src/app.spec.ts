import { expect }from 'chai';
import { BigNumber } from 'bignumber.js';

import { createList } from './app';

describe('getSaleAmount function', () => {
  it('should assign the first line as currency rates of given types', () => {
    const mockData = '1000 100 10';
    let currencyTypes = {};
    const fn = createList(currencyTypes);
    expect(fn(mockData).length).to.be.greaterThan(0);
  });
  it('should return the sale amount for each line', () => {
    const mockData = '1.5 3 ETH 3.5';
    let currencyTypes = {
      ETH: new BigNumber(138.8911)
    };
    const fn = createList(currencyTypes);
    expect(fn(mockData)).to.equal('5.250');
  });
});
