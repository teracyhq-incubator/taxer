/* eslint-disable class-methods-use-this */
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
export default class Exector {

  /**
   * isMatching to be hooked up to the middleware
   * must be implemented by sub classes.
   */
  isMatched() {
    throw new Error('must be implemented by subclass');
  }

  /**
   * exec function to be executed for the matched executor.
   * should be implemented by sub classes.
   */
  exec() {
    return undefined;
  }
}
/* eslint-enable */
