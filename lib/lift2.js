import {curry3} from "./internal/curryN";

/**
 * Lift a binary function over two promises.
 *
 * `lift2 :: Functor f => (a -> b -> c) -> f a -> f b -> f c`
 *
 * @param {Function.<*, *>} f A binary function that can either return a value
 * or a promise for a value.
 * @param {Promise.<*>} x A value that gets lifted as the first argument
 * of `f`. This is a promise that resolves to a value.
 * @param {Promise.<*>} y A value that gets lifted as the first argument
 * of `f`. This is a promise that resolves to a value.
 * @returns {Promise.<*>} The value that f returns when applied to `x` and
 * `y`.
 * @example
 * const f = (x, y) => x + y;
 * lift2(f, of(a), of(b)).then(console.log); // Returns 3.
 */
const lift2 = curry3((f, x, y) => Promise.all([x, y]).then(xs => f(...xs)));

export default lift2;
