import { objectEntries, map, reduce, pick,
     financialRound } from './util';

/**
 * Calculate the progressive tax by defining the brackets and providing the taxable income.
 *
 * For example:
 *
 * const progressiveCalctor = new ProgressiveCalctor({
 *     0.1: [1, 10000],
 *     0.2: [10001, 20000],
 *     0.3: [20001, ]
 * });
 *
 * in which brackets is an object:
 * - key: the percentage and
 * - value: an special array (look like range denotion) to denote start and ending amount range
 *
 * const taxInfo = progressiveCalctor.calc(25000);
 *
 * And the taxInfo should be like:
 *
 * taxInfo = {
 *      taxableIncome: 25000,
 *      taxAmount: 4500,
 *      netIncome: 20500,
 *      taxBand: [{
 *          taxRate: 0.1,
 *          taxableIncome: 10000,
 *          taxAmount: 1000
 *      }, {
 *          taxRate: 0.2,
 *          taxableIncome: 10000,
 *          taxAmount: 2000
 *      }, {
 *          taxRate: 0.3,
 *          taxableIncome: 5000,
 *          taxAmount: 1500
 *      }]
 * }
 *
 */
export class ProgressiveCalctor {

  constructor(brackets) {
    ProgressiveCalctor.validate(brackets);
    this._brackets = brackets;
  }

  /**
   * Validate the brackets so that they should be in assending seperated range order
   * valid ranges: [1, 100] => [101, 200]
   * invalid ranges: [101, 200] => [1, 100]
   * invalid ranges: [1, 100], [97, 200]
   */
  static validate(brackets) {
    map(objectEntries(brackets), ([, range]) => range)
    .reduce(([prevStart, prevEnd], [currStart, currEnd = Infinity]) => {
      if (prevStart < prevEnd && prevEnd <= currStart && currStart < currEnd) {
        return [currStart, currEnd];
      }
      throw new Error('Invalid brackets');
    });
  }

  // immutable
  get brackets() {
    return Object.assign({}, this._brackets);
  }

  _calcFromGross(taxableIncome/* , options */) {
    const taxInfo = {
      taxableIncome,
    };

    const result = reduce(objectEntries(this._brackets), (acc, curr) => {
      const currAcc = acc;
      if (taxableIncome === currAcc.calculatedAmount) {
        return currAcc;
      }
      const [rate, [, currEnd = Infinity]] = curr;
      let currTaxableIncome;
      let currTaxAmount;
      if (taxableIncome > currEnd) {
        currTaxableIncome = financialRound(currEnd - currAcc.calculatedAmount);
        currTaxAmount = financialRound(currTaxableIncome * rate);
      } else {
        currTaxableIncome = financialRound(taxableIncome - currAcc.calculatedAmount);
        currTaxAmount = financialRound(currTaxableIncome * rate);
      }

      currAcc.taxAmount += currTaxAmount;
      currAcc.calculatedAmount += currTaxableIncome;
      currAcc.taxBand.push({
        taxRate: +rate,
        taxableIncome: currTaxableIncome,
        taxAmount: currTaxAmount,
      });
      return currAcc;
    }, {
      taxAmount: 0,
      calculatedAmount: 0,
      taxBand: [],
    });

    Object.assign(taxInfo, {
      netIncome: taxableIncome - result.taxAmount,
    });
    Object.assign(taxInfo, pick(result, 'taxAmount', 'taxBand'));

    return taxInfo;
  }

  _calcFromNet(netIncome/* , options */) {
    const result = reduce(objectEntries(this.brackets), (acc, curr) => {
      const currAcc = acc;
      const [rate, [, currEnd = Infinity]] = curr;

      if (currAcc.netIncome === netIncome) {
        return currAcc;
      }

      let currTaxableIncome;
      let currTaxAmount;
      let currNetIncome;

      if (Number.isFinite(currEnd)) {
        currTaxableIncome = financialRound(currEnd - currAcc.calculatedAmount);
        currTaxAmount = financialRound(currTaxableIncome * rate);
        currNetIncome = currTaxableIncome - currTaxAmount;
        const nextNetIncome = currAcc.netIncome + (currTaxableIncome - currTaxAmount);
        if (nextNetIncome > netIncome) {
          // console.log('currNetIncome', currNetIncome);
          currNetIncome = netIncome - currAcc.netIncome;
          currTaxableIncome = financialRound(currNetIncome / (1 - rate));
          currTaxAmount = financialRound(currTaxableIncome * rate);
        }
      } else {
        // Infinity
        currNetIncome = netIncome - currAcc.netIncome;
        // netIncome = taxableIncome - taxAmount
        // taxAmount = taxableIncome * rate
        // netIncome = taxableIncome - rate * taxableIncome
        // netIncome = (1 - rate) * taxableIncome
        // taxableIncome = netIncome / (1 - rate)
        currTaxableIncome = financialRound(currNetIncome / (1 - rate));
        currTaxAmount = financialRound(currTaxableIncome * rate);
      }

      currAcc.taxAmount += currTaxAmount;
      currAcc.calculatedAmount += currTaxableIncome;
      currAcc.netIncome += currNetIncome;

      currAcc.taxBand.push({
        taxRate: +rate,
        taxableIncome: currTaxableIncome,
        taxAmount: currTaxAmount,
      });

      return currAcc;
    }, {
      taxAmount: 0,
      netIncome: 0,
      calculatedAmount: 0,
      taxBand: [],
    });

    const taxInfo = {
      taxableIncome: result.netIncome + result.taxAmount,
      netIncome,
    };
    Object.assign(taxInfo, pick(result, 'taxAmount', 'taxBand'));
    return taxInfo;
  }

  calc(income, options = { incomeType: 'gross' }) {
    // TODO(hoatle): income should be a number
    if (options.incomeType === 'net') {
      return this._calcFromNet(income, options);
    }
    return this._calcFromGross(income, options);
  }
}
