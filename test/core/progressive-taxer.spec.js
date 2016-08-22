import * as assert from 'assert';

import { ProgressiveTaxer } from '../../src/core/progressive-taxer';

describe('ProgressiveTaxer', function () {
    it('should be a class', function () {
        assert.ok(ProgressiveTaxer.prototype.constructor === ProgressiveTaxer);
    });

    it('should have calc method', function () {
        assert.ok(typeof ProgressiveTaxer.prototype.calc === 'function');
    });

    describe('#constructor', function () {
        it('should accept brackets', function () {
            const brackets = {
                0.1: [1, 1000],
                0.2: [1001, 2000],
                0.3: [2001, ]
            };
            const pTaxer = new ProgressiveTaxer(brackets);

            assert.equal(brackets[0.1], pTaxer.brackets[0.1]);
            assert.equal(brackets[0.2], pTaxer.brackets[0.2]);
            assert.equal(brackets[0.3], pTaxer.brackets[0.3]);
        });
    });

    describe('#validate', () => {
        it('should be a static method', () => {
            assert.ok(typeof ProgressiveTaxer.validate === 'function');
        });

        it('should pass with basic brackets', () => {
            const brackets = {
                0.1: [1, 100],
                0.2: [100, 200],
                0.3: [200, 300]
            };
            ProgressiveTaxer.validate(brackets);
        });

        it('should throw error with wrong range order', () => {
            const brackets = {
                0.1: [1, 100],
                0.2: [98, 200]
            };

            assert.throws(() => {
                ProgressiveTaxer.validate(brackets);
            }, /Invalid brackets/);
        });

        it('should throw error with wrong range order(2)', () => {
            const brackets = {
                0.2: [100, 200],
                0.1: [1, 100] 
            };

            assert.throws(() => {
                ProgressiveTaxer.validate(brackets);
            }, /Invalid brackets/);
        });

    });


    describe('#calc', function () {
        it('should return taxInfo', function () {
            const brackets = {
                0.1: [1, 10000],
                0.2: [10000, 20000], 
                0.3: [20000, ]
            };
            const pTaxer = new ProgressiveTaxer(brackets);
            const taxInfo = pTaxer.calc(25000);

            assert.equal(taxInfo.taxableIncome, 25000);
            assert.equal(taxInfo.taxAmount, 4500);
            assert.equal(taxInfo.netIncome, 20500);
            const expectedTaxBand = [{
                taxRate: 0.1,
                taxableIncome: 10000,
                taxAmount: 1000
            }, {
                taxRate: 0.2,
                taxableIncome: 10000,
                taxAmount: 2000
            }, {
                taxRate: 0.3,
                taxableIncome: 5000,
                taxAmount: 1500
            }];
            assert.deepEqual(taxInfo.taxBand, expectedTaxBand);
        });

        it('should return another taxInfo', function () {
            const brackets = {
                0.05: [1, 5000000],
                0.1 : [5000000, 10000000],
                0.15: [10000000, 18000000],
                0.2 : [18000000, 32000000],
                0.25: [32000000, 52000000],
                0.3 : [52000000, 80000000],
                0.35: [80000000, ]
            };
            const pTaxer = new ProgressiveTaxer(brackets);
            const taxInfo = pTaxer.calc(23670000);

            assert.equal(taxInfo.taxableIncome, 23670000);
            assert.equal(taxInfo.taxAmount, 3084000);
            assert.equal(taxInfo.netIncome, 20586000);
            const expectedTaxBand = [{
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
                taxableIncome: 5670000,
                taxAmount: 1134000
            }];
            assert.deepEqual(taxInfo.taxBand, expectedTaxBand);
        });

        it('should work with small number differences', function () {
            const brackets = {
                0.1: [1, 10000],
                0.2: [10000, 20000], 
                0.3: [20000, ]
            };
            const pTaxer = new ProgressiveTaxer(brackets);
            const taxInfo = pTaxer.calc(20000.1);

            assert.equal(taxInfo.taxableIncome, 20000.1);
            assert.equal(taxInfo.taxAmount, 3000.03);
            assert.equal(taxInfo.netIncome, 17000.07);
            const expectedTaxBand = [{
                taxRate: 0.1,
                taxableIncome: 10000,
                taxAmount: 1000
            }, {
                taxRate: 0.2,
                taxableIncome: 10000,
                taxAmount: 2000
            }, {
                taxRate: 0.3,
                taxableIncome: 0.1,
                taxAmount: 0.03
            }];
            assert.deepEqual(taxInfo.taxBand, expectedTaxBand);
        });
    });
});
