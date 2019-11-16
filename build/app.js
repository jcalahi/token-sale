"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var readline_1 = __importDefault(require("readline"));
var bignumber_js_1 = __importDefault(require("bignumber.js"));
bignumber_js_1.default.set({ ROUNDING_MODE: bignumber_js_1.default.ROUND_DOWN });
var rl = readline_1.default.createInterface({
    input: process.stdin,
});
var counter = 0;
var currencies = [];
var currencyRate;
rl.on('line', function (line) {
    counter++;
    if (counter === 1) {
        currencies = line.split(' ');
        currencyRate = {
            BTC: new bignumber_js_1.default(currencies[0]),
            ETH: new bignumber_js_1.default(currencies[1]),
            DOGE: new bignumber_js_1.default(currencies[2])
        };
    }
    else {
        var lineItems = line.split(' ');
        var x = new bignumber_js_1.default(lineItems[0]);
        var y = new bignumber_js_1.default(lineItems[3]);
        var decimalPlaces = parseInt(lineItems[1]);
        var initial = x.multipliedBy(y).multipliedBy(currencyRate[lineItems[2]]).dividedBy(currencyRate.ETH);
        console.log(initial.toFixed(decimalPlaces));
    }
});
