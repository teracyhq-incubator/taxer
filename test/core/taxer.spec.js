import * as assert from 'assert';

import { Taxer } from '../../src/core/taxer';

describe('Taxer', () => {

    describe('#validate', () => {
        it('should throw error when Calctorable is not implemented', () => {
            class MyCalctor {
                isMatched() {
                    return true;
                }

                exec() {
                    return void 0;
                }
            }

            const taxer = new Taxer();
            assert.throws(() => {
                taxer.validate(new MyCalctor());
            }, /calctor must implement Calctorable interface/);
        });

    });

    describe('#calc', () => {
        it('should be function', () => {
            assert.ok(typeof Taxer.prototype.calc === 'function');
        });

        it('should return result from supported taxer', () => {
            const taxer = new Taxer();

            class MyTaxer {
                isMatched(countryCode) {
                    return countryCode === 'my';
                }

                calc(taxableIncome, options) {
                    return { taxableIncome: taxableIncome };
                }

                exec() {
                    return void 0;
                }
            }

            taxer.use(new MyTaxer());

            const result = taxer.calc('my', 1010);

            assert.equal(1010, result.taxableIncome);
        });

        it('should throw no matched taxer found', () => {
            const taxer = new Taxer();
 
            class MyTaxer {
                isMatched(countryCode) {
                    return countryCode === 'my';
                }

                calc(taxableIncome, options) {
                    return {taxableIncome: taxableIncome};
                }

                exec() {
                    return void 0;
                }
            }

            taxer.use(new MyTaxer());

            assert.throws(() => {
                taxer.calc('vn', 2000000);
            }, /no matched calctor found/);
        });
    });
});
