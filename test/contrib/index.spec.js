import * as assert from 'assert';

import { VnTaxer, SgTaxer } from '../../src/contrib';

describe('contrib/index', function () {
    it('should export VnTaxer', function () {
        assert.ok(VnTaxer);
    });
    it('should export SgTaxer', function () {
        assert.ok(SgTaxer);
    });
});