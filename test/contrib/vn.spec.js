import * as assert from 'assert';

import { vnTax } from '../../src/contrib/vn';

describe('vnTax', function () {
    it('should be a function', function () {
        assert.ok(typeof vnTax === 'function');
    });
});