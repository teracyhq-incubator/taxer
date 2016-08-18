import { Middleware } from './middleware';


export class Taxer extends Middleware {
    calc(countryCode, income, options) {
        const supportedFn = this.findSupportedFn(...arguments);

        if (supportedFn) {
            return supportedFn.apply(this, [income, options]);
        } else {
            throw new Error("no supported fn found");
        }
    }
}
