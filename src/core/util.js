/**
 * A generator to yield object entries
 *
 * @param obj an object with keys and values
 * @return a generator
 */
export function* objectEntries(obj) {
  const propKeys = Reflect.ownKeys(obj);

  for (const propKey of propKeys) {
    yield [propKey, obj[propKey]];
  }
}

/**
 * A generator to yield object entries in reversed order by keys
 *
 * @param obj an object with keys and values
 * @return a generator
 */
export function* reversedObjectEntries(obj) {
  const propKeys = Reflect.ownKeys(obj).reverse();

  for (const propKey of propKeys) {
    yield [propKey, obj[propKey]];
  }
}

/**
 * map function for an iterable
 *
 * @param iterable
 * @param mapper
 * @return an array
 */
export function map(iterable, mapper) {
  const result = [];
  for (const x of iterable) {
    result.push(mapper(x));
  }
  return result;
}

/**
 * reduce function for an iterable
 *
 * @param interable
 * @param combiner function
 * @param initialValue
 * @return an array
 */
export function reduce(iterable, combiner, initialValue) {
  let accumulatedValue;
  if (initialValue) {
    accumulatedValue = initialValue;
  } else {
    accumulatedValue = iterable.next().value;
  }
  for (const currentValue of iterable) {
    accumulatedValue = combiner(accumulatedValue, currentValue);
  }
  return accumulatedValue;
}


/**
 * filter function for an iterable with breaking the loop support
 *
 * @param iterable
 * @param predicate
 * @return an array
 */
export function filter(iterable, predicate, pushResultOnBreak = true) {
  const result = [];
  for (const x of iterable) {
    try {
      if (predicate(x)) {
        result.push(x);
      }
    } catch (ex) {
      // allow predicate breaking the loop
      if (pushResultOnBreak) {
        result.push(x);
      }
      break;
    }
  }

  return result;
}

/**
 * pick existing fields from an object to create a new object
 *
 * @param obj
 * @param ...fields
 * @return new object
 */
export function pick(obj, ...fields) {
  const has = p => ({}.hasOwnProperty.call(obj, p));
  const result = {};
  for (const p of fields) {
    if (has(p)) {
      Object.assign(result, { [p]: obj[p] });
    }
  }
  return result;
}

/**
 * Rounding numbers to be financial numbers
 * 0.299 => 0.3
 * 0.1 + 0.2 => 0.3
 * 0.22999 => 0.23
 */
export function financialRound(number) {
  return Math.round(number * 100) / 100;
}

/**
 * Checks if fn is a function or not.
 *
 * @param fn the value to be checked
 * @return boolean
 */
export function isFunction(fn) {
  return typeof fn === 'function';
}

