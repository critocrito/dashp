import {curry2, curry3} from "./internal/curryN";
import {isThenable, isFunction} from "./internal/is";
import action from "./internal/action";
import {invalidThenable, invalidFunction} from "./internal/throw";

/**
 * Lift a value into a promise. This is equivalent to `Promise.resolve`.
 *
 * `of :: a -> Future a`
 *
 * @example
 * const p = F.of(23);
 *
 * @param {*} x The value to lift into a promise. 
 * @returns {Promise.<*>} The value inside a promise.
 */
const of = x => Promise.resolve(x);

/**
 * Map a function over a promise.
 *
 * `map :: Functor f => (a -> b) -> f a -> f b`
 *
 * @example
 * const p = F.of(1);
 * const f = x => x + 1;
 * F.map(f, p).then(console.log); // Prints 2
 *
 * @param {Function.<*>} f The function to apply. `f` is a function that takes
 * a single argument and returns a value.
 * @param {Promise.<*>} a An action that resolves to a value to apply to `f`.
 * @returns {Promise.<*>} The result of `x` applied to `f`.
 */
const map = curry2((f, a) => {
  if (!isFunction(f)) invalidFunction("Future#map", 0, f);
  return action(a).then(f);
});

/**
 * Map the left function over the rejection value, and the right function over
 * the success value of a promise.
 *
 * `bimap :: Bifunctor f => (a -> c) -> (b -> d) -> f a b -> f c d`
 *
 * @example
 * const f = () => console.log('Boom!');
 * const g = x => x + 1;
 * F.bimap(f, g, F.of(1)).then(console.log); // Prints 2
 * F.bimap(f, g, Promise.reject()); // Prints 'Boom!'
 *
 * @param {Function.<*>} left The function to map over the rejection value of
 * `p`. `left` is a function that takes a single argument and returns a value.
 * @param {Function.<*>} right The function to map over the success value of
 * `p`. `right` is a function that takes a single argument argument and
 * returns a value.
 * @param {Promise.<*>} a An action to resolve to a value. If it throws, call
 * the `left` function with the reason, otherwise call the `right` function
 * with it's evaluation value.
 * @returns {Promise.<*>} A promise that evaluates either to the result of
 * calling left or calling right.
 */
const bimap = curry3((left, right, a) => {
  if (!isFunction(left)) invalidFunction("Future#bimap", 0, left);
  if (!isFunction(right)) invalidFunction("Future#bimap", 1, right);
  let mark = false; // When set to true, don't run left when right throws.
  return action(a)
    .then(x => {
      mark = true;
      return right(x);
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
 * @example
 * const pf = F.of(v => v + 1);
 * const p = F.of(1);
 * apply(pf, p).then(console.log); // Returns 2.
 *
 * @param {Promise.<Function>} pf A promise that resolves to a function.
 * @param {Promise.<*>} a An action that resolves to a value to apply to the
 * value of `pf`.
 * @returns {Promise.<*>} A promise resolving to the resolved value of `a`
 * applied to the resolved function of `pf`.
 */
const ap = curry2((pf, a) => {
  if (!isThenable(pf)) invalidThenable("Future#ap", 0, pf);
  return Promise.all([pf, action(a)]).then(([f, x]) => f(x));
});

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
 * @param {Promise.<*>} a An action that resolves to a value to apply to `f`.
 * @returns {Promise.<*>} A promise that resolves to the result of `x` applied
 * to `f`.
 */
const chain = curry2((f, a) => {
  if (!isFunction(f)) invalidFunction("Future#chain", 0, f);
  return action(a).then(f);
});

export {of, map, bimap, ap, chain};
export default {of, map, bimap, ap, chain};
