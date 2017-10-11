import {curry3} from "./internal/curryN";
import {isFunction, isArray} from "./internal/is";
import {invalidFunction, invalidArray} from "./internal/throw";

const collectN = curry3((atOnce, f, xs) => {
  const functionName = `Future#collect${atOnce > 1 ? atOnce : ""}`;
  if (!isFunction(f)) invalidFunction(functionName, 0, f);
  if (!isArray(xs)) invalidArray(functionName, 1, xs);

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

export const collect = collectN(1);
export const collect2 = collectN(2);
export const collect3 = collectN(3);
export const collect4 = collectN(4);
export const collect5 = collectN(5);
