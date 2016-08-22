import { ProgressiveTaxer } from '../core';
import { pick } from '../core/util';


const defaultOptions = {
    type: 'payroll', // or ''
    incomeType: 'gross', // or 'net'
    taxYear: 2016,
    period: 'monthly' , // or yearly
    fromCurrency: 'VND',
    toCurrency: 'VND',
    exchangeRate: 1 // from currency/ to currency
};


const payrollMonthlyBrackets = {
    0.05: [0, 5000000],
    0.1 : [5000000, 10000000],
    0.15: [10000000, 18000000],
    0.2 : [18000000, 32000000],
    0.25: [32000000, 52000000],
    0.3 : [52000000, 80000000],
    0.35: [80000000, ]
};

let payrollMonthlyProgressiveTaxer;


export class VnTaxer {
    constructor(options={}) {
        this.ProgressiveTaxer = options.ProgressiveTaxer || ProgressiveTaxer;
    }

    calc(income, options={}) {
        let taxInfo = Object.assign({}, defaultOptions, pick(options, ...Reflect.ownKeys(defaultOptions)));
        //lazy load
        if (!payrollMonthlyProgressiveTaxer) {
            payrollMonthlyProgressiveTaxer = new this.ProgressiveTaxer(payrollMonthlyBrackets);
        }
        return Object.assign(taxInfo, payrollMonthlyProgressiveTaxer.calc(income));
    }

    isMatched (countryCode, income, options) {
        if (typeof countryCode === 'string') {
            countryCode = countryCode.toLowerCase();
        }
        return ['vn', 'vnm', 704, 'vietnam', 'viet nam'].indexOf(countryCode) > -1;
    }
}
