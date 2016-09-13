import * as assert from 'assert';

import Middleware from '../../src/core/middleware';


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

  describe('#validate', () => {
    it('it should throw error when exec method is missing', () => {
      const middleware = new Middleware();
      class MyExector {
        // eslint-disable-next-line class-methods-use-this
        isMatched() {
          return true;
        }
      }
      assert.throws(() => {
        middleware.validate(new MyExector());
      }, /exector must implement Exectorable interface/);
    });

    it('should throw error when isMatched method is missing', () => {
      const middleware = new Middleware();
      class MyExector {
        // eslint-disable-next-line class-methods-use-this
        exec() {
          return undefined;
        }
      }
      assert.throws(() => {
        middleware.validate(new MyExector());
      }, /exector must implement Exectorable interface/);
    });
  });

  describe('#use', () => {
    it('should have 1 used executor in stack', () => {
      const middleware = new Middleware();

      class MyExector {
        // eslint-disable-next-line class-methods-use-this
        isMatched() {
          return true;
        }
        // eslint-disable-next-line class-methods-use-this
        exec() {
          return undefined;
        }
      }

      const myExector = new MyExector();
      middleware.use(myExector);

      assert.equal(1, middleware.stack.length);
      assert.equal(myExector, middleware.stack[0]);
    });

    it('should throw with used executor', () => {
      const middleware = new Middleware();

      class MyExector {
        // eslint-disable-next-line class-methods-use-this
        isMatched() {
          return true;
        }
        // eslint-disable-next-line class-methods-use-this
        exec() {
          return undefined;
        }
      }

      const myExector = new MyExector();
      middleware.use(myExector);
      assert.throws(() => {
        middleware.use(myExector);
      }, /MyExector is already in use/);


      assert.equal(1, middleware.stack.length);
      assert.equal(myExector, middleware.stack[0]);
    });
  });

  describe('#findMatchedExector', () => {
    it('should return a matched executor', () => {
      class MyExecutor1 {
        // eslint-disable-next-line class-methods-use-this
        isMatched(...args) {
          return args[0] === 'my1';
        }
        // eslint-disable-next-line class-methods-use-this
        exec() {
          return undefined;
        }
      }

      class MyExecutor2 {
        // eslint-disable-next-line class-methods-use-this
        isMatched(name) {
          return name === 'my2';
        }
        // eslint-disable-next-line class-methods-use-this
        exec() {
          return undefined;
        }
      }

      const middeware = new Middleware();
      middeware.use(new MyExecutor1()).use(new MyExecutor2());

      const foundMy1 = middeware.findMatchedExector('my1', 'hello');
      const foundMy2 = middeware.findMatchedExector('my2', 'hi');

      assert.equal(foundMy1.constructor.name, 'MyExecutor1');
      assert.equal(foundMy2.constructor.name, 'MyExecutor2');
    });

    it('should not return a matched executor', () => {
      class MyExecutor1 {
        // eslint-disable-next-line class-methods-use-this
        isMatched(...args) {
          return args[0] === 'my1';
        }
        // eslint-disable-next-line class-methods-use-this
        exec() {
          return undefined;
        }
      }

      class MyExecutor2 {
        // eslint-disable-next-line class-methods-use-this
        isMatched(name) {
          return name === 'my2';
        }
        // eslint-disable-next-line class-methods-use-this
        exec() {
          return undefined;
        }
      }

      const middeware = new Middleware();
      middeware.use(new MyExecutor1()).use(new MyExecutor2());

      const foundMy1 = middeware.findMatchedExector('my3', 'hello');
      const foundMy2 = middeware.findMatchedExector('my4', 'hi');

      assert.equal(foundMy1, undefined);
      assert.equal(foundMy2, undefined);
    });
  });

  describe('#exec', () => {
    it('should throw no matched executor found error on empty stack', () => {
      const middleware = new Middleware();

      assert.throws(() => {
        middleware.exec();
      }, /no matched exector found/);
    });

    it('should get result from matched executor', () => {
      const middleware = new Middleware();

      class MyExector {
        // eslint-disable-next-line class-methods-use-this
        isMatched(...args) {
          return args[0] === 'hi';
        }
        // eslint-disable-next-line class-methods-use-this
        exec() {
          return 'hello';
        }
      }


      middleware.use(new MyExector());

      const result = middleware.exec('hi', 'hello', 'there');

      assert.equal('hello', result);
    });

    it('should throw no matched executor found error on the registered stack', () => {
      const middleware = new Middleware();

      class MyExector {
        // eslint-disable-next-line class-methods-use-this
        isMatched() {
          return false;
        }
        // eslint-disable-next-line class-methods-use-this
        exec() {
          return 'hello';
        }
      }

      middleware.use(new MyExector());

      assert.throws(() => {
        middleware.exec('hi', 'there');
      }, /no matched exector found/);
    });
  });
});
