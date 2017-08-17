import future from "./future";
import {curry2} from "../curryN";
import promisify from "../promisify";

/**
 * Map a function over a promise.
 *
 * @param {(Promise.<Function>|Function.<*>)} f The function to apply. `f` can
 * either be a function, or a promise that resolves to a promise. The function
 * can either return a value, or a promise that resolves to a promise.
 * @param {(Promise.<*>|*)} x The value to apply to `f`. This can either be a
 * value, or a promise that resolves to a value.
 * @returns {Promise.<*>} The result of `x` applied to `f`.
 */
const fmap = curry2(promisify((f, x) => future(x).then(f)));

export default fmap;
