import Promise from "bluebird";
import future from "./future";

/**
 * Create a function that evaluates all promises in an array when called. This
 * is equivalent to `Promise.all`, with the difference that it creates a
 * callable function.
 *
 * @example
 * const f = all([openFile1(), opeFile2(), openFile3()]);
 * f().then(console.log); // Returns [a, b, c];
 *
 * @param {Array.<*>} xs An array of values that are resolved. Each element
 * can either be a value, or a promise that resolves to a value.
 * @returns {Function.<Promise.Array<*>>} A function, that when called, resolves all
 * promises and returns an Array of values.
 */
const all = xs => () => Promise.all(xs.map(future));

export default all;
