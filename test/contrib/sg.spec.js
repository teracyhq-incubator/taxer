import * as assert from "assert";

import { SgTaxer } from '../../src/contrib/sg';


describe('SgTaxer', () => {
    describe('#constructor', () => {
        const sgTaxer = new SgTaxer();
    });

    describe('#isMatched', () => {
        it('should support Singapore by country codes', () => {
            const sgTaxer = new SgTaxer();
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