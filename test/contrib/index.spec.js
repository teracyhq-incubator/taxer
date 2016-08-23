import * as assert from 'assert';

import { VnCalctor, SgCalctor } from '../../src/contrib';

describe('contrib/index', function () {
    it('should export VnCalctor', function () {
        assert.ok(VnCalctor);
    });
    it('should export SgCalctor', function () {
        assert.ok(SgCalctor);
    });
});
