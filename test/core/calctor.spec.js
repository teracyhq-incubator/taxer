import * as assert from 'assert';

import { Exector } from '../../src/core/exector';
import { Calctor } from '../../src/core/calctor';


describe('Calctor', () => {
  it('should be sub class of Exector', () => {
    assert.ok(new Calctor() instanceof Exector);
  });

  it('should throw not implemented error for get currency', () => {
    assert.throws(() => {
      const options = new Calctor().defaultOptions;
      assert.fail(options); // never reach here, use this for style check
    }, /Not Implemented/);
  });

  it('should have defaultOptions', () => {
    class MyCalctor extends Calctor {
      get currency() {
        return 'MY';
      }
    }

    const currentYear = new Date().getFullYear();
    const taxYear = `${(currentYear - 1)}_${currentYear}`;

    assert.deepEqual(new MyCalctor().defaultOptions, {
      type: 'payroll',
      incomeType: 'gross',
      taxYear,
      period: 'monthly',
      fromCurrency: 'MY',
      toCurrency: 'MY',
      exchangeRate: 1,
      married: undefined,
      children: 0,
      jointStatement: undefined,
      headOfHousehold: undefined,
      age: undefined,
      birthday: undefined,
      gender: undefined,
      disabled: undefined,
      woundedFreedomFighter: undefined,
      presumptive: undefined,
    });
  });

  it('should have default supportedCountryCodes', () => {
    const calctor = new Calctor();
    assert.deepEqual(calctor.supportedCountryCodes, []);
  });

  it('should support all income range by default', () => {
    const calctor = new Calctor();
    assert.deepEqual(calctor.supportedIncomeRange, [0, Infinity]);
  });

  describe('#isMatched', () => {
    it('should be a method', () => {
      assert.ok(typeof Calctor.prototype.isMatched === 'function');
    });

    it('should invoke isCombinationMatched', () => {
      class MyCalctor extends Calctor {
        isIncomeMatched() {
          return false;
        }

        isOptionsMatched() {
          return false;
        }

        isCombinationMatched() {
          return true;
        }
      }

      const myCalctor = new MyCalctor();
      assert.equal(myCalctor.isMatched('vn'), true);
    });
  });

  describe('#isCountryCodeMatched', () => {
    it('should be a method', () => {
      assert.ok(typeof Calctor.prototype.isCountryCodeMatched === 'function');
    });

    it('should return false', () => {
      assert.equal(new Calctor().isCountryCodeMatched('vn'), false);
    });
  });

  describe('#isIncomeMatched', () => {
    it('should be a method', () => {
      assert.ok(typeof Calctor.prototype.isIncomeMatched === 'function');
    });

    it('should return true', () => {
      assert.ok(new Calctor().isIncomeMatched(0));
      assert.ok(new Calctor().isIncomeMatched(100000));
    });

    it('should return false', () => {
      assert.equal(new Calctor().isIncomeMatched(-1), false);
    });
  });

  describe('#isOptionsMatched', () => {
    it('should be a method', () => {
      assert.ok(typeof Calctor.prototype.isOptionsMatched === 'function');
    });

    it('should return true', () => {
      assert.ok(new Calctor().isOptionsMatched());
    });
  });

  describe('#isCombinationMatched', () => {
    it('should be a method', () => {
      assert.ok(typeof Calctor.prototype.isCombinationMatched === 'function');
    });

    it('should return false', () => {
      assert.equal(new Calctor().isCombinationMatched(), false);
    });
  });

  describe('#processedIncome', () => {
    it('should be a method', () => {
      assert.ok(typeof Calctor.prototype.processedIncome === 'function');
    });
  });

  describe('#processedOptions', () => {
    it('should be a method', () => {
      assert.ok(typeof Calctor.prototype.processedOptions === 'function');
    });
  });

  describe('#processedTaxInfo', () => {
    it('should be a method', () => {
      assert.ok(typeof Calctor.prototype.processedTaxInfo === 'function');
    });
  });

  describe('#calc', () => {
    it('should be a method', () => {
      assert.ok(typeof Calctor.prototype.calc === 'function');
    });

    it('should throw invalid taxYear', () => {
      class MyCalctor extends Calctor {
        get currency() {
          return 'MY';
        }
      }

      const myCalctor = new MyCalctor();

      assert.throws(() => {
        myCalctor.calc(20000, {
          taxYear: 'hello',
        });
      }, /Invalid taxYear: hello/);
    });

    it('should throw not implemented exception for currency', () => {
      const myCalctor = new Calctor();
      assert.throws(() => {
        myCalctor.calc(1000);
      }, /Not Implemented/);
    });

    it('should throw not implemented exception for calc', () => {
      class MyCalctor extends Calctor {
        currency() {
          return 'MY';
        }
      }
      const myCalctor = new MyCalctor();
      assert.throws(() => {
        myCalctor.calc(1000);
      }, /Not Implemented/);
    });
  });
});
