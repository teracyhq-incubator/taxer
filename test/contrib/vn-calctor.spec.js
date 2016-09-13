import * as assert from 'assert';

import { VnCalctor } from '../../src/contrib/vn-calctor';


describe('VnCalctor', () => {
  it('should define default currency', () => {
    const vnCalctor = new VnCalctor();
    assert.equal(vnCalctor.currency, 'VND');
  });

  it('should support Vietnam by country codes', () => {
    const vnCalctor = new VnCalctor();
    assert.ok(vnCalctor.isMatched('vn'));
    assert.ok(vnCalctor.isMatched('VN'));
    assert.ok(vnCalctor.isMatched('vnm'));
    assert.ok(vnCalctor.isMatched('VNM'));
    assert.ok(vnCalctor.isMatched(704));
    assert.ok(vnCalctor.isMatched('vietnam'));
    assert.ok(vnCalctor.isMatched('Vietnam'));
    assert.ok(vnCalctor.isMatched('viet nam'));
    assert.ok(vnCalctor.isMatched('Viet Nam'));
  });

  it('should support monthly gross payroll', () => {
    const vnCalctor = new VnCalctor();
    const taxInfo = vnCalctor.calc(31200000);
    const currentYear = new Date().getFullYear();
    const taxYear = `${currentYear - 1}_${currentYear}`;
    assert.equal(taxInfo.type, 'payroll');
    assert.equal(taxInfo.incomeType, 'gross');
    assert.equal(taxInfo.taxYear, taxYear);
    assert.equal(taxInfo.period, 'monthly');
    assert.equal(taxInfo.fromCurrency, 'VND');
    assert.equal(taxInfo.toCurrency, 'VND');
    assert.equal(taxInfo.exchangeRate, 1);
    assert.equal(taxInfo.taxableIncome, 31200000);
    assert.equal(taxInfo.netIncome, 26610000);
    assert.equal(taxInfo.taxAmount, 4590000);
    assert.deepEqual(taxInfo.taxBand, [{
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
      taxableIncome: 13200000,
      taxAmount: 2640000,
    }]);
  });

  it('should support yearly gross payroll', () => {
    const vnCalctor = new VnCalctor();
    const taxInfo = vnCalctor.calc(961000000, { period: 'yearly' });
    const currentYear = new Date().getFullYear();
    const taxYear = `${currentYear - 1}_${currentYear}`;
    assert.equal(taxInfo.type, 'payroll');
    assert.equal(taxInfo.incomeType, 'gross');
    assert.equal(taxInfo.taxYear, taxYear);
    assert.equal(taxInfo.period, 'yearly');
    assert.equal(taxInfo.fromCurrency, 'VND');
    assert.equal(taxInfo.toCurrency, 'VND');
    assert.equal(taxInfo.exchangeRate, 1);
    assert.equal(taxInfo.taxableIncome, 961000000);
    assert.equal(taxInfo.netIncome, 742850000);
    assert.equal(taxInfo.taxAmount, 218150000);
    assert.deepEqual(taxInfo.taxBand, [{
      taxRate: 0.05,
      taxableIncome: 60000000,
      taxAmount: 3000000,
    }, {
      taxRate: 0.1,
      taxableIncome: 60000000,
      taxAmount: 6000000,
    }, {
      taxRate: 0.15,
      taxableIncome: 96000000,
      taxAmount: 14400000,
    }, {
      taxRate: 0.2,
      taxableIncome: 168000000,
      taxAmount: 33600000,
    }, {
      taxRate: 0.25,
      taxableIncome: 240000000,
      taxAmount: 60000000,
    }, {
      taxRate: 0.3,
      taxableIncome: 336000000,
      taxAmount: 100800000,
    }, {
      taxRate: 0.35,
      taxableIncome: 1000000,
      taxAmount: 350000,
    }]);
  });

  it('should support monthly net payroll', () => {
    const vnCalctor = new VnCalctor();
    const taxInfo = vnCalctor.calc(26610000, { incomeType: 'net' });
    const currentYear = new Date().getFullYear();
    const taxYear = `${currentYear - 1}_${currentYear}`;
    assert.equal(taxInfo.type, 'payroll');
    assert.equal(taxInfo.incomeType, 'net');
    assert.equal(taxInfo.taxYear, taxYear);
    assert.equal(taxInfo.period, 'monthly');
    assert.equal(taxInfo.fromCurrency, 'VND');
    assert.equal(taxInfo.toCurrency, 'VND');
    assert.equal(taxInfo.exchangeRate, 1);
    assert.equal(taxInfo.taxableIncome, 31200000);
    assert.equal(taxInfo.netIncome, 26610000);
    assert.equal(taxInfo.taxAmount, 4590000);
    assert.deepEqual(taxInfo.taxBand, [{
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
      taxableIncome: 13200000,
      taxAmount: 2640000,
    }]);
  });

  it('should support yearly net payroll', () => {
    const vnCalctor = new VnCalctor();
    const taxInfo = vnCalctor.calc(742850000, {
      period: 'yearly',
      incomeType: 'net',
    });
    const currentYear = new Date().getFullYear();
    const taxYear = `${currentYear - 1}_${currentYear}`;
    assert.equal(taxInfo.type, 'payroll');
    assert.equal(taxInfo.incomeType, 'net');
    assert.equal(taxInfo.taxYear, taxYear);
    assert.equal(taxInfo.period, 'yearly');
    assert.equal(taxInfo.taxableIncome, 961000000);
    assert.equal(taxInfo.netIncome, 742850000);
    assert.equal(taxInfo.taxAmount, 218150000);
    assert.deepEqual(taxInfo.taxBand, [{
      taxRate: 0.05,
      taxableIncome: 60000000,
      taxAmount: 3000000,
    }, {
      taxRate: 0.1,
      taxableIncome: 60000000,
      taxAmount: 6000000,
    }, {
      taxRate: 0.15,
      taxableIncome: 96000000,
      taxAmount: 14400000,
    }, {
      taxRate: 0.2,
      taxableIncome: 168000000,
      taxAmount: 33600000,
    }, {
      taxRate: 0.25,
      taxableIncome: 240000000,
      taxAmount: 60000000,
    }, {
      taxRate: 0.3,
      taxableIncome: 336000000,
      taxAmount: 100800000,
    }, {
      taxRate: 0.35,
      taxableIncome: 1000000,
      taxAmount: 350000,
    }]);
  });
});
