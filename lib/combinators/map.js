import Promise from "bluebird";
import {curry2} from "../curryN";

/**
 * Map a function over every element of a list. This is equivalent to
 * `Array.map`.
 *
 * @example
 * const f = x => future(x + 1);
 * const xs = [...Array(5).keys()];
 * map(f, xs).then(console.log); // Prints [1, 2, 3, 4, 5]
 *
 * @param {Function.<*>} f The function that is applied to every element. This
 * function can either return a value or the promise for a value.
 * @param {Array.<*>} xs The list to map `f` over. This can either be an
 * array, or the promise for an array.
 * @returns {Promise.<Array>} A list of the same length as `xs`, but with `f`
 * applied to each of its elements.
 */
const map = curry2((f, xs) => Promise.map(xs, f, {concurrency: 1}));

export default map;
