import { isFunction } from './util';


export default class {

  constructor() {
    this.slack = [];
  }

  get stack() {
    return Array.from(this.slack);
  }

  /* eslint-disable class-methods-use-this */
  validate(exector) {
    if (!isFunction(exector.isMatched) || !isFunction(exector.exec)) {
      throw new Error('exector must implement Exectorable interface');
    }
  }
  /* eslint-enable */

  // TODO(hoatle): add priority option?
  // TODO: add async support (like koa.js)? if so, maybe better to use koa.js?
  // TODO(hoatle): make sure it's executor (isMatched + exec methods available)
  use(exector) {
    this.validate(exector);
    if (this.isUsed(exector)) {
      throw new Error(`${exector.constructor.name} is already in use`);
    }
    this.slack.push(exector);
    return this;
  }

  isUsed(exector) {
    const usedArr = this.stack.filter(curr => curr.constructor.name === exector.constructor.name);
    return usedArr.length > 0;
  }

  findMatchedExector(...args) {
    let matchedExector;

    for (const exector of this.stack) {
      if (exector.isMatched(...args)) {
        matchedExector = exector;
        break;
      }
    }
    return matchedExector;
  }

  exec(...args) {
    const matchedExector = this.findMatchedExector(...args);

    if (matchedExector) {
      return matchedExector.exec(this, ...args);
    }

    throw new Error('no matched exector found');
  }
}
