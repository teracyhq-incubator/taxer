import * as assert from 'assert';

import { Middleware } from '../../src/core/middleware';


describe('Middleware', () => {

    it('should be a class', () => {
        assert.ok(typeof Middleware === 'function');
    });

    describe('#constructor', () => {

        it('should have empty stack', () => {
            const middleware = new Middleware();
            assert.equal(0, middleware.stack.length);
        });

    });



    describe('#use', () => {
        it('should have 1 used mw in stack', () => {
            const middleware = new Middleware();
      
            class MyExec {

            }

            const myExec = new MyExec();
            middleware.use(myExec);

            assert.equal(1, middleware.stack.length);
            assert.equal(myExec, middleware.stack[0]);
        });

        it('should throw with used mw', () => {
            const middleware = new Middleware();

            class MyExec {

            }

            const myExec = new MyExec();
            middleware.use(myExec);
            assert.throws(() => {
                middleware.use(myExec);
            }, /middeware: MyExec is already in use/);


            assert.equal(1, middleware.stack.length);
            assert.equal(myExec, middleware.stack[0]);
        });
    });

    describe('#findMatchedMw', () => {
        it('should return a matched mw', () => {
            class MyMw1 {
                isMatched() {
                    return arguments[0] === 'my1';
                }
            }

            class MyMw2 {
                isMatched(name) {
                    return name === 'my2';
                }
            }

            const middeware = new Middleware();
            middeware.use(new MyMw1()).use(new MyMw2());

            const foundMy1 = middeware.findMatchedMw('my1', 'hello');
            const foundMy2 = middeware.findMatchedMw('my2', 'hi');

            assert.equal(foundMy1.constructor.name, 'MyMw1');
            assert.equal(foundMy2.constructor.name, 'MyMw2');
        });

        it('should not return a matched mw', () => {
            class MyMw1 {
                isMatched() {
                    return arguments[0] === 'my1';
                }
            }

            class MyMw2 {
                isMatched(name) {
                    return name === 'my2';
                }
            }

            const middeware = new Middleware();
            middeware.use(new MyMw1()).use(new MyMw2());

            const foundMy1 = middeware.findMatchedMw('my3', 'hello');
            const foundMy2 = middeware.findMatchedMw('my4', 'hi');

            assert.equal(foundMy1, undefined);
            assert.equal(foundMy2, undefined);
        });
    });

    describe('#exec', () => {
        it('should throw no matched mw found error on empty stack', function () {
            const middleware = new Middleware();

            assert.throws(() => {
                middleware.exec();
            }, /no matched mw found/);
        });

        it('should get result from matched mw', function () {
            const middleware = new Middleware();

            class MyMiddleware {
                isMatched() {
                    return 'hi' === arguments[0];
                }

                exec() {
                    return 'hello';
                }
            }


            middleware.use(new MyMiddleware());

            const result = middleware.exec('hi', 'hello', 'there');

            assert.equal('hello', result);

        });

        it('should throw no matched mw found error on the registered stack', function () {
            const middleware = new Middleware();

            class MyMiddleware {
                isMatched() {
                    return false;
                }

                exec() {
                    return 'hello';
                }
            }

            middleware.use(new MyMiddleware());

            assert.throws(() => {
                middleware.exec('hi', 'there');
            }, /no matched mw found/);
        });
    });

}); 
