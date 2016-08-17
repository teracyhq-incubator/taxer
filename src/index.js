import { Taxer } from './core';
import { vnTax } from './contrib';

export function defaultTaxer() {
    //return the default configured taxer that use all core plugins
    const taxer = new Taxer();
    //configure default plugins
    taxer.use(vnTax());
    return taxer;
}

export * from './core';
