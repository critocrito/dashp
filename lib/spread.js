import {of} from "./Future";
import {curry2} from "./internal/curryN";
import promisify from "./internal/promisify";

/**
 * Call a variadic function with the value of a promise as it's arguments. If
 * the value is an array, flatten it to the formal parameters of the
 * fulfillment handler.
 *
 * @example
 * const add = (x, y) => x + y;
 * const p = of([1, 2]);
 * spread(add, p).then(console.log); // Prints 3
 *
 * @param {(Promise.<Function>|Function.<*>)} f The function to apply to the
 * value of p. This function can either return a value or the promise for a
 * value. This function can also be a promise that resolves to a function.
 * @param {(Promise.<*>|*)} p The promise that resolves to the arguments for
 * the function. This can either be a single value, an Array or a promise
 * resolving to any of those.
 * @returns {Promise.<*>} The result of applying the value of `p` to `f`.
 */
const spread = curry2(
  promisify((f, p) =>
    of(p).then(args => {
      if (Array.isArray(args)) return f(...args);
      return f(args);
    })
  )
);

export default spread;
