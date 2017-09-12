import {of} from "./Future";
import {curry2} from "./internal/curryN";
import clone from "./internal/clone";
import promisify from "./internal/promisify";
import {isFunction} from "./internal/is";
import {invalidFunction} from "./internal/throw";

/**
 * Run a function for side effect and return the original value. The original
 * value gets cloned and therefore can be modified in the tap handler.
 *
 * @example
 * const f = a => of(a);
 * flow([f, tap(console.log)])(23); // Print "23" to the console.
 *
 * @param {(Promise.<Function>|Function)} f The function for side effect. The
 * return value of this function will be ignored.
 * @param {(Promise.<*>|*)} x The value to use for side effect. This can
 * either be a value or a promise that resolves to a value.
 * @returns {Promise.<*>} Returns `x`.
 */
const tap = curry2(promisify((f, x) => {
  if (!isFunction(f)) invalidFunction("Future#tap", 0, f);
  return of(f(clone(x))).then(() => x);
}));

export default tap;
