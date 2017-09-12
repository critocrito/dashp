import {of} from "./Future";
import {curry3} from "./internal/curryN";
import {isFunction} from "./internal/is";
import {invalidFunction} from "./internal/throw";

/**
 * Reduce a list of values to a single value, using a reduction function. This
 * is equivalent to `Array.reduce`.
 *
 * @example
 * const f = (acc, x) => of(acc + x);
 * const xs = [...Array(5).keys()];
 * fold(f, 0, xs).then(console.log); // The sum of [0, 1, 2, 3, 4], returns 10;
 *
 * @param {Function.<*>} f The function to reduce over the list. This function
 * takes an accumulator, a value and returns a promise for a value.
 * @param {*} acc The initial value to apply to the first call of `f`.
 * @param {Array.<*>} xs The list to reduce to a single value.
 * @returns {Promise.<*>} The value of `xs` reduced over `f`.
 */
const fold = curry3((f, acc, xs) => {
  if (!isFunction(f)) invalidFunction("Future#fold", 0, f);
  return xs.reduce((memo, x) => memo.then(y => f(y, x)), of(acc));
});

export default fold;
