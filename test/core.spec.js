import * as assert from 'assert';

import { Taxer } from '../src/core';

describe('Taxer', function () {
    describe('#calc', function () {
        it('should have #calc function', function () {
            const taxer = new Taxer();
            assert.ok(typeof taxer.calc === 'function');
        });

        it('should return result from supported middleware', function () {
            const taxer = new Taxer();
            function myTax() {
                function myTaxCalc(income, options) {
                    return { taxes: income };
                };

                myTaxCalc.supports = function (countryCode) {
                    return countryCode === 'my';
                };

                return myTaxCalc;
            };

            taxer.use(myTax());

            const result = taxer.calc('my', 1010);

            assert.equal(1010, result.taxes);
        });

        it('should throw no supported fn found error', function () {
            const taxer = new Taxer();
            function myTax() {
                function myTaxCalc(income, options) {
                    return { taxes: income };
                };

                myTaxCalc.supports = function (countryCode) {
                    return countryCode === 'my';
                };

                return myTaxCalc;
            };

            taxer.use(myTax());

            try {
                taxer.calc('vn', 2000000);
            } catch (error) {
                assert.equal('no supported fn found', error.message);
            }
        });
    });
});
