import * as assert from 'assert';

import { SgCalctor } from '../../src/contrib/sg';


describe('SgCalctor', () => {
    it('should be a class', () => {
        const sgTaxer = new SgCalctor();
    });

    describe('#isMatched', () => {
        it('should support Singapore by country codes', () => {
            const sgTaxer = new SgCalctor();
            assert.ok(sgTaxer.isMatched('sg'));
            assert.ok(sgTaxer.isMatched('SG'));
            assert.ok(sgTaxer.isMatched('sgp'));
            assert.ok(sgTaxer.isMatched('SGP'));
            assert.ok(sgTaxer.isMatched(702));
            assert.ok(sgTaxer.isMatched('singapore'));
            assert.ok(sgTaxer.isMatched('Singapore'));
            assert.ok(sgTaxer.isMatched('SINGAPORE'));
        });
    });

    describe('#calc', () => {

    });
});
