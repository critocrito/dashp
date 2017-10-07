import {of} from "./Future";
import {curry2} from "./internal/curryN";
import clone from "./internal/clone";
import {isFunction} from "./internal/is";
import {invalidFunction} from "./internal/throw";

/**
 * Run a function for side effect and return the original value.
 *
 * @example
 * const f = a => of(a);
 * flow([f, tap(console.log)])(23); // Print "23" to the console.
 *
 * @param {Function.<*>} f The function to call on `p`. This function is for
 * meant for side effects, if it returns a value, it will be ignored.
 * @param {(Promise.<*>|*)} p The value to use for side effect. This can
 * either be a value or a promise that resolves to a value.
 * @returns {Promise.<*>} Returns `p`.
 */
export const tap = curry2((f, p) => {
  if (!isFunction(f)) invalidFunction("Future#tap", 0, f);
  return of(f(p)).then(() => p);
});

/**
 * Like `tap`, but make a deep clone of `p` before applying it to `f`.
 */
export const tapClone = curry2((f, p) => {
  if (!isFunction(f)) invalidFunction("Future#tapClone", 0, f);
  return of(f(clone(p))).then(() => p);
});

export default {tap, tapClone};
