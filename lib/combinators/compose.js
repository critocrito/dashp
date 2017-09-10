import {of} from "../Future";
import {curry3} from "../curryN";
import promisify from "../promisify";

/**
 * Compose two function that return promises to yield a third function that
 * returns a promise. The resulting composite function is denoted
 * `g∘f : X → Z`, defined by `(g∘f)(x) = g(f(x))` for all `x` in `X`.
 *
 * @example
 * const f = x => of(x + 1);
 * const g = x => of(x + 5);
 * const h = compose(f, g);
 * h(10).then(console.log); // 10 + 1 + 5, returns 16.
 *
 * @param {(Promise.<Function>|Function)} f The first function to
 * compose. This argument can either be a function, or a promise that resolves
 * to a function. The function can either return a value or a promise for a
 * value.
 * @param {(Promise.<Function>|Function)} g The second function to
 * compose. This argument can either be a function, or a promise that resolves
 * to a function. The function can either return a value or a promise for a
 * value.
 * @param {(Promise|*)} x The argument to call `(g∘f)` with. It can either be
 * any value, or the promise for any value.
 * @returns {Promise.<*>} The result of calling `g` with the result of
 * `f(x)`.
 */
const compose = curry3(promisify((f, g, x) => of(f(x)).then(g)));

export default compose;
