import {curry2} from "./internal/curryN";
import {isFunction} from "./internal/is";
import {invalidFunction} from "./internal/throw";

const collectN = curry2((atOnce, f, xs) => {
  if (!isFunction(f))
    invalidFunction(`Future#collect${atOnce > 1 ? atOnce : ""}`, 0, f);

  // eslint-disable-next-line promise/avoid-new
  return new Promise((resolve, reject) => {
    const ret = [];
    const iterator = xs[Symbol.iterator]();
    let isRejected = false;
    let iterableDone = false;
    let resolvingCount = 0;
    let currentIdx = 0;

    const next = () => {
      if (isRejected) return;
      const nextItem = iterator.next();
      const i = currentIdx;
      currentIdx += 1;

      if (nextItem.done) {
        iterableDone = true;

        if (resolvingCount === 0) resolve(ret);
        return;
      }
      resolvingCount += 1;

      Promise.resolve(nextItem.value)
        .then(f)
        // eslint-disable-next-line promise/always-return
        .then(val => {
          ret[i] = val;
          resolvingCount -= 1;
          next(); // eslint-disable-line promise/no-callback-in-promise
        })
        .catch(err => {
          isRejected = true;
          reject(err);
        });
    };

    for (let i = 0; i < atOnce; i += 1) {
      next();
      if (iterableDone) break;
    }
  });
});

/**
 * Map a function over every element of a list. This is equivalent to
 * `Array.map`. Only one promise at a time get's resolved.
 *
 * @example
 * const f = x => F.of(x + 1);
 * const xs = [...Array(5).keys()];
 * collect(f, xs).then(console.log); // Prints [1, 2, 3, 4, 5]
 *
 * @param {Function.<*>} f The function that is applied to every element. This
 * function can either return a value or the promise for a value.
 * @param {(Promise.<Array>|Array.<*>)} xs The list to map `f` over. This can
 * either be an array, or the promise for an array.
 * @returns {Promise.<Array>} A list of the same length as `xs`, but with `f`
 * applied to each of its elements.
 */
export const collect = collectN(1);

/**
 * The same as `collect`, but run two promises concurrently.
 */
export const collect2 = collectN(2);

/**
 * The same as `collect`, but run three promises concurrently.
 */
export const collect3 = collectN(3);

/**
 * The same as `collect`, but run four promises concurrently.
 */
export const collect4 = collectN(4);

/**
 * The same as `collect`, but run five promises concurrently.
 */
export const collect5 = collectN(5);

export default {collect, collect2, collect3, collect4, collect5};
