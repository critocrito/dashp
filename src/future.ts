/* eslint @typescript-eslint/no-explicit-any: off */
import {curry2, curry3} from "./internal/curry";
import nameFn from "./internal/namefn";
import {DashFn} from "./internal/types";

const of = nameFn("of", <T extends unknown>(x: T): Promise<T> => Promise.resolve(x));

const map = curry2(
  "map",
  <T extends unknown, R extends unknown>(f: DashFn<[T], R>, p: Promise<T>) => p.then(f),
);

const bimap = curry3(
  "bimap",
  <T extends unknown, R1 extends unknown, R2 extends unknown>(
    left: DashFn<[T], R1>,
    right: DashFn<[T], R2>,
    p: Promise<T>,
  ): Promise<R1 | R2> => {
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
  <T extends unknown, R extends unknown>(pf: Promise<DashFn<[T], R>>, p: Promise<T>) =>
    Promise.all([pf, p]).then(([f, x]) => f(x)),
);

const chain = curry2(
  "chain",
  <T extends unknown, R extends unknown>(f: DashFn<[T], R>, p: Promise<T>): Promise<R> => p.then(f),
);

export {ap, bimap, chain, map, of};
export default {ap, of, map, bimap, chain};
