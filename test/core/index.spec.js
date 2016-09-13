import * as assert from 'assert';

import { Taxer, ProgressiveCalctor } from '../../src/core/index';

describe('core/index', () => {
  it('should export Taxer', () => {
    assert.ok(Taxer);
  });

  it('should export ProgressiveCalctor', () => {
    assert.ok(ProgressiveCalctor);
  });
});
