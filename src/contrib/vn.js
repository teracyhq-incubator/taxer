

const defaultOptions = {
    type: 'payroll', // or ''
    incomeType: 'gross', // or 'net'
    taxYear: 2016,
    period: 'monthly' , // or yearly
    fromCurrency: 'VND',
    toCurrency: 'VND',
    exchangeRate: 1 // from currency/ to currency
};


const FIVE_PERCENT = 5/100;
const TEN_PERCENT = 10/100;
const FIFTEEN_PERCENT = 15/100;
const TWENTY_PERCENT = 20/100;
const TWENTY_FIVE_PERCENT = 25/100;
const THIRTY_PERCENT = 30/100;
const THIRTY_FIVE_PERCENT = 35/100;

function monthlyPayrollIncomTax(income) {
  if (income <= 5000000) {
    return income * FIVE_PERCENT;
  } else if (income <= 10000000) {
    return  income * TEN_PERCENT - 250000;
  } else if (income <= 18000000) {
    return income * FIFTEEN_PERCENT - 750000;
  } else if (income <= 32000000) {
    return  income * TWENTY_PERCENT - 1650000;
  } else if (income <= 52000000) {
    return income * TWENTY_FIVE_PERCENT - 3250000;
  } else if (income <= 80000000) {
    return income * THIRTY_PERCENT - 5850000;
  } else {
    return income * THIRTY_FIVE_PERCENT - 9850000;
  }
}


function vnTaxCalcPayroll(income, options) {
    if (options.incomeType === 'net') {

    } else {
        //gross
        if (options.period === 'yearly') {

        } else {
            // monthly
            const taxes = monthlyPayrollIncomTax(income);

            return {
                type: options.type,
                incomeType: options.incomeType,
                taxYear: options.taxYear,
                period: options.period,
                fromCurrency: options.fromCurrency,
                toCurrency: options.toCurrency,
                exchangeRate: options.exchangeRate,
                grossIncome: income,
                netIncome: income - taxes,
                taxes: taxes
            }
        }
    }
}

export function vnTax() {

    function vnTaxCalc(income, options) {
        options = Object.assign({}, defaultOptions, options);
        if (options.type === 'payroll') {
            return vnTaxCalcPayroll(income, options);
        }
        //TODO(hoatle):
        //process the input and return the tax info
        // ie: return taxInfo(result);
    };

    vnTaxCalc.supports = function (countryCode, income, options) {
        if (typeof countryCode === 'string') {
            countryCode = countryCode.toLowerCase();
        }
        return ['vn', 'vnm', 704, 'vietnam', 'viet nam'].indexOf(countryCode) > -1;
    };

    return vnTaxCalc;
}
