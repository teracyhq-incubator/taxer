import * as assert from 'assert';

import { objectEntries, reversedObjectEntries, map, reduce, filter,
         pick, financialRound } from '../../src/core/util';


describe('util', () => {
    describe('#objectEntries', () => {
        it('should be a generator function', () => {
            assert.ok(objectEntries.constructor.name === 'GeneratorFunction');
        });

        it('should yield [key, value]', () => {
            const obj = {
                0.1: [1, 10000],
                0.2: [10001, 20000],
                0.3: [20001, ]
            };

            let newObj = {};
            for (let [key, value] of objectEntries(obj)) {
                newObj[key] = value;
            }

            assert.deepEqual(newObj, obj);

        });
    });


    describe('#reversedObjectEntries', () => {
        it('should be a generator function', () => {
            assert.ok(reversedObjectEntries.constructor.name === 'GeneratorFunction');
        });

        it('should yield [key, value]', () => {
            const obj = {
                0.1: [1, 10000],
                0.2: [10001, 20000],
                0.3: [20001, ]
            };

            const reversedObj = {
                0.3: [20001, ],
                0.2: [10001, 20000],
                0.1: [1, 10000]
            };

            let newObj = {};
            for (let [key, value] of reversedObjectEntries(obj)) {
                newObj[key] = value;
            }

            assert.deepEqual(newObj, reversedObj);

        });
    });

    describe('#map', () => {
        it('should be a function', () => {
            assert.ok(typeof map === 'function');
        });

        it('should return an array', () => {

            function* gen() {
                yield 0;
                yield 1;
                yield 2;
                yield 3;
            }

            function mapper(curr) {
                return curr * 2;
            }

            const result = map(gen(), mapper);

            assert.deepEqual(result, [0, 2, 4, 6]);
        })
    });

    describe('#reduce', () => {
        it('should reduce with initialValue', () => {
            function* gen() {
                yield 0;
                yield 1;
                yield 2;
                yield 3;
            }

            function sum(acc, curr) {
                acc.sum += curr;
                return acc;
            }

            const result = reduce(gen(), sum, {sum: 2});

            assert.equal(result.sum, 8);

        });

        it('should reduce without initialValue', () => {
            function* gen() {
                yield 0;
                yield 1;
                yield 2;
                yield 3;
            }

            function sum(acc, curr) {
                return acc + curr;
            }

            const result = reduce(gen(), sum);

            assert.equal(result, 6);
        });
    });

    describe('#filter', () => {
        it('should be a function', () => {
            assert.ok(typeof filter === 'function');
        });

        it('should return an array', () => {
            function* gen() {
                yield 0;
                yield 1;
                yield 2;
                yield 3;
            }

            const result = filter(gen(), value => {
                return value > 0;
            });

            assert.deepEqual(result, [1, 2, 3]);


        });

        it('should break the loop without pushing', () => {
             function* gen() {
                yield 0;
                yield 1;
                yield 2;
                yield 3;
            }
            
            const result = filter(gen(), value => {
                if (value > 2) {
                    throw 'break';
                }
                return true;
            }, false);

            assert.deepEqual(result, [0, 1, 2]);
        });

        it('should break the loop with pushing', () => {
             function* gen() {
                yield 0;
                yield 1;
                yield 2;
                yield 3;
            }

            const result = filter(gen(), value => {
                if (value > 1) {
                    throw 'break';
                }
                return true;
            });

            assert.deepEqual(result, [0, 1, 2]);
        });
    });

    describe('#pick', () => {
        it('should pick existing fields', () => {
            const obj = {
                sum: 10,
                total: 20,
                zero: 2
            };

            const newObj = pick(obj, 'total', 'sum');

            assert.deepEqual(newObj, {
                total: 20,
                sum: 10
            });

        });

        it('should not pick non-existing fields', () => {
            const obj = {
                sum: 10,
                total: 20,
                zero: 2
            };

            const newObj = pick(obj, 'total', 'sum', 'abc', 'xyz');

            assert.deepEqual(newObj, {
                total: 20,
                sum: 10
            });
        });
    });

    describe('#financialRound', () => {
        assert.equal(financialRound(0.299), 0.3);
        assert.equal(financialRound(0.1 + 0.2), 0.3);
        assert.equal(financialRound(0.22999), 0.23);
    });
});
