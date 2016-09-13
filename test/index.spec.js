import * as assert from 'assert';

import { Taxer, defaultTaxer } from '../src';


describe('index', () => {
  it('should have Taxer class', () => {
    assert.ok(typeof Taxer === 'function');
  });


  describe('defaultTaxer', () => {
    it('should be a function', () => {
      assert.ok(typeof defaultTaxer === 'function');
    });

    it('should be Taxer instance', () => {
      const taxer = defaultTaxer();
      assert.ok(taxer instanceof Taxer);
    });
  });
});
