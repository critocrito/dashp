import future from "./future";
import {curry3} from "../curryN";

/**
 * Reduce a list of values to a single value, using a reduction function. This
 * is equivalent to `Array.reduce`.
 *
 * @example
 * const f = (acc, x) => future(acc + x);
 * const xs = [...Array(5).keys()];
 * fold(f, 0, xs).then(console.log); // The sum of [0, 1, 2, 3, 4], returns 10;
 *
 * @param {Function.<*>} f The reduce function to map over the list. This
 * function can either return a value or the promise for a value.
 * @param {*} acc The initial value to apply to the first call of `f`. It can
 * either be any value or the promise for any value.
 * @param {Array.<*>} xs The list to reduce to a single value. This can either
 * be an array, or the promise for an array.
 * @returns {Promise.<*>} The value of `xs` reduced over `f`.
 */
const fold = curry3((f, acc, xs) =>
  future(xs).then(ys =>
    // eslint-disable-next-line promise/no-nesting
    ys.reduce((memo, x) => memo.then(y => f(y, x)), future(acc))
  )
);

export default fold;
