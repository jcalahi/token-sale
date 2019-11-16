"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var readline_1 = __importDefault(require("readline"));
var bignumber_js_1 = __importDefault(require("bignumber.js"));
exports.createList = function (currencyRate) {
    var currencyList = [];
    bignumber_js_1.default.set({ ROUNDING_MODE: bignumber_js_1.default.ROUND_DOWN });
    return function (line) {
        if (Object.keys(currencyRate).length === 0) {
            currencyList = line.split(' ');
            currencyRate = {
                BTC: new bignumber_js_1.default(currencyList[0]),
                ETH: new bignumber_js_1.default(currencyList[1]),
                DOGE: new bignumber_js_1.default(currencyList[2])
            };
            return currencyList;
        }
        var lineValues = line.split(' ');
        var saleRate = new bignumber_js_1.default(lineValues[0]);
        var purchaseAmount = new bignumber_js_1.default(lineValues[3]);
        var decimalPlaces = parseInt(lineValues[1]);
        var purchaseCurrency = lineValues[2];
        var saleAmount = saleRate
            .multipliedBy(purchaseAmount)
            .multipliedBy(currencyRate[purchaseCurrency])
            .dividedBy(currencyRate.ETH)
            .toFixed(decimalPlaces);
        console.log(saleAmount); // for logging purposes
        return saleAmount;
    };
};
var currencyTypes = {};
var fetchAmount = exports.createList(currencyTypes);
var rl = readline_1.default.createInterface({
    input: process.stdin,
});
rl.on('line', fetchAmount);
