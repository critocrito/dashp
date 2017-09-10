import {map} from "../Future";
import {curry3} from "../curryN";
import promisify from "../promisify";

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
 * const f = (x, y) => F.of(x = y);
 * const a = of(1);
 * const b = of(2);
 * lift2(f, a, b).then(console.log); // Returns 3.
 */
const lift2 = curry3(promisify((f, x, y) => map(map(u => v => f(u, v), x), y)));

export default lift2;
