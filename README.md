tax.js
======
[![Build Status](https://travis-ci.org/teracyhq/tax.js.svg?branch=develop)](https://travis-ci.org/teracyhq/tax.js)
[![Coverage Status](https://coveralls.io/repos/github/teracyhq/tax.js/badge.svg?branch=develop)](https://coveralls.io/github/teracyhq/tax.js?branch=develop)


universal tax calculator javascript library

Library Architecture
--------------------

It's designed with plugin mechanism and minimalist in mind. By default:

```
const taxer = new Taxer();
taxer.use(taxMiddlewareFn);
taxer.calc(countryCode, income, options);
```

in which:

taxMiddlewareFn should be a function accept (income, options) and return taxResult.
Moreover, taxMiddlewareFn should have a required function property `supports` that returns a boolean value.
If it's true, taxResult will be processed by that tax middleware.
The taxResult will be returned from the first supported tax middleware.
If no supported tax middleware, an Error will be thrown.

For example:

```
function vnTax() {
    function vnTaxCalc(income, options) {
        return results;
    };

    //return true to support otherwise, this tax middleware should be ignored
    vnTaxCalc.suports = function vnTaxCalcSuports(countryCode, income, options) {
        return ['vn', 'vietnam'].indexOf(countryCode.toLowerCase()) > - 1;
    };

    return vnTaxCalc;
};
```

That's how the library architecture works.


How to use
----------

1. Configure

    1.1. From the default taxer with built-in tax middleware:

    ```
    const taxer = defaultTaxer();
    // add more custom tax middleware function
    taxer.use(customTaxMiddlewareFn);
    ```

    1.2. From scratch

    ```
    const taxer = new Taxer();
    taxer.use(vnTax());
    taxer.use(usaTax());
    taxer.use(sgTax());
    taxer.use(customTax());
    ``` 

2. Use

```
const results = taxer.calc(countryCode, income, options);
console.log(results);
```


How to develop
--------------

This is the minimalist plugin architecture inspired by express.js and koa.js a lot.
Let's keep it as minimal and lightweight as possible.

Clone this repository and:

```
$ npm install
$ npm run test
```

How to contribute
-----------------

By writing custom tax plugins to create a good solid universal tax system throughout the world.

Follow Teracy workflow: http://dev.teracy.org/docs/workflow.html


References
----------

These are related similar projects we should take a look:

- https://github.com/rkh/income-tax


License
-------
MIT license. See LICENSE file.
