import {curry2} from "./internal/curryN";
import {isFunction} from "./internal/is";
import {invalidFunction} from "./internal/throw";

/**
 * Lift a value into a promise. This is equivalent to `Promise.resolve`.
 *
 * `of :: b -> Future a b`
 *
 * @example
 * const x = F.of(23);
 * const f = a => F.of(a + 1);
 *
 * @param {(Promise.<*>|*)} x The value to lift into a promise. This can
 * either be a value, or a promise that resolves to a value.
 * @returns {Promise.<*>} The value inside a promise.
 */
const of = x => Promise.resolve(x);

/**
 * Map a function over a promise.
 *
 * `map :: Functor f => (a -> b) -> f a -> f b`
 *
 * @param {Function.<*>} f The function to apply. `f` is a function that
 * takes a single argument and returns a value.
 * @param {(Promise.<*>|*)} x The value to apply to `f`. This can either be a
 * value, or a promise that resolves to a value.
 * @returns {Promise.<*>} The result of `x` applied to `f`.
 */
const map = curry2((f, x) => {
  if (!isFunction(f)) invalidFunction("Future#map", 0, f);
  return of(x).then(f);
});

/**
 * Apply a function wrapped in a promise to a promisified value.
 *
 * `ap :: Applicative f => f (a -> b) -> f a -> f b`
 *
 * @param {Promise.<Function>} pf A promise that resolves to a function.
 * @param {Promise.<Any>} p A promise that resolves to a value.
 * @returns {Promise.<Any>} A promise resolving to x applied to the function
 * that f resolves to.
 * @example
 * const pf = F.of(v => v + 1);
 * const p = F.of(1);
 * apply(pf, f).then(console.log); // Returns 2.
 */
const ap = curry2((pf, p) => pf.then(f => map(f, p)));

/**
 * Create a new promise based on the resolution value. This is equivalent to
 * `promise.then(f)`.
 *
 * `chain :: Chain m => (a -> m b) -> m a -> m b`
 *
 * @example
 * const f = x => of(x + 1);
 * chain(f, of(0)); // Resolves to 1
 *
 * @param {Function.<Promise>} f The function to chain. It returns a promise that
 * resolves to a value.
 * @param {Promise.<*>} x The value to apply to `f`.
 * @returns {Promise.<*>} A promise that resolves to the result of `x` applied
 * to `f`.
 */
const chain = curry2((f, p) => {
  if (!isFunction(f)) invalidFunction("Future#chain", 0, f);
  return p.then(f);
});

export {of, map, ap, chain};
export default {of, map, ap, chain};
