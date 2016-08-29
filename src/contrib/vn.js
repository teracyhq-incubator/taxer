import { Calctor, ProgressiveTaxer } from '../core';


const monthlyPayrollBrackets = {
    0.05: [0, 5000000],
    0.1 : [5000000, 10000000],
    0.15: [10000000, 18000000],
    0.2 : [18000000, 32000000],
    0.25: [32000000, 52000000],
    0.3 : [52000000, 80000000],
    0.35: [80000000, ]
};

const yearlyPayrollBrackets = {
    0.05: [0, 60000000],
    0.1: [60000000, 120000000],
    0.15: [120000000, 216000000],
    0.2: [216000000, 384000000],
    0.25: [384000000, 624000000],
    0.3: [624000000, 960000000],
    0.35: [960000000, ]
};

const monthlyPayrollProgressiveTaxer = new ProgressiveTaxer(monthlyPayrollBrackets);
const yearlyPayrollProgressiveTaxer = new ProgressiveTaxer(yearlyPayrollBrackets);


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
        return monthlyPayrollProgressiveTaxer.calc(income);
    }

    doYearlyGrossPayrollCalc(income, options) {
        return yearlyPayrollProgressiveTaxer.calc(income);
    }

}
