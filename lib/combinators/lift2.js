import future from "./future";
import fmap from "./fmap";
import all from "./all";
import {curry3} from "../curryN";

/**
 * Lift a binary function over two promises.
 *
 * @param {(Promise.<Function>|Function.<*, *>)} f A binary function. This
 * can either be a function, or a promise that resolves to a function. The
 * function can either return a value, or a promise that resolves to a value.
 * @param {(Promise.<*>|*)} x A value that gets lifted as the first argument
 * of `f`. This can either be a value, or a promise that resolves to a value.
 * @param {(Promise.<*>|*)} y A value that gets lifted as the first argument
 * of `f`. This can either be a value, or a promise that resolves to a value.
 * @returns {Promise.<*>} The value that f returns when applied to `x` and
 * `y`.
 * @example
 * const f = (x, y) => future(x = y);
 * const a = future(1);
 * const b = future(2);
 * lift2(f, a, b).then(console.log); // Returns 3.
 */
const lift2 = curry3((f, x, y) =>
  all([future(f), future(x), future(y)])().spread((g, u, v) =>
    fmap(fmap(a => b => g(a, b), u), v)
  )
);

export default lift2;
