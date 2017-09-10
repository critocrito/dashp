import {collect, collect2, collect3, collect4, collect5} from "./collect";
import {curry3} from "./internal/curryN";
import flatten from "./internal/flatten";

const flatmapN = curry3((mapper, f, xs) => mapper(f, xs).then(flatten));

/**
 * Map a function over every element of a list and concatenate the results
 * into a single list. Only one promise at a time get's resolved.
 *
 * @example
 * const f = x => [x, x];
 * const xs = [1, 2];
 * flatmap(f, xs).then(console.log); // Prints [1, 1, 2, 2];
 *
 * @param {Function.<*>} f The function that is applied to every element. This
 * function can either return a value or the promise for a value.
 * @param {(Promise.<Array>|Array.<*>)} xs The list to map `f` over. This can
 * either be an array, or the promise for an array.
 * @returns {Promise.<Array>} The concatenation of applying every element of
 * `xs` to `f`.
 */
export const flatmap = flatmapN(collect);

/**
 * The same as `flatmap`, but run two promises concurrently.
 */
export const flatmap2 = flatmapN(collect2);

/**
 * The same as `flatmap`, but run three promises concurrently.
 */
export const flatmap3 = flatmapN(collect3);

/**
 * The same as `flatmap`, but run four promises concurrently.
 */
export const flatmap4 = flatmapN(collect4);

/**
 * The same as `flatmap`, but run five promises concurrently.
 */
export const flatmap5 = flatmapN(collect5);

export default {flatmap, flatmap2, flatmap3, flatmap4, flatmap5};
