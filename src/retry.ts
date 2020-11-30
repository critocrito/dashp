import caught from "./caught";
import delay from "./delay";
import {curry2, curry3, curry4, curry5} from "./internal/curry";
import nameFn from "./internal/namefn";
import {Func} from "./internal/types";
import isPromise from "./is-promise";

// times is 0-indexed. A times value of 4, actually makes 5 retries.
const retrier = (times: number, waitTime: number) => <T extends unknown>(
  action: Promise<T> | Func,
  ...args: unknown[]
): Promise<T> => {
  const delayModifier = 1.5;
  const f = isPromise(action) ? (): Promise<T> => action : action;

  const resolver = (iter: number, waitMs: number): Promise<T> => {
    if (iter <= 0) return f(...args);
    return caught(
      () => delay(waitMs, undefined).then(() => resolver(iter - 1, waitMs * delayModifier)),
      f(...args),
    );
  };

  return resolver(times, waitTime);
};

export const retry = nameFn("retry", retrier(4, 250));
export const retry2 = curry2("retry2", retrier(4, 250));
export const retry3 = curry3("retry3", retrier(4, 250));
export const retry4 = curry4("retry4", retrier(4, 250));
export const retry5 = curry5("retry5", retrier(4, 250));