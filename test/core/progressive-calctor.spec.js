import * as assert from 'assert';

import ProgressiveCalctor from '../../src/core/progressive-calctor';

describe('ProgressiveCacltor', () => {
  it('should be a class', () => {
    assert.ok(ProgressiveCalctor.prototype.constructor === ProgressiveCalctor);
  });

  it('should have calc method', () => {
    assert.ok(typeof ProgressiveCalctor.prototype.calc === 'function');
  });

  describe('#constructor', () => {
    it('should accept brackets', () => {
      const brackets = {
        0.1: [0, 1000],
        0.2: [1001, 2000],
        0.3: [2001],
      };
      const pTaxer = new ProgressiveCalctor(brackets);

      assert.equal(brackets[0.1], pTaxer.brackets[0.1]);
      assert.equal(brackets[0.2], pTaxer.brackets[0.2]);
      assert.equal(brackets[0.3], pTaxer.brackets[0.3]);
    });
  });

  describe('#validate', () => {
    it('should be a static method', () => {
      assert.ok(typeof ProgressiveCalctor.validate === 'function');
    });

    it('should pass with basic brackets', () => {
      const brackets = {
        0.1: [0, 100],
        0.2: [100, 200],
        0.3: [200, 300],
      };
      ProgressiveCalctor.validate(brackets);
    });

    it('should throw error with wrong range order', () => {
      const brackets = {
        0.1: [1, 100],
        0.2: [98, 200],
      };

      assert.throws(() => {
        ProgressiveCalctor.validate(brackets);
      }, /Invalid brackets/);
    });

    it('should throw error with wrong range order(2)', () => {
      const brackets = {
        0.2: [100, 200],
        0.1: [1, 100],
      };

      assert.throws(() => {
        ProgressiveCalctor.validate(brackets);
      }, /Invalid brackets/);
    });
  });


  describe('#calc', () => {
    it('should return taxInfo', () => {
      const brackets = {
        0.1: [0, 10000],
        0.2: [10000, 20000],
        0.3: [20000],
      };
      const pTaxer = new ProgressiveCalctor(brackets);
      const taxInfo = pTaxer.calc(25000);

      assert.equal(taxInfo.taxableIncome, 25000);
      assert.equal(taxInfo.taxAmount, 4500);
      assert.equal(taxInfo.netIncome, 20500);
      const expectedTaxBand = [{
        taxRate: 0.1,
        taxableIncome: 10000,
        taxAmount: 1000,
      }, {
        taxRate: 0.2,
        taxableIncome: 10000,
        taxAmount: 2000,
      }, {
        taxRate: 0.3,
        taxableIncome: 5000,
        taxAmount: 1500,
      }];
      assert.deepEqual(taxInfo.taxBand, expectedTaxBand);
    });

    it('should return another taxInfo', () => {
      const brackets = {
        0.05: [1, 5000000],
        0.1: [5000000, 10000000],
        0.15: [10000000, 18000000],
        0.2: [18000000, 32000000],
        0.25: [32000000, 52000000],
        0.3: [52000000, 80000000],
        0.35: [80000000],
      };
      const pTaxer = new ProgressiveCalctor(brackets);
      const taxInfo = pTaxer.calc(23670000);

      assert.equal(taxInfo.taxableIncome, 23670000);
      assert.equal(taxInfo.taxAmount, 3084000);
      assert.equal(taxInfo.netIncome, 20586000);
      const expectedTaxBand = [{
        taxRate: 0.05,
        taxableIncome: 5000000,
        taxAmount: 250000,
      }, {
        taxRate: 0.1,
        taxableIncome: 5000000,
        taxAmount: 500000,
      }, {
        taxRate: 0.15,
        taxableIncome: 8000000,
        taxAmount: 1200000,
      }, {
        taxRate: 0.2,
        taxableIncome: 5670000,
        taxAmount: 1134000,
      }];
      assert.deepEqual(taxInfo.taxBand, expectedTaxBand);
    });

    it('should support zero rate range', () => {
      const thousand = 1000;
      /* eslint-disable space-infix-ops, key-spacing, array-bracket-spacing, comma-dangle */
      const brackets = {
        0: [0, 20*thousand],
        0.02: [20*thousand, (20+10)*thousand],
        0.035: [30*thousand, (30+10)*thousand],
        0.07: [40*thousand, (40+40)*thousand],
        0.115: [80*thousand, (80+40)*thousand],
        0.15: [120*thousand, (120+40)*thousand],
        0.17: [160*thousand, (160+40)*thousand],
        0.18: [200*thousand, (200+120)*thousand],
        0.2: [320*thousand, ]
      };
      /* eslint-enable */

      const pCalctor = new ProgressiveCalctor(brackets);

      let taxInfo = pCalctor.calc(20 * thousand);
      assert.equal(taxInfo.taxableIncome, 20 * thousand);
      assert.equal(taxInfo.taxAmount, 0);
      assert.equal(taxInfo.netIncome, 20 * thousand);

      taxInfo = pCalctor.calc(30000);
      assert.equal(taxInfo.taxableIncome, 30 * thousand);
      assert.equal(taxInfo.taxAmount, ((30 * thousand) - (20 * thousand)) * 0.02);
      assert.equal(taxInfo.netIncome, (30 * thousand) - 200);
    });

    it.skip('should support big start range', () => {
      // currently not implemented, so [0-x] range is required
      const thousand = 1000;
      /* eslint-disable space-infix-ops, key-spacing, array-bracket-spacing, comma-dangle */
      const brackets = {
        0.02: [20*thousand, 30*thousand],
        0.035: [30*thousand, 40*thousand],
        0.07: [40*thousand, 80*thousand],
        0.115: [80*thousand, 120*thousand],
        0.15: [120*thousand, 160*thousand],
        0.17: [160*thousand, 200*thousand],
        0.18: [200*thousand, 320*thousand],
        0.2: [320*thousand, ]
      };
      /* eslint-enable */

      const pTaxer = new ProgressiveCalctor(brackets);
      const taxInfo = pTaxer.calc(20000);
      assert.equal(taxInfo.taxableIncome, 20000);
      assert.equal(taxInfo.netIncome, 20000);
      assert.equal(taxInfo.taxAmount, 0);
    });

    it('should work with small number differences', () => {
      const brackets = {
        0.1: [1, 10000],
        0.2: [10000, 20000],
        0.3: [20000],
      };
      const pTaxer = new ProgressiveCalctor(brackets);
      const taxInfo = pTaxer.calc(20000.1);

      assert.equal(taxInfo.taxableIncome, 20000.1);
      assert.equal(taxInfo.taxAmount, 3000.03);
      assert.equal(taxInfo.netIncome, 17000.07);
      const expectedTaxBand = [{
        taxRate: 0.1,
        taxableIncome: 10000,
        taxAmount: 1000,
      }, {
        taxRate: 0.2,
        taxableIncome: 10000,
        taxAmount: 2000,
      }, {
        taxRate: 0.3,
        taxableIncome: 0.1,
        taxAmount: 0.03,
      }];
      assert.deepEqual(taxInfo.taxBand, expectedTaxBand);
    });

    it('should support net incomeType before Infinity range', () => {
      const brackets = {
        0.1: [0, 10000],
        0.2: [10000, 20000],
        0.3: [20000],
      };
      const pTaxer = new ProgressiveCalctor(brackets);
      const taxInfo = pTaxer.calc(16000, {
        incomeType: 'net',
      });
      assert.equal(taxInfo.taxableIncome, 18750);
      assert.equal(taxInfo.netIncome, 16000);
      assert.equal(taxInfo.taxAmount, 2750);
      assert.deepEqual(taxInfo.taxBand, [{
        taxRate: 0.1,
        taxableIncome: 10000,
        taxAmount: 1000,
      }, {
        taxRate: 0.2,
        taxableIncome: 8750,
        taxAmount: 1750,
      }]);
    });

    it('should support net incomeType until Infinity range', () => {
      const brackets = {
        0.1: [0, 10000],
        0.2: [10000, 20000],
        0.3: [20000],
      };
      const pTaxer = new ProgressiveCalctor(brackets);
      const taxInfo = pTaxer.calc(20500, {
        incomeType: 'net',
      });

      assert.equal(taxInfo.taxableIncome, 25000);
      assert.equal(taxInfo.netIncome, 20500);
      assert.equal(taxInfo.taxAmount, 4500);
      assert.deepEqual(taxInfo.taxBand, [{
        taxRate: 0.1,
        taxableIncome: 10000,
        taxAmount: 1000,
      }, {
        taxRate: 0.2,
        taxableIncome: 10000,
        taxAmount: 2000,
      }, {
        taxRate: 0.3,
        taxableIncome: 5000,
        taxAmount: 1500,
      }]);
    });

    it('should support net incomeType with zero rate range', () => {
      const thousand = 1000;
      /* eslint-disable space-infix-ops, key-spacing, array-bracket-spacing, comma-dangle */
      const brackets = {
        0: [0, 20*thousand],
        0.02: [20*thousand, (20+10)*thousand],
        0.035: [30*thousand, (30+10)*thousand],
        0.07: [40*thousand, (40+40)*thousand],
        0.115: [80*thousand, (80+40)*thousand],
        0.15: [120*thousand, (120+40)*thousand],
        0.17: [160*thousand, (160+40)*thousand],
        0.18: [200*thousand, (200+120)*thousand],
        0.2: [320*thousand, ]
      };
      /* eslint-enable */

      const pCalctor = new ProgressiveCalctor(brackets);

      const taxInfo = pCalctor.calc((30 * thousand) - 200, {
        incomeType: 'net',
      });

      assert.equal(taxInfo.taxableIncome, 30 * thousand);
      assert.equal(taxInfo.netIncome, 29800);
      assert.equal(taxInfo.taxAmount, 200);
      assert.deepEqual(taxInfo.taxBand, [{
        taxRate: 0,
        taxableIncome: 20 * thousand,
        taxAmount: 0,
      }, {
        taxRate: 0.02,
        taxableIncome: 10000,
        taxAmount: 200,
      }]);
    });
  });
});
