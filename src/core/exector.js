/**
 * The executor class to be used with the @{Middleware}} class.
 * This class implements Exectorable interface:
 *
 * interface Exectorable {
 *   isMatched(): Boolean
 *   exec(): Object
 * }
 *
 */
export class Exector {

    /**
     * isMatching to be hooked up to the middleware
     * must be implemented by sub classes.
     */
    isMatched() {
        throw 'must be implemented by subclass';
    }

    /**
     * exec function to be executed for the matched executor.
     * should be implemented by sub classes.
     */
    exec() {
        return void 0;
    }
}
