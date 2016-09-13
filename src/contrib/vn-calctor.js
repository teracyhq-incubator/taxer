import { Calctor, ProgressiveCalctor } from '../core';


const million = 1000000;

/* eslint-disable space-infix-ops, key-spacing, array-bracket-spacing, comma-dangle */
const monthlyPayrollBrackets = {
  0.05: [0, 5*million],
  0.1 : [5*million, 10*million],
  0.15: [10*million, 18*million],
  0.2 : [18*million, 32*million],
  0.25: [32*million, 52*million],
  0.3 : [52*million, 80*million],
  0.35: [80*million, ],
};

const yearlyPayrollBrackets = {
  0.05: [0, 5*12*million],
  0.1: [5*12*million, 10*12*million],
  0.15: [10*12*million, 18*12*million],
  0.2: [18*12*million, 32*12*million],
  0.25: [32*12*million, 52*12*million],
  0.3: [52*12*million, 80*12*million],
  0.35: [80*12*million, ],
};

/* eslint-enable */

const monthlyPayrollProgressiveCalctor = new ProgressiveCalctor(monthlyPayrollBrackets);
const yearlyPayrollProgressiveCalctor = new ProgressiveCalctor(yearlyPayrollBrackets);


export class VnCalctor extends Calctor {

  get currency() {
    return 'VND';
  }

  get supportedCountryCodes() {
    return ['vn', 'vnm', 704, 'vietnam', 'viet nam'];
  }


  doMonthlyGrossPayrollCalc(income/* , options */) {
    return monthlyPayrollProgressiveCalctor.calc(income);
  }

  doYearlyGrossPayrollCalc(income/* , options */) {
    return yearlyPayrollProgressiveCalctor.calc(income);
  }

  doMonthlyNetPayrollCalc(income, options) {
    return monthlyPayrollProgressiveCalctor.calc(income, options);
  }

  doYearlyNetPayrollCalc(income, options) {
    return yearlyPayrollProgressiveCalctor.calc(income, options);
  }

}
