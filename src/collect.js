import {curry2} from "./internal/curry";
import checkTypes from "./internal/checkTypes";

const collectN = (atOnce) =>
  checkTypes(
    ["function", "array"],
    (f, xs) =>
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
            .then((val) => {
              ret[i] = val;
              resolvingCount -= 1;
              next(); // eslint-disable-line promise/no-callback-in-promise
            })
            .catch((err) => {
              isRejected = true;
              reject(err);
            });
        };

        for (let i = 0; i < atOnce; i += 1) {
          next();
          if (iterableDone) break;
        }
      }),
  );

export const collect = curry2("collect", collectN(1));
export const collect2 = curry2("collect2", collectN(2));
export const collect3 = curry2("collect3", collectN(3));
export const collect4 = curry2("collect4", collectN(4));
export const collect5 = curry2("collect5", collectN(5));
