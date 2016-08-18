
export class Middleware {

    constructor() {
        this._stack = [];
    }

    get stack() {
        return Array.from(this._stack);
    }

    //TODO(hoatle): add priority option?
    //TODO: add async support (like koa.js)? if so, maybe better to use koa.js?
    use(fn) {
        if (this._stack.indexOf(fn) > -1) {
            console.warn("fn is already in use: this config is ignored.");
            return;
        }
        this._stack.push(fn);
    }

    findSupportedFn() {
        let supportedFn;

        for (const fn of this._stack) {
            if (fn.supports.apply(this, [...arguments])) {
                supportedFn = fn;
                break;
            }
        }
        return supportedFn;
    }

    exec() {
        const supportedFn = this.findSupportedFn(...arguments);

        if (supportedFn) {
            return supportedFn.apply(this, [...arguments]);
        } else {
            throw new Error("no supported fn found");
        }
    }
}
