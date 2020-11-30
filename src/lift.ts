import {curry3, curry4, curry5} from "./internal/curry";
import {DashFn, Tuple} from "./internal/types";

const lift = <T extends unknown>(f: DashFn<Tuple, T>, ...args: Tuple): Promise<T> =>
  Promise.all(args).then((xs) => f(...xs));

export const lift2 = curry3("lift2", lift);
export const lift3 = curry4("lift3", lift);
export const lift4 = curry5("lift4", lift);
