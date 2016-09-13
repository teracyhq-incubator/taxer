import * as assert from 'assert';

import { Exector } from '../../src/core/exector';


describe('Exector', () => {
  it('should be a class', () => {
    const exector = new Exector();
    assert.ok(exector);
  });

  describe('#isMatched', () => {
    it('should be a function', () => {
      assert.ok(typeof Exector.prototype.isMatched === 'function');
    });

    it('should throw error', () => {
      assert.throws(() => {
        new Exector().isMatched();
      }, /must be implemented by subclass/);
    });
  });

  describe('#exec', () => {
    it('should be a function', () => {
      assert.ok(typeof Exector.prototype.exec === 'function');
    });

    it('should return nothing', () => {
      assert.equal(new Exector().exec(), undefined);
    });
  });
});
