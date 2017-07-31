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
 * @param {(Promise.<Array>|Array.<*>)} xs An array of values that are
 * resolved. `xs` can either be an array, or a promise that resolves to an
 * array. Each element of `xs` can either be a value, or a promise that
 * resolves to a value.
 * @returns {Function.<Promise.Array<*>>} A function, that when called, resolves all
 * promises and returns an Array of values.
 */
const all = xs => () => future(xs).then(ys => Promise.all(ys.map(future)));

export default all;
