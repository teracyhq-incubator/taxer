
export class Middleware {

    constructor() {
        this._stack = [];
    }

    get stack() {
        return Array.from(this._stack);
    }

    //TODO(hoatle): add priority option?
    //TODO: add async support (like koa.js)? if so, maybe better to use koa.js?
    //TODO(hoatle): make sure it's executor (isMatched + exec methods available)
    use(exector) {
        if (this._isUsed(exector)) {
            throw `${exector.constructor.name} is already in use`;
        }
        this._stack.push(exector);
        return this;
    }

    _isUsed(exector) {
        const usedArr = this._stack.filter((curr) => {
            return curr.constructor.name === exector.constructor.name;
        });

        return usedArr.length > 0;
    }

    findMatchedExector() {
        let matchedExector;

        for (const exector of this._stack) {
            if (exector.isMatched(...arguments)) {
                matchedExector = exector;
                break;
            }
        }
        return matchedExector;
    }

    exec() {
        const matchedExector = this.findMatchedExector(...arguments);

        if (matchedExector) {
            return matchedExector.exec(this, ...arguments);
        } else {
            throw 'no matched exector found';
        }
    }
}
