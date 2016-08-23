import { Taxer } from './core';
import { VnCalctor, SgCalctor } from './contrib';

export function defaultTaxer() {
    //return the default configured taxer that use all core plugins
    const taxer = new Taxer();
    //configure default plugins
    taxer.use(new VnCalctor());
    taxer.use(new SgCalctor());
    return taxer;
}

export * from './core';
