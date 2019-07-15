import {curry2} from "./internal/curry";

const collectN = (atOnce) => (f, xs) =>
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
  });

export const {
  collect,
  collect2,
  collect3,
  collect4,
  collect5,
  collect6,
  collect7,
  collect8,
} = [...Array(8).keys()].reduce((memo, i) => {
  const name = `collect${i === 0 ? "" : i + 1}`;
  return Object.assign(memo, {[name]: curry2(name, collectN(i + 1))});
}, {});
