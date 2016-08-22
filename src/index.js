import { Taxer } from './core';
import { VnTaxer, SgTaxer } from './contrib';

export function defaultTaxer() {
    //return the default configured taxer that use all core plugins
    const taxer = new Taxer();
    //configure default plugins
    taxer.use(new VnTaxer());
    taxer.use(new SgTaxer());
    return taxer;
}

export * from './core';
