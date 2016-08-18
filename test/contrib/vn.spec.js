import * as assert from 'assert';

import { vnTax } from '../../src/contrib/vn';

describe('vnTax', function () {
    it('should be a function', function () {
        assert.ok(typeof vnTax === 'function');
    });

    it('should return a function', function () {
        const vnTaxCalc = vnTax();
        assert.ok(typeof vnTaxCalc === 'function');
    });

    describe('vnTaxCalc', function () {
        it('should support Vietnam by country codes', function () {
            const vnTaxCalc = vnTax();
            assert.ok(vnTaxCalc.supports('vn'));
            assert.ok(vnTaxCalc.supports('VN'));
            assert.ok(vnTaxCalc.supports('vnm'));
            assert.ok(vnTaxCalc.supports('VNM'));
            assert.ok(vnTaxCalc.supports(704));
            assert.ok(vnTaxCalc.supports('vietnam'));
            assert.ok(vnTaxCalc.supports('Vietnam'));
            assert.ok(vnTaxCalc.supports('viet nam'));
            assert.ok(vnTaxCalc.supports('Viet Nam'));
        });

        it('should support monthly payroll gross income <= 5000000', function () {
            const vnTaxCalc = vnTax();
            const taxInfo = vnTaxCalc(4500000);

            assert.equal('payroll', taxInfo.type);
            assert.equal('gross', taxInfo.incomeType);
            assert.equal(2016, taxInfo.taxYear);
            assert.equal('monthly', taxInfo.period);
            assert.equal('VND', taxInfo.fromCurrency);
            assert.equal('VND', taxInfo.toCurrency);
            assert.equal(4500000, taxInfo.grossIncome);
            assert.equal(225000, taxInfo.taxes);
            assert.equal(4275000, taxInfo.netIncome);
        });

        it('should support monthly payroll gross income <= 5m', function () {
            const vnTaxCalc = vnTax();
            const taxInfo = vnTaxCalc(4500000);

            assert.equal('payroll', taxInfo.type);
            assert.equal('gross', taxInfo.incomeType);
            assert.equal(2016, taxInfo.taxYear);
            assert.equal('monthly', taxInfo.period);
            assert.equal('VND', taxInfo.fromCurrency);
            assert.equal('VND', taxInfo.toCurrency);
            assert.equal(4500000, taxInfo.grossIncome);
            assert.equal(225000, taxInfo.taxes);
            assert.equal(4275000, taxInfo.netIncome);
        });

        it('should support monthly payroll gross income <= 10m', function () {
            const vnTaxCalc = vnTax();
            const taxInfo = vnTaxCalc(9400000);

            assert.equal('payroll', taxInfo.type);
            assert.equal('gross', taxInfo.incomeType);
            assert.equal(2016, taxInfo.taxYear);
            assert.equal('monthly', taxInfo.period);
            assert.equal('VND', taxInfo.fromCurrency);
            assert.equal('VND', taxInfo.toCurrency);
            assert.equal(9400000, taxInfo.grossIncome);
            assert.equal( 690000, taxInfo.taxes);
            assert.equal(8710000, taxInfo.netIncome);
        });

        it('should support monthly payroll gross income <= 18m', function () {
            const vnTaxCalc = vnTax();
            const taxInfo = vnTaxCalc(15200000);

            assert.equal('payroll', taxInfo.type);
            assert.equal('gross', taxInfo.incomeType);
            assert.equal(2016, taxInfo.taxYear);
            assert.equal('monthly', taxInfo.period);
            assert.equal('VND', taxInfo.fromCurrency);
            assert.equal('VND', taxInfo.toCurrency);
            assert.equal(15200000, taxInfo.grossIncome);
            assert.equal( 1530000, taxInfo.taxes);
            assert.equal(13670000, taxInfo.netIncome);
        });

        it('should support monthly payroll gross income <= 32m', function () {
            const vnTaxCalc = vnTax();
            const taxInfo = vnTaxCalc(31200000);

            assert.equal('payroll', taxInfo.type);
            assert.equal('gross', taxInfo.incomeType);
            assert.equal(2016, taxInfo.taxYear);
            assert.equal('monthly', taxInfo.period);
            assert.equal('VND', taxInfo.fromCurrency);
            assert.equal('VND', taxInfo.toCurrency);
            assert.equal(31200000, taxInfo.grossIncome);
            assert.equal( 4590000, taxInfo.taxes);
            assert.equal(26610000, taxInfo.netIncome);
        });


        it('should support monthly payroll gross income <= 52m', function () {
            const vnTaxCalc = vnTax();
            const taxInfo = vnTaxCalc(44400000);

            assert.equal('payroll', taxInfo.type);
            assert.equal('gross', taxInfo.incomeType);
            assert.equal(2016, taxInfo.taxYear);
            assert.equal('monthly', taxInfo.period);
            assert.equal('VND', taxInfo.fromCurrency);
            assert.equal('VND', taxInfo.toCurrency);
            assert.equal(44400000, taxInfo.grossIncome);
            assert.equal( 7850000, taxInfo.taxes);
            assert.equal(36550000, taxInfo.netIncome);
        });

        it('should support monthly payroll gross income <= 80m', function () {
            const vnTaxCalc = vnTax();
            const taxInfo = vnTaxCalc(79000000);

            assert.equal('payroll', taxInfo.type);
            assert.equal('gross', taxInfo.incomeType);
            assert.equal(2016, taxInfo.taxYear);
            assert.equal('monthly', taxInfo.period);
            assert.equal('VND', taxInfo.fromCurrency);
            assert.equal('VND', taxInfo.toCurrency);
            assert.equal(79000000, taxInfo.grossIncome);
            assert.equal(17850000, taxInfo.taxes);
            assert.equal(61150000, taxInfo.netIncome);
        });

        it('should support monthly payroll gross income > 80m', function () {
            const vnTaxCalc = vnTax();
            const taxInfo = vnTaxCalc(99900000);

            assert.equal('payroll', taxInfo.type);
            assert.equal('gross', taxInfo.incomeType);
            assert.equal(2016, taxInfo.taxYear);
            assert.equal('monthly', taxInfo.period);
            assert.equal('VND', taxInfo.fromCurrency);
            assert.equal('VND', taxInfo.toCurrency);
            assert.equal(99900000, taxInfo.grossIncome);
            assert.equal(25115000, taxInfo.taxes);
            assert.equal(74785000, taxInfo.netIncome);
        });

    });
});