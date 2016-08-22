import { Middleware } from './middleware';


export class Taxer extends Middleware {
    calc(countryCode, income, options) {
        const matchedMw = this.findMatchedMw(...arguments);

        if (matchedMw) {
            return matchedMw.calc(income, options);
        } else {
            throw new Error("no matched taxer found");
        }
    }
}