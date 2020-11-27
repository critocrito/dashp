/* eslint @typescript-eslint/no-explicit-any: off */
import {curry2, curry3} from "./internal/curry";
import nameFn from "./internal/namefn";

const of = nameFn("of", (x) => Promise.resolve(x));

const map = curry2(
  "map",
  <F extends (arg: any) => any>(
    f: F,
    p: Promise<Parameters<F>>,
  ): Promise<ReturnType<F>> => p.then(f),
);

const bimap = curry3(
  "bimap",
  <T, F extends (arg: T) => Promise<any>, G extends (arg: T) => Promise<any>>(
    left: F,
    right: G,
    p: Promise<T>,
  ) => {
    let mark = false; // When set to true, don't run left when right throws.
    return p
      .then((x) => {
        mark = true;
        return right(x);
      })
      .catch((error) => {
        if (mark) throw error;
        return left(error);
      });
  },
);

const ap = curry2(
  "ap",
  <F extends (arg: any) => any>(pf: F, p: Promise<Parameters<F>>) =>
    Promise.all([pf, p]).then(([f, x]) => f(x)),
);

const chain = curry2(
  "chain",
  <F extends (arg: any) => any>(
    f: F,
    p: Promise<Parameters<F>>,
  ): Promise<ReturnType<F>> => p.then(f),
);

export {ap, bimap, chain, map, of};
export default {of, map, bimap, ap, chain};
