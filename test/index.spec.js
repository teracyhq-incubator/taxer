import * as assert from 'assert';

import { Taxer, defaultTaxer } from '../src';


describe('index', function () {
    it('should have Taxer class', function () {
        assert.ok(typeof Taxer === 'function');
    });


    describe('defaultTaxer', function () {
        it('should be a function', function () {
            assert.ok(typeof defaultTaxer === 'function');
        });

        it('should be Taxer instance', function () {
            const taxer = defaultTaxer();
            assert.ok(taxer instanceof Taxer);
        });
    });
}); 
