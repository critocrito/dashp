import {of} from "./Future";
import {curry2} from "./internal/curryN";

/**
 * Call a variadic function with the value of a promise as it's arguments. If
 * the value is an array, flatten it to the formal parameters of the
 * fulfillment handler.
 *
 * @example
 * const plus = (x, y) => x + y;
 * const p = of([1, 2]);
 * spread(plus, p).then(console.log); // Prints 3
 *
 * @param {Function.<*>} f The function to apply to the value of p. This
 * function can either return a value or the promise for a value.
 * @param {*} p The promise that resolves to the arguments for the
 * function. The promise can either resolve to a single value or an array of
 * values.
 * @returns {Promise.<*>} The result of applying the value of `p` to `f`.
 */
const spread = curry2((f, p) =>
  of(p).then(args => {
    if (Array.isArray(args)) return f(...args);
    return f(args);
  })
);

export default spread;
