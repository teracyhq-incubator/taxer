import * as assert from 'assert';

import { Middleware } from '../src/middleware';


describe('Middleware', function () {

    it('should be a class', function () {
        assert.ok(typeof Middleware === 'function');
    });

    describe('#constructor', function() {

        it('should have empty stack', function () {
            const middleware = new Middleware();
            assert.equal(0, middleware.stack.length);
        });

    });

    describe('#use', function () {
        it('should have 1 used fn in stack', function () {
            const middleware = new Middleware();
            function mdFn() {
                return function mdFnExec() {

                }
            }

            const mdFnExec = mdFn();
            middleware.use(mdFnExec);

            assert.equal(1, middleware.stack.length);
            assert.equal(mdFnExec, middleware.stack[0]);
        });

        it('should ignore used fn', function () {
            const middleware = new Middleware();
            function mdFn() {
                return function mdFnExec() {

                }
            }

            const mdFnExec = mdFn();
            middleware.use(mdFnExec);
            middleware.use(mdFnExec);

            assert.equal(1, middleware.stack.length);
            assert.equal(mdFnExec, middleware.stack[0]);
        });
    });

    describe('#exec', function () {
        it('should throw no supported fn found error on empty stack', function () {
            const middleware = new Middleware();
            try {
                middleware.exec();
            } catch (error) {
                assert.equal('no supported fn found', error.message);
            }
        });

        it('should get result from supported fn', function () {
            const middleware = new Middleware();

            function fnMiddleware() {

                function fnExec() {
                    return 'hello';
                };

                fnExec.supports = function () {
                    return 'hi' === arguments[0];
                };

                return fnExec;
            };


            middleware.use(fnMiddleware());

            const result = middleware.exec('hi', 'hello', 'there');

            assert.equal('hello', result);

        });

        it('should throw no supported fn found error on the registered stack', function () {
            const middleware = new Middleware();

            function fnExec() {
                return 'hello';
            };

            fnExec.supports = function () {
                return false;
            };

            middleware.use(fnExec);

            try {
                middleware.exec();
            } catch (error) {
                assert.equal('no supported fn found', error.message);
            }
        });
    });

}); 
