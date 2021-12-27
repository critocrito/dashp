import {of} from "./future";
import {curry2} from "./internal/curry";
import {isArray} from "./internal/is";
import {DashFn, Tuple} from "./internal/types";

export default curry2(
  "spread",
  <T extends unknown, F extends DashFn<Tuple<T>, any>>(f: F, p: Promise<T | Tuple<T>>) =>
    of(p).then(
      (args: T | Tuple<T>): ReturnType<F> => {
        if (isArray(args)) return f(...args);
        return f(args);
      },
    ),
);
