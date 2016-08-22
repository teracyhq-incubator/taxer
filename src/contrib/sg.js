
export class SgTaxer {

    constructor() {
    }

    isMatched(countryCode, income, options) {
        if (typeof countryCode === 'string') {
            countryCode = countryCode.toLowerCase();
        }

        return ['sg', 'sgp', 702, 'singapore'].indexOf(countryCode) > - 1;
    }

    calc(income, options) {

    }

}
