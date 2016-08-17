import { Middleware } from './middleware';


export class Taxer extends Middleware {
    calc(countryCode, income, options) {
        return this.exec.apply(this, [...arguments]);
    }
}
