import { Middleware } from './middleware';
import { isFunction } from './util';

export class Taxer extends Middleware {

    validate(calctor) {
        super.validate(calctor);
        if (!isFunction(calctor.calc)) {
            throw new Error('calctor must implement Calctorable interface');
        }
    }

    calc(countryCode, income, options) {
        const matchedCalctor = this.findMatchedExector(...arguments);

        if (matchedCalctor && matchedCalctor.calc) {
            return matchedCalctor.calc(income, options);
        } else {
            throw new Error('no matched calctor found');
        }
    }
}
