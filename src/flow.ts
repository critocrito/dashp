import {of} from "./future";
import {curry2, curry3, curry4, curry5, curry6, curry7, curry8, curry9} from "./internal/curry";
import identity from "./internal/identity";
import {DashFn, Tuple} from "./internal/types";

export const flowN = <T extends unknown>(fs: DashFn<Tuple, T>[], ...xs: Tuple): Promise<T> => {
  // If we encounter a call to `caught`, wrap the whole block in an exception
  // handler.
  const [head, ...tail] = fs.reduce((memo, f) => {
    if (f.name.startsWith("caught-"))
      return [(p: Promise<T>): Promise<T> => f(flowN(memo, p)) as Promise<T>];
    return memo.concat(f);
  }, [] as DashFn<Tuple, T>[]);
  const f = head || identity;

  return tail.reduce((memo, g) => memo.then(g), of(f(...xs)) as Promise<T>);
};

export const flow = curry2("flow", flowN);
export const flow2 = curry3("flow2", flowN);
export const flow3 = curry4("flow4", flowN);
export const flow4 = curry5("flow5", flowN);
export const flow5 = curry6("flow6", flowN);
export const flow6 = curry7("flow7", flowN);
export const flow7 = curry8("flow8", flowN);
export const flow8 = curry9("flow9", flowN);
