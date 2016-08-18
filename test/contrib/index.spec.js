import * as assert from 'assert';

import { vnTax } from '../../src/contrib';

describe('contrib/index', function () {
    it('should export vnTax', function () {
        assert.ok(typeof vnTax === 'function');
    });
});