import * as assert from 'assert';

import { SgCalctor } from '../../src/contrib/sg-calctor';


describe('SgCalctor', () => {
  it('should be a class', () => {
    const sgCalctor = new SgCalctor();
    assert.ok(sgCalctor);
  });

  it('should define its currency', () => {
    assert.equal(new SgCalctor().currency, 'SGD');
  });

  it('should define its supported country codes', () => {
    const supportedCountryCodes = ['sg', 'sgp', 702, 'singapore'];
    assert.deepEqual(new SgCalctor().supportedCountryCodes, supportedCountryCodes);
  });

  it('should calc yearly the tax year of 2012 to 2016', () => {
    const taxYear = '2012_2013';
    const sgCalctor = new SgCalctor();

    let taxInfo = sgCalctor.calc(20000, {
      taxYear,
      period: 'yearly',
    });

    assert.equal(taxInfo.type, 'payroll');
    assert.equal(taxInfo.incomeType, 'gross');
    assert.equal(taxInfo.taxYear, '2012_2013');
    assert.equal(taxInfo.fromCurrency, 'SGD');
    assert.equal(taxInfo.toCurrency, 'SGD');
    assert.equal(taxInfo.exchangeRate, 1);
    assert.equal(taxInfo.taxableIncome, 20000);
    assert.equal(taxInfo.netIncome, 20000);
    assert.equal(taxInfo.taxAmount, 0);
    assert.deepEqual(taxInfo.taxBand, [{
      taxRate: 0,
      taxableIncome: 20000,
      taxAmount: 0,
    }]);

    taxInfo = sgCalctor.calc(350000, {
      taxYear,
      period: 'yearly',
    });
    assert.equal(taxInfo.taxAmount, 48350);
    assert.equal(taxInfo.netIncome, 301650);
    assert.deepEqual(taxInfo.taxBand, [{
      taxRate: 0,
      taxableIncome: 20000,
      taxAmount: 0,
    }, {
      taxRate: 0.02,
      taxableIncome: 10000,
      taxAmount: 200,
    }, {
      taxRate: 0.035,
      taxableIncome: 10000,
      taxAmount: 350,
    }, {
      taxRate: 0.07,
      taxableIncome: 40000,
      taxAmount: 2800,
    }, {
      taxRate: 0.115,
      taxableIncome: 40000,
      taxAmount: 4600,
    }, {
      taxRate: 0.15,
      taxableIncome: 40000,
      taxAmount: 6000,
    }, {
      taxRate: 0.17,
      taxableIncome: 40000,
      taxAmount: 6800,
    }, {
      taxRate: 0.18,
      taxableIncome: 120000,
      taxAmount: 21600,
    }, {
      taxRate: 0.2,
      taxableIncome: 30000,
      taxAmount: 6000,
    }]);
  });

  it('should calc monthly the tax year of 2012 to 2016', () => {
    const taxYear = '2013_2014';
    const sgCalctor = new SgCalctor();

    const taxInfo = sgCalctor.calc(3000, {
      taxYear,
      period: 'monthly',
    });

    assert.equal(taxInfo.type, 'payroll');
    assert.equal(taxInfo.incomeType, 'gross');
    assert.equal(taxInfo.taxYear, '2013_2014');
    assert.equal(taxInfo.fromCurrency, 'SGD');
    assert.equal(taxInfo.toCurrency, 'SGD');
    assert.equal(taxInfo.exchangeRate, 1);
    assert.equal(taxInfo.taxableIncome, 3000);
    assert.equal(taxInfo.netIncome, 2965.83);
    assert.equal(taxInfo.taxAmount, 34.17);
    assert.deepEqual(taxInfo.taxBand, [{
      taxRate: 0,
      taxableIncome: 1666.67,
      taxAmount: 0,
    }, {
      taxRate: 0.02,
      taxableIncome: 833.33,
      taxAmount: 16.67,
    }, {
      taxRate: 0.035,
      taxableIncome: 500,
      taxAmount: 17.5,
    }]);
  });

  it('should calc yearly the tax year of 2017 and later', () => {
    const taxYear = '2017';
    const sgCalctor = new SgCalctor();

    let taxInfo = sgCalctor.calc(20000, {
      taxYear,
      period: 'yearly',
    });

    assert.equal(taxInfo.type, 'payroll');
    assert.equal(taxInfo.incomeType, 'gross');
    assert.equal(taxInfo.taxYear, '2017');
    assert.equal(taxInfo.fromCurrency, 'SGD');
    assert.equal(taxInfo.toCurrency, 'SGD');
    assert.equal(taxInfo.exchangeRate, 1);
    assert.equal(taxInfo.taxableIncome, 20000);
    assert.equal(taxInfo.netIncome, 20000);
    assert.equal(taxInfo.taxAmount, 0);
    assert.deepEqual(taxInfo.taxBand, [{
      taxRate: 0,
      taxableIncome: 20000,
      taxAmount: 0,
    }]);

    taxInfo = sgCalctor.calc(350000, {
      taxYear,
      period: 'yearly',
    });
    assert.equal(taxInfo.taxAmount, 51150);
    assert.equal(taxInfo.netIncome, 298850);
    assert.deepEqual(taxInfo.taxBand, [{
      taxRate: 0,
      taxableIncome: 20000,
      taxAmount: 0,
    }, {
      taxRate: 0.02,
      taxableIncome: 10000,
      taxAmount: 200,
    }, {
      taxRate: 0.035,
      taxableIncome: 10000,
      taxAmount: 350,
    }, {
      taxRate: 0.07,
      taxableIncome: 40000,
      taxAmount: 2800,
    }, {
      taxRate: 0.115,
      taxableIncome: 40000,
      taxAmount: 4600,
    }, {
      taxRate: 0.15,
      taxableIncome: 40000,
      taxAmount: 6000,
    }, {
      taxRate: 0.18,
      taxableIncome: 40000,
      taxAmount: 7200,
    }, {
      taxRate: 0.19,
      taxableIncome: 40000,
      taxAmount: 7600,
    }, {
      taxRate: 0.195,
      taxableIncome: 40000,
      taxAmount: 7800,
    }, {
      taxRate: 0.2,
      taxableIncome: 40000,
      taxAmount: 8000,
    }, {
      taxRate: 0.22,
      taxableIncome: 30000,
      taxAmount: 6600,
    }]);
  });

  it('should calc monthly the tax year of 2017 and later', () => {
    const taxYear = '2017_2018';
    const sgCalctor = new SgCalctor();

    const taxInfo = sgCalctor.calc(20000, {
      taxYear,
      period: 'monthly',
    });

    assert.equal(taxInfo.type, 'payroll');
    assert.equal(taxInfo.incomeType, 'gross');
    assert.equal(taxInfo.taxYear, '2017_2018');
    assert.equal(taxInfo.fromCurrency, 'SGD');
    assert.equal(taxInfo.toCurrency, 'SGD');
    assert.equal(taxInfo.exchangeRate, 1);
    assert.equal(taxInfo.taxableIncome, 20000);
    assert.equal(taxInfo.netIncome, 17604.17);
    assert.equal(taxInfo.taxAmount, 2395.83);
    assert.deepEqual(taxInfo.taxBand, [{
      taxRate: 0,
      taxableIncome: 1666.67,
      taxAmount: 0,
    }, {
      taxRate: 0.02,
      taxableIncome: 833.33,
      taxAmount: 16.67,
    }, {
      taxRate: 0.035,
      taxableIncome: 833.33,
      taxAmount: 29.17,
    }, {
      taxRate: 0.07,
      taxableIncome: 3333.34,
      taxAmount: 233.33,
    }, {
      taxRate: 0.115,
      taxableIncome: 3333.33,
      taxAmount: 383.33,
    }, {
      taxRate: 0.15,
      taxableIncome: 3333.33,
      taxAmount: 500,
    }, {
      taxRate: 0.18,
      taxableIncome: 3333.34,
      taxAmount: 600,
    }, {
      taxRate: 0.19,
      taxableIncome: 3333.33,
      taxAmount: 633.33,
    }]);
  });

  it('should throw not supported tax year with yearly period', () => {
    const sgCalctor = new SgCalctor();
    assert.throws(() => {
      sgCalctor.calc(1000, {
        taxYear: '2010',
        period: 'yearly',
      });
    }, /Not Supported/);
  });

  it('should throw not supported tax year with monthly period', () => {
    const sgCalctor = new SgCalctor();
    assert.throws(() => {
      sgCalctor.calc(1000, {
        taxYear: '2011',
        period: 'monthly',
      });
    }, /Not Supported/);
  });

  it('should support monthly net payroll 2012_2016', () => {
    const taxYear = '2013_2014';
    const sgCalctor = new SgCalctor();

    const taxInfo = sgCalctor.calc(2965.83, {
      taxYear,
      period: 'monthly',
      incomeType: 'net',
    });

    assert.equal(taxInfo.type, 'payroll');
    assert.equal(taxInfo.incomeType, 'net');
    assert.equal(taxInfo.taxYear, '2013_2014');
    assert.equal(taxInfo.fromCurrency, 'SGD');
    assert.equal(taxInfo.toCurrency, 'SGD');
    assert.equal(taxInfo.exchangeRate, 1);
    assert.equal(taxInfo.taxableIncome, 3000);
    assert.equal(taxInfo.netIncome, 2965.83);
    assert.equal(taxInfo.taxAmount, 34.17);
    assert.deepEqual(taxInfo.taxBand, [{
      taxRate: 0,
      taxableIncome: 1666.67,
      taxAmount: 0,
    }, {
      taxRate: 0.02,
      taxableIncome: 833.33,
      taxAmount: 16.67,
    }, {
      taxRate: 0.035,
      taxableIncome: 500,
      taxAmount: 17.5,
    }]);
  });

  it('should support monthly net payroll 2017_x', () => {
    const taxYear = '2017_2018';
    const sgCalctor = new SgCalctor();

    const taxInfo = sgCalctor.calc(17604.17, {
      taxYear,
      period: 'monthly',
      incomeType: 'net',
    });

    assert.equal(taxInfo.type, 'payroll');
    assert.equal(taxInfo.incomeType, 'net');
    assert.equal(taxInfo.taxYear, '2017_2018');
    assert.equal(taxInfo.fromCurrency, 'SGD');
    assert.equal(taxInfo.toCurrency, 'SGD');
    assert.equal(taxInfo.exchangeRate, 1);
    assert.equal(taxInfo.taxableIncome, 20000);
    assert.equal(taxInfo.netIncome, 17604.17);
    assert.equal(taxInfo.taxAmount, 2395.83);
    assert.deepEqual(taxInfo.taxBand, [{
      taxRate: 0,
      taxableIncome: 1666.67,
      taxAmount: 0,
    }, {
      taxRate: 0.02,
      taxableIncome: 833.33,
      taxAmount: 16.67,
    }, {
      taxRate: 0.035,
      taxableIncome: 833.33,
      taxAmount: 29.17,
    }, {
      taxRate: 0.07,
      taxableIncome: 3333.34,
      taxAmount: 233.33,
    }, {
      taxRate: 0.115,
      taxableIncome: 3333.33,
      taxAmount: 383.33,
    }, {
      taxRate: 0.15,
      taxableIncome: 3333.33,
      taxAmount: 500,
    }, {
      taxRate: 0.18,
      taxableIncome: 3333.34,
      taxAmount: 600,
    }, {
      taxRate: 0.19,
      taxableIncome: 3333.33,
      taxAmount: 633.33,
    }]);
  });

  it('should not support monthly net payroll before 2012', () => {
    const sgCalctor = new SgCalctor();
    assert.throws(() => {
      sgCalctor.calc(1000, {
        taxYear: '2011',
        period: 'monthly',
        incomeType: 'net',
      });
    }, /Not Supported/);
  });

  it('should support yearly net payroll 2012_2016', () => {
    const taxYear = '2012_2013';
    const sgCalctor = new SgCalctor();

    let taxInfo = sgCalctor.calc(20000, {
      taxYear,
      period: 'yearly',
      incomeType: 'net',
    });

    assert.equal(taxInfo.type, 'payroll');
    assert.equal(taxInfo.incomeType, 'net');
    assert.equal(taxInfo.taxYear, '2012_2013');
    assert.equal(taxInfo.fromCurrency, 'SGD');
    assert.equal(taxInfo.toCurrency, 'SGD');
    assert.equal(taxInfo.exchangeRate, 1);
    assert.equal(taxInfo.taxableIncome, 20000);
    assert.equal(taxInfo.netIncome, 20000);
    assert.equal(taxInfo.taxAmount, 0);
    assert.deepEqual(taxInfo.taxBand, [{
      taxRate: 0,
      taxableIncome: 20000,
      taxAmount: 0,
    }]);

    taxInfo = sgCalctor.calc(301650, {
      taxYear,
      period: 'yearly',
      incomeType: 'net',
    });
    assert.equal(taxInfo.taxableIncome, 350000);
    assert.equal(taxInfo.taxAmount, 48350);
    assert.equal(taxInfo.netIncome, 301650);
    assert.deepEqual(taxInfo.taxBand, [{
      taxRate: 0,
      taxableIncome: 20000,
      taxAmount: 0,
    }, {
      taxRate: 0.02,
      taxableIncome: 10000,
      taxAmount: 200,
    }, {
      taxRate: 0.035,
      taxableIncome: 10000,
      taxAmount: 350,
    }, {
      taxRate: 0.07,
      taxableIncome: 40000,
      taxAmount: 2800,
    }, {
      taxRate: 0.115,
      taxableIncome: 40000,
      taxAmount: 4600,
    }, {
      taxRate: 0.15,
      taxableIncome: 40000,
      taxAmount: 6000,
    }, {
      taxRate: 0.17,
      taxableIncome: 40000,
      taxAmount: 6800,
    }, {
      taxRate: 0.18,
      taxableIncome: 120000,
      taxAmount: 21600,
    }, {
      taxRate: 0.2,
      taxableIncome: 30000,
      taxAmount: 6000,
    }]);
  });

  it('should support yearly net payroll 2017_x', () => {
    const taxYear = '2017';
    const sgCalctor = new SgCalctor();

    let taxInfo = sgCalctor.calc(20000, {
      taxYear,
      period: 'yearly',
      incomeType: 'net',
    });

    assert.equal(taxInfo.type, 'payroll');
    assert.equal(taxInfo.incomeType, 'net');
    assert.equal(taxInfo.taxYear, '2017');
    assert.equal(taxInfo.fromCurrency, 'SGD');
    assert.equal(taxInfo.toCurrency, 'SGD');
    assert.equal(taxInfo.exchangeRate, 1);
    assert.equal(taxInfo.taxableIncome, 20000);
    assert.equal(taxInfo.netIncome, 20000);
    assert.equal(taxInfo.taxAmount, 0);
    assert.deepEqual(taxInfo.taxBand, [{
      taxRate: 0,
      taxableIncome: 20000,
      taxAmount: 0,
    }]);

    taxInfo = sgCalctor.calc(298850, {
      taxYear,
      period: 'yearly',
      incomeType: 'net',
    });
    assert.equal(taxInfo.taxableIncome, 350000);
    assert.equal(taxInfo.taxAmount, 51150);
    assert.equal(taxInfo.netIncome, 298850);
    assert.deepEqual(taxInfo.taxBand, [{
      taxRate: 0,
      taxableIncome: 20000,
      taxAmount: 0,
    }, {
      taxRate: 0.02,
      taxableIncome: 10000,
      taxAmount: 200,
    }, {
      taxRate: 0.035,
      taxableIncome: 10000,
      taxAmount: 350,
    }, {
      taxRate: 0.07,
      taxableIncome: 40000,
      taxAmount: 2800,
    }, {
      taxRate: 0.115,
      taxableIncome: 40000,
      taxAmount: 4600,
    }, {
      taxRate: 0.15,
      taxableIncome: 40000,
      taxAmount: 6000,
    }, {
      taxRate: 0.18,
      taxableIncome: 40000,
      taxAmount: 7200,
    }, {
      taxRate: 0.19,
      taxableIncome: 40000,
      taxAmount: 7600,
    }, {
      taxRate: 0.195,
      taxableIncome: 40000,
      taxAmount: 7800,
    }, {
      taxRate: 0.2,
      taxableIncome: 40000,
      taxAmount: 8000,
    }, {
      taxRate: 0.22,
      taxableIncome: 30000,
      taxAmount: 6600,
    }]);
  });

  it('should not support yearly net payroll before 2012', () => {
    const sgCalctor = new SgCalctor();
    assert.throws(() => {
      sgCalctor.calc(1000, {
        taxYear: '2010',
        period: 'yearly',
        incomeType: 'net',
      });
    }, /Not Supported/);
  });
});
