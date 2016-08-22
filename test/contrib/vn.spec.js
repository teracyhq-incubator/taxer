import * as assert from 'assert';

import { VnTaxer } from '../../src/contrib/vn';

describe('VnTaxer', () => {

    describe('#isMatched', () => {
        it('should support Vietnam by country codes', () => {
            const vnTaxer = new VnTaxer();
            assert.ok(vnTaxer.isMatched('vn'));
            assert.ok(vnTaxer.isMatched('VN'));
            assert.ok(vnTaxer.isMatched('vnm'));
            assert.ok(vnTaxer.isMatched('VNM'));
            assert.ok(vnTaxer.isMatched(704));
            assert.ok(vnTaxer.isMatched('vietnam'));
            assert.ok(vnTaxer.isMatched('Vietnam'));
            assert.ok(vnTaxer.isMatched('viet nam'));
            assert.ok(vnTaxer.isMatched('Viet Nam'));
        });
    });

    describe('#calc', () => {
        it('should support monthly payroll gross income', () => {
            const vnTaxer = new VnTaxer();
            const taxInfo = vnTaxer.calc(31200000);

            assert.equal(taxInfo.type, 'payroll');
            assert.equal(taxInfo.incomeType, 'gross');
            assert.equal(taxInfo.taxYear, 2016);
            assert.equal(taxInfo.period, 'monthly');
            assert.equal(taxInfo.fromCurrency, 'VND');
            assert.equal(taxInfo.toCurrency, 'VND');
            assert.equal(taxInfo.exchangeRate, 1);
            assert.equal(taxInfo.taxableIncome, 31200000);
            assert.equal(taxInfo.netIncome, 26610000);
            assert.equal(taxInfo.taxAmount, 4590000);
            assert.deepEqual(taxInfo.taxBand, [{
                taxRate: 0.05,
                taxableIncome: 5000000,
                taxAmount: 250000
            }, {
                taxRate: 0.1,
                taxableIncome: 5000000,
                taxAmount: 500000
            }, {
                taxRate: 0.15,
                taxableIncome: 8000000,
                taxAmount: 1200000
            }, {
                taxRate: 0.2,
                taxableIncome: 13200000,
                taxAmount: 2640000
            }]);
        });
    });
});
