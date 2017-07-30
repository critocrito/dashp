import {curry} from "lodash/fp";

/**
 * Compose two function that return promises to yield a third function that
 * returns a promise. The resulting composite function is denoted `g∘f : X →
 * Z`, defined by `(g∘f)(x) = g(f(x))` for all `x` in `X`.
 *
 * @example
 * const f = x => Promise.resolve(x + 1);
 * const g = x => Promise.resolve(x + 5);
 * const h = compose(f, g);
 * h(10).then(console.log); // 10 + 1 + 5, returns 16.
 *
 * @param {Function} f The first function to compose. The function can either
 * return a value or a promise for a value.
 * @param {Function} g The second function to compose. The function can either
 * return a value or a promise for a value.
 * @param {(Promise|*)} x The argument to call `(g∘f)` with. It can either be
 * any value, or the promise for any value.
 * @returns {Promise.<*>} The result of calling `g` with the result of
 * `f(x)`.
 */
const compose = curry((f, g, x) => Promise.resolve(x).then(g).then(f));

export default compose;
