import { Calctor, ProgressiveCalctor } from '../core';

const thousand = 1000;

/* eslint-disable space-infix-ops, key-spacing, array-bracket-spacing, comma-dangle */
const yearlyPayrollBrackets2012to2016 = {
  0:     [0, 20*thousand],
  0.02:  [20*thousand, (20+10)*thousand],
  0.035: [30*thousand, (30+10)*thousand],
  0.07:  [40*thousand, (40+40)*thousand],
  0.115: [80*thousand, (80+40)*thousand],
  0.15:  [120*thousand, (120+40)*thousand],
  0.17:  [160*thousand, (160+40)*thousand],
  0.18:  [200*thousand, (200+120)*thousand],
  0.2:   [320*thousand, ],
};

const monthlyPayrollBrackets2012to2016 = {
  0:     [0, (20*thousand)/12],
  0.02:  [(20*thousand)/12, ((20+10)*thousand)/12],
  0.035: [(30*thousand)/12, ((30+10)*thousand)/12],
  0.07:  [(40*thousand)/12, ((40+40)*thousand)/12],
  0.115: [(80*thousand)/12, ((80+40)*thousand)/12],
  0.15:  [(120*thousand)/12, ((120+40)*thousand)/12],
  0.17:  [(160*thousand)/12, ((160+40)*thousand)/12],
  0.18:  [(200*thousand)/12, ((200+120)*thousand)/12],
  0.2:   [(320*thousand)/12, ],
};

const yearlyPayrollBracketsFrom2017 = {
  0:     [0, 20*thousand],
  0.02:  [20*thousand, (20+10)*thousand],
  0.035: [30*thousand, (30+10)*thousand],
  0.07:  [40*thousand, (40+40)*thousand],
  0.115: [80*thousand, (80+40)*thousand],
  0.15:  [120*thousand, (120+40)*thousand],
  0.18:  [160*thousand, (160+40)*thousand],
  0.19:  [200*thousand, (200+40)*thousand],
  0.195: [240*thousand, (240+40)*thousand],
  0.2:   [280*thousand, (280+40)*thousand],
  0.22:  [320*thousand, ],
};

const monthlyPayrollBracketsFrom2017 = {
  0:     [0, (20*thousand)/12],
  0.02:  [(20*thousand)/12, ((20+10)*thousand)/12],
  0.035: [(30*thousand)/12, ((30+10)*thousand)/12],
  0.07:  [(40*thousand)/12, ((40+40)*thousand)/12],
  0.115: [(80*thousand)/12, ((80+40)*thousand)/12],
  0.15:  [(120*thousand)/12, ((120+40)*thousand)/12],
  0.18:  [(160*thousand)/12, ((160+40)*thousand)/12],
  0.19:  [(200*thousand)/12, ((200+40)*thousand)/12],
  0.195: [(240*thousand)/12, ((240+40)*thousand)/12],
  0.2:   [(280*thousand)/12, ((280+40)*thousand)/12],
  0.22:  [(320*thousand)/12, ],
};
/* eslint-enable */

const monthlyPayrollProgressiveCalctor2012to2016 =
  new ProgressiveCalctor(monthlyPayrollBrackets2012to2016);
const yearlyPayrollProgressiveCalctor2012to2016 =
  new ProgressiveCalctor(yearlyPayrollBrackets2012to2016);
const monthlyPayrollProgressiveCalctorFrom2017 =
  new ProgressiveCalctor(monthlyPayrollBracketsFrom2017);
const yearlyPayrollProgressiveCalctorFrom2017 =
  new ProgressiveCalctor(yearlyPayrollBracketsFrom2017);


export class SgCalctor extends Calctor {

  get currency() {
    return 'SGD';
  }

  get supportedCountryCodes() {
    return ['sg', 'sgp', 702, 'singapore'];
  }

  doMonthlyGrossPayrollCalc(income, options) {
    const mainTaxYear = this.options.mainTaxYear;
    if (mainTaxYear >= 2012 && mainTaxYear <= 2016) {
      return monthlyPayrollProgressiveCalctor2012to2016.calc(income, options);
    } else if (mainTaxYear >= 2017) {
      return monthlyPayrollProgressiveCalctorFrom2017.calc(income, options);
    }
    throw new Error('Not Supported');
  }

  doYearlyGrossPayrollCalc(income, options) {
    const mainTaxYear = this.options.mainTaxYear;

    if (mainTaxYear >= 2012 && mainTaxYear <= 2016) {
      return yearlyPayrollProgressiveCalctor2012to2016.calc(income, options);
    } else if (mainTaxYear >= 2017) {
      return yearlyPayrollProgressiveCalctorFrom2017.calc(income, options);
    }
    throw new Error('Not Supported');
  }

  doMonthlyNetPayrollCalc(income, options) {
    const mainTaxYear = this.options.mainTaxYear;

    if (mainTaxYear >= 2012 && mainTaxYear <= 2016) {
      return monthlyPayrollProgressiveCalctor2012to2016.calc(income, options);
    } else if (mainTaxYear >= 2017) {
      return monthlyPayrollProgressiveCalctorFrom2017.calc(income, options);
    }
    throw new Error('Not Supported');
  }

  doYearlyNetPayrollCalc(income, options) {
    const mainTaxYear = this.options.mainTaxYear;

    if (mainTaxYear >= 2012 && mainTaxYear <= 2016) {
      return yearlyPayrollProgressiveCalctor2012to2016.calc(income, options);
    } else if (mainTaxYear >= 2017) {
      return yearlyPayrollProgressiveCalctorFrom2017.calc(income, options);
    }
    throw new Error('Not Supported');
  }

}
