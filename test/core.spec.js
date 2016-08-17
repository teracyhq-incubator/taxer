import * as assert from 'assert';

import { Taxer } from '../src/core';

describe('Taxer', function () {
    describe('#calc', function () {
        it('should have #calc function', function () {
            const taxer = new Taxer();
            assert.ok(typeof taxer.calc === 'function');
        });
    });
});
