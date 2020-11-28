import {of} from "./future";
import {curry3} from "./internal/curry";
import {DashFn} from "./internal/types";

export default curry3(
  "compose",
  <T1 extends unknown, T2 extends unknown, R extends unknown>(
    f: DashFn<[T1], T2>,
    g: DashFn<[T2], R>,
    x: T1,
  ) => of(x).then(f).then(g),
);
