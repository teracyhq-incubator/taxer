import { Calctor, ProgressiveTaxer } from '../core';


const payrollMonthlyBrackets = {
    0.05: [0, 5000000],
    0.1 : [5000000, 10000000],
    0.15: [10000000, 18000000],
    0.2 : [18000000, 32000000],
    0.25: [32000000, 52000000],
    0.3 : [52000000, 80000000],
    0.35: [80000000, ]
};

const payrollMonthlyProgressiveTaxer = new ProgressiveTaxer(payrollMonthlyBrackets);


export class VnCalctor extends Calctor {

    get defaultOptions() {
        return Object.assign({}, super.defaultOptions, {
            fromCurrency: 'VND',
            toCurrency: 'VND'
        });
    }

    get supportedCountryCodes() {
        return ['vn', 'vnm', 704, 'vietnam', 'viet nam'];
    }


    doMonthlyGrossPayrollCalc(income, options) {
        return payrollMonthlyProgressiveTaxer.calc(income);
    }

}
