import * as assert from 'assert';

import { Taxer, ProgressiveTaxer } from '../../src/core/index';

describe('core/index', () => {
    it('should export Taxer', () => {
        assert.ok(Taxer);
    });

    it('should export ProgressiveTaxer', () => {
        assert.ok(ProgressiveTaxer);
    });
});
