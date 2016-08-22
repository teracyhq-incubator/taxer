import { objectEntries, reversedObjectEntries, map, reduce, filter, pick,
         financialRound } from './util';

/**
 * Calculate the progressive tax by defining the brackets and providing the taxable income.
 *
 * For example:
 *
 * const progressiveTaxer = new ProgressiveTaxer({
 *     0.1: [1, 10000],
 *     0.2: [10001, 20000],
 *     0.3: [20001, ]
 * });
 * 
 * in which brackets is an object:
 * - key: the percentage and
 * - value: an special array (look like range denotion) to denote start and ending amount range
 * 
 * const taxInfo = progressiveTaxer.calc(25000);
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
export class ProgressiveTaxer {

    constructor(brackets) {
        ProgressiveTaxer.validate(brackets);
        this._brackets = brackets;
    }

    /**
     * Validate the brackets so that they should be in assending seperated range order
     * valid ranges: [1, 100] => [101, 200]
     * invalid ranges: [101, 200] => [1, 100]
     * invalid ranges: [1, 100], [97, 200]
     */
    static validate(brackets) {
        map(objectEntries(brackets), ([rate, range]) => {
            return range;
        }).reduce(([prevStart, prevEnd], [currStart, currEnd = Infinity]) => {
            if (prevStart < prevEnd && prevEnd <= currStart && currStart < currEnd) {
                return [currStart, currEnd];
            } else {
                throw 'Invalid brackets';
            }
        });
    }

    //immutable
    get brackets() {
        return Object.assign({}, this._brackets);
    }

    calc(taxableIncome) {
        //TODO(hoatle): taxableIncome should be a number
        let taxInfo = {
            taxableIncome: taxableIncome
        };

        const result = reduce(objectEntries(this._brackets), (acc, curr) => {
            if (taxableIncome === acc.calulatedAmount) {
                return acc;
            }
            const [rate, [currStart, currEnd = Infinity]] = curr;
            if (taxableIncome > currEnd) {
                const currTaxableIncome = financialRound(currEnd - acc.calulatedAmount);
                const currTaxAmount = financialRound(currTaxableIncome * rate);
                acc.taxAmount += currTaxAmount
                acc.calulatedAmount += currTaxableIncome;
                acc.taxBand.push({
                    taxRate: +rate,
                    taxableIncome: currTaxableIncome,
                    taxAmount: currTaxAmount
                });
            } else {
                const currTaxableIncome = financialRound(taxableIncome - acc.calulatedAmount);
                const currTaxAmount = financialRound(currTaxableIncome * rate);
                acc.taxAmount += currTaxAmount;
                acc.calulatedAmount += currTaxableIncome;
                acc.taxBand.push({
                    taxRate: +rate,
                    taxableIncome: currTaxableIncome,
                    taxAmount: currTaxAmount
                });
            }
            return acc;
        }, {
            taxAmount: 0,
            calulatedAmount: 0,
            taxBand: []
        });

        //console.log(result);
        Object.assign(taxInfo, {
            netIncome: taxableIncome - result.taxAmount
        });
        Object.assign(taxInfo, pick(result, 'taxAmount', 'taxBand'));

        return taxInfo;
    }
}
