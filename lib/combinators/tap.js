import {curry2} from "../curryN";
import future from "./future";
import clone from "../clone";

/**
 * Run a function for side effect and return the original value. The original
 * value gets cloned and therefore can be modified in the tap handler.
 *
 * @example
 * const f = a => future(a);
 * flow([f, tap(console.log)])(23); // Print "23" to the console.
 *
 * @param {Function} f The function for side effect. The return value of this
 * function will be ignored.
 * @param {*} x The value to use for side effect. This can either be a value
 * or a promise that resolves to a value.
 * @returns {Promise.<*>} Returns `x`.
 */
const tap = curry2((f, x) =>
  future(x).tap(y => future(f).then(g => g(clone(y))))
);

export default tap;
