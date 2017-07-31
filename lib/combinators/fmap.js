import future from "./future";
import all from "./all";
import {curry2} from "../curryN";

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
const fmap = curry2((f, x) =>
  all([future(f), future(x)])().then(([fP, xP]) => fP(xP))
);

export default fmap;
