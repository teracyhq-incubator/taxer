import { Exector } from './exector';
import { pick } from './util';

const defaultOptions = {
    type: 'payroll',
    incomeType: 'gross',
    taxYear: new Date().getFullYear(),
    period: 'monthly',
    fromCurrency: null,
    toCurrency: null,
    exchangeRate: 1
};

/**
 * The base class for easier implementation of Calctorable interface to be used with the @{Taxer} class.
 *
 * interface TaxBand {
 *   taxRate: Number
 *   taxableIncome: Number
 *   taxAmount: Number
 * }
 *
 *
 * interface TaxInfo {
 *   type: 'payroll' || String
 *   incomeType: 'gross' || 'net'
 *   taxYear: Number || String
 *   period: 'monthly' || 'yearly'
 *   taxableIncome: Number
 *   taxAmount: Number
 *   netIncome: Number
 *   taxBand: [<TaxBand>]
 * }
 *
 *
 * interface Calctorable {
 *   isMatched(countryCode, income, options={}): boolean
 *   calc(income, options): TaxInfo
 * }
 */
export class Calctor extends Exector {

    get defaultOptions() {
        return defaultOptions;
    }

    /**
     * By default, no country codes supported
     * @returns {Array}
     */
    get supportedCountryCodes() {
        return [];
    }

    get supportedIncomeRange() {
        return [0, Infinity];
    }


    isMatched(countryCode, income=0, options={}) {
        return (this.isCountryCodeMatched(countryCode) &&
                this.isIncomeMatched(income) &&
                this.isOptionsMatched(options)) ||
                this.isCombinationMatched(countryCode, income, options);
    }

    isCountryCodeMatched(countryCode) {
        if (typeof countryCode === 'string') {
            countryCode = countryCode.toLowerCase();
        }
        return this.supportedCountryCodes.indexOf(countryCode) > - 1;
    }

    isIncomeMatched(income) {
        const [rangeStart, rangeEnd] = this.supportedIncomeRange;
        return rangeStart <= income && income <= rangeEnd;
    }

    isOptionsMatched(options) {
        return true;
    }

    isCombinationMatched(countryCode, income, options) {
        return false;
    }

    /**
     * Gets processed income
     *
     * @param income
     * @returns {*}
     */
    processedIncome(income) {
        this.income = income;
        return this.income;
    }

    /**
     * Gets processed options
     *
     * @param options
     * @returns {*}
     */
    processedOptions(options) {
        this.options = Object.assign({}, this.defaultOptions, options);
        return this.options;
    }

    /**
     * Gets processed tax info
     *
     * @param taxInfo
     */
    processedTaxInfo(taxInfo) {
        this.taxInfo = Object.assign({}, pick(this.options, ...Reflect.ownKeys(defaultOptions)));
        return Object.assign(this.taxInfo, taxInfo);
    }


    calc(income, options) {
        this.processedIncome(income);
        this.processedOptions(options);
    }
}
