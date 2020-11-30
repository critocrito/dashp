import {flow} from "./flow";
import {of} from "./future";
import clone from "./internal/clone";
import {curry2} from "./internal/curry";
import {DashFn} from "./internal/types";

const k = <T extends unknown>(f: DashFn<[T], unknown>, p: Promise<T>): Promise<T> =>
  of(p)
    .then(f)
    .then(() => p);

export const tap = curry2(
  "tap",
  <T extends unknown>(f: DashFn<[T], unknown>, p: Promise<T>): Promise<T> => k(f, p),
);

export const tapClone = curry2(
  "tapClone",
  <T extends unknown>(f: DashFn<[T], unknown>, p: Promise<T>): Promise<T> => k(flow([clone, f]), p),
);
