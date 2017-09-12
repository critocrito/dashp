import {of} from "./Future";
import {curry2} from "./internal/curryN";

/**
 * Create a function out of a list of functions, where each successive
 * invocation is supplied the return value of the previous function call. The
 * new function forms a pipe where the results flow from left to right so to
 * speak. It's a shortcut for composing more than two functions.
 *
 * @example
 * const f = (x, y) => of(x + y);
 * const fs = map(f, [...Array(5).keys()]);
 * flow(fs, 0).then(console.log); // The sum of [0, 1, 2, 3, 4], returns 10
 *
 * @param {(Promise.<Array>|Array.<Function>)} fs An array of functions to
 * compose. `fs` can either be an array, or a promise that resolves to an
 * array. Each function can either return a value or a promise for a value.
 * @param {(Promise|*)} x The argument to call the function pipeline with. It
 * can either be any value, or the promise for any value.
 * @returns {Promise.<*>} The result of applying `x` to the pipeline of
 * `fs`.
 */
const flow = curry2((fs, x) => fs.reduce((memo, f) => memo.then(f), of(x)));

export default flow;
