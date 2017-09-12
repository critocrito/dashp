import {of} from "./Future";
import {curry3} from "./internal/curryN";

/**
 * Compose two function that return promises to yield a third function that
 * returns a promise. The resulting composite function is denoted
 * `g∘f : X → Z`, defined by `(g∘f)(x) = g(f(x))` for all `x` in `X`.
 *
 * `compose :: Functor f => (a -> f b) -> (b -> f c) -> f a -> f c`
 *
 * @example
 * const f = x => of(x + 1);
 * const g = x => of(x + 5);
 * const h = compose(f, g);
 * h(10).then(console.log); // 10 + 1 + 5, returns 16.
 * h(of(10)).then(console.log); // 10 + 1 + 5, returns 16.
 *
 * @param {Function} f The function that get's called first when composing. It
 * takes a value as an argument and returns a promise for a value.
 * @param {Function} g The function that get's called second when composing.
 * It takes a value as an argument and returns a promise for a value.
 * @param {(Promise.<*>|*)} x The argument to call `(g∘f)` with. It can either be
 * any value, or the promise for any value.
 * @returns {Promise.<*>} The result of calling `g` with the result of
 * `f(x)`.
 */
const compose = curry3((f, g, x) =>
  of(x)
    .then(f)
    .then(g)
);

export default compose;
