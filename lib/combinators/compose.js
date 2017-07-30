import {curry} from "lodash/fp";

/**
 * Compose two function that return promises to yield a third function that
 * returns a promise. The resulting composite function is denoted `g∘f : X →
 * Z`, defined by `(g∘f)(x) = g(f(x))` for all `x` in `X`.
 *
 * @example
 * const f = x => x + 1;
 * const g = x => x + 5;
 * const h = compose(f, g);
 * h(10).then(console.log); // 10 + 1 + 5, Returns 16.
 * @param f {Function} The first function to compose.
 * @param g {Function} The second function to compose.
 * @param x {Any} The argument to call `(g∘f)` with.
 * @returns {Promise.<Any>} The result of calling `g` with the result of
 * `f(x)`.
 */
const compose = curry((f, g, x) => Promise.resolve(x).then(g).then(f));

export default compose;
