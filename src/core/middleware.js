
export class Middleware {

    constructor() {
        this._stack = [];
    }

    get stack() {
        return Array.from(this._stack);
    }

    //TODO(hoatle): add priority option?
    //TODO: add async support (like koa.js)? if so, maybe better to use koa.js?
    use(mw) {
        if (this._isUsed(mw)) {
            throw `middeware: ${mw.constructor.name} is already in use`;
        }
        this._stack.push(mw);
        return this;
    }

    _isUsed(mw) {
        const usedArr = this._stack.filter((curr) => {
            return curr.constructor.name === mw.constructor.name;
        });

        return usedArr.length > 0;
    }

    findMatchedMw() {
        let matchedMw;

        for (const mw of this._stack) {
            if (mw.isMatched(...arguments)) {
                matchedMw = mw;
                break;
            }
        }
        return matchedMw;
    }

    exec() {
        const matchedMw = this.findMatchedMw(...arguments);

        if (matchedMw) {
            return matchedMw.exec(this, ...arguments);
        } else {
            throw "no matched mw found";
        }
    }
}
