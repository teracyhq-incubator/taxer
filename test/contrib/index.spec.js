import * as assert from 'assert';

import { VnCalctor, SgCalctor } from '../../src/contrib';

describe('contrib/index', () => {
  it('should export VnCalctor', () => {
    assert.ok(VnCalctor);
  });
  it('should export SgCalctor', () => {
    assert.ok(SgCalctor);
  });
});
