import {collect, collect2, collect3, collect4, collect5} from "./collect";
import {curry2} from "./internal/curryN";
import flatten from "./internal/flatten";
import {isFunction} from "./internal/is";
import {invalidFunction} from "./internal/throw";


const flatmapN = (mapper, f, xs) => mapper(f, xs).then(flatten);

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
export const flatmap = curry2((f, xs) => {
  if (!isFunction(f)) invalidFunction("Future#flatmap", 0, f);
  return flatmapN(collect, f, xs);
});

/**
 * The same as `flatmap`, but run two promises concurrently.
 */
export const flatmap2 = curry2((f, xs) => {
  if (!isFunction(f)) invalidFunction("Future#flatmap2", 0, f);
  return flatmapN(collect, f, xs);
});


/**
 * The same as `flatmap`, but run three promises concurrently.
 */
export const flatmap3 = curry2((f, xs) => {
  if (!isFunction(f)) invalidFunction("Future#flatmap3", 0, f);
  return flatmapN(collect, f, xs);
});

/**
 * The same as `flatmap`, but run four promises concurrently.
 */
export const flatmap4 = curry2((f, xs) => {
  if (!isFunction(f)) invalidFunction("Future#flatmap4", 0, f);
  return flatmapN(collect, f, xs);
});

/**
 * The same as `flatmap`, but run five promises concurrently.
 */
export const flatmap5 = curry2((f, xs) => {
  if (!isFunction(f)) invalidFunction("Future#flatmap5", 0, f);
  return flatmapN(collect, f, xs);
});

export default {flatmap, flatmap2, flatmap3, flatmap4, flatmap5};
