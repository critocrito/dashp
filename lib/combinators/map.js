import {curry2} from "../curryN";
import promisify from "../promisify";

const mapN = curry2(
  promisify(
    (concurrency, f, xs) =>
      // eslint-disable-next-line promise/avoid-new
      new Promise((resolve, reject) => {
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

        for (let i = 0; i < concurrency; i += 1) {
          next();
          if (iterableDone) break;
        }
      })
  )
);

/**
 * Map a function over every element of a list. This is equivalent to
 * `Array.map`. Only one promise at a time get's resolved.
 *
 * @example
 * const f = x => future(x + 1);
 * const xs = [...Array(5).keys()];
 * map(f, xs).then(console.log); // Prints [1, 2, 3, 4, 5]
 *
 * @param {Function.<*>} f The function that is applied to every element. This
 * function can either return a value or the promise for a value.
 * @param {(Promise.<Array>|Array.<*>)} xs The list to map `f` over. This can
 * either be an array, or the promise for an array.
 * @returns {Promise.<Array>} A list of the same length as `xs`, but with `f`
 * applied to each of its elements.
 */
const map = mapN(1);

export default map;
