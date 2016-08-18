
export function vnTax() {
    function vnTaxCalc(income, options) {
        //TODO(hoatle):
        //process the input and return the tax result
    };

    vnTaxCalc.supports = function (countryCode, income, options) {
        return ['vn', 'vietnam'].indexOf(countryCode.toLowerCase()) > -1;
    };

    return vnTaxCalc;
}
