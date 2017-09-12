import {curry2, curry3} from "./internal/curryN";
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
 * Map the left function over the rejection value, and the right function over
 * the success value of a promise.
 *
 * `bimap :: Bifunctor f => (a -> c) -> (b -> d) -> f a b -> f c d`
 *
 * @param {Function.<*>} left The function to map over the rejection value of
 * `p`.
 * @param {Function.<*>} right The function to map over the success value of
 * `p`.
 * @param {Promise.<*>} p The promise to evaluate. If it throws, call the
 * `left` function with the reason, otherwise call the `right` function with
 * it's evaluation value.
 * @returns {Promise.<*>} A promise that evaluates either to the result of
 * calling left or calling right.
 */
const bimap = curry3((left, right, p) => {
  let mark = false;
  return p
    .then(y => {
      mark = true;
      return right(y);
    })
    .catch(e => {
      if (mark) throw e;
      return left(e);
    });
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

export {of, map, bimap, ap, chain};
export default {of, map, bimap, ap, chain};
