import * as assert from 'assert';

import { Exector } from '../../src/core/exector';
import { Calctor } from '../../src/core/calctor';


describe('Calctor', () => {

    it('should be sub class of Exector', () => {
        assert.ok(new Calctor() instanceof Exector);
    });

    it('should have defaultOptions', () => {
        assert.deepEqual(new Calctor().defaultOptions, {
            type: 'payroll',
            incomeType: 'gross',
            taxYear: new Date().getFullYear(),
            period: 'monthly',
            fromCurrency: null,
            toCurrency: null,
            exchangeRate: 1
        });
    });

    it('should have default supportedCountryCodes', () => {
        const calctor = new Calctor();
        assert.deepEqual(calctor.supportedCountryCodes, []);
    });

    it('should support all income range by default', () => {
        const calctor = new Calctor();
        assert.deepEqual(calctor.supportedIncomeRange, [0, Infinity]);
    });

    describe('#isMatched', () => {
        it('should be a method', () => {
            assert.ok(typeof Calctor.prototype.isMatched === 'function');
        });
    });

    describe('#isCountryCodeMatched', () => {
        it('should be a method', () => {
            assert.ok(typeof Calctor.prototype.isCountryCodeMatched === 'function');
        });

        it('should return false', () => {
            assert.equal(new Calctor().isCountryCodeMatched('vn'), false);
        });
    });

    describe('#isIncomeMatched', () => {
        it('should be a method', () => {
            assert.ok(typeof Calctor.prototype.isIncomeMatched === 'function');
        });

        it('should return true', () => {
            assert.ok(new Calctor().isIncomeMatched(0));
            assert.ok(new Calctor().isIncomeMatched(100000));
        });

        it('should return false', () => {
            assert.equal(new Calctor().isIncomeMatched(-1), false);
        });
    });

    describe('#isOptionsMatched', () => {
        it('should be a method', () => {
            assert.ok(typeof Calctor.prototype.isOptionsMatched === 'function');
        });

        it('should return true', () => {
            assert.ok(new Calctor().isOptionsMatched());
        });
    });

    describe('#isCombinationMatched', () => {
        it('should be a method', () => {
            assert.ok(typeof Calctor.prototype.isCombinationMatched === 'function');
        });

        it('should return false', () => {
            assert.equal(new Calctor().isCombinationMatched(), false);
        });
    });

    describe('#processedIncome', () => {
        it('should be a method', () => {
            assert.ok(typeof Calctor.prototype.processedIncome === 'function');
        });
    });

    describe('#processedOptions', () => {
        it('should be a method', () => {
            assert.ok(typeof Calctor.prototype.processedOptions === 'function');
        });
    });

    describe('#processedTaxInfo', () => {
        it('should be a method', () => {
            assert.ok(typeof Calctor.prototype.processedTaxInfo === 'function');
        });
    });

    describe('#calc', () => {
        it('should be a method', () => {
            assert.ok(typeof Calctor.prototype.calc === 'function');
        });
    });

});