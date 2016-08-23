import { Middleware } from './middleware';

//TODO(hoatle): make sure it's calctor (calc methods available)
export class Taxer extends Middleware {

    calc(countryCode, income, options) {
        const matchedCalctor = this.findMatchedExector(...arguments);

        if (matchedCalctor && matchedCalctor.calc) {
            return matchedCalctor.calc(income, options);
        } else {
            throw new Error('no matched calctor found');
        }
    }
}
