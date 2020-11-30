import {DashFn, Tuple} from "./types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const nameFn = <T extends unknown = any, R extends unknown = any>(
  name: string,
  fn: DashFn<Tuple<T>, R>,
): DashFn<Tuple<T>, R> => {
  Object.defineProperty(fn, "name", {value: name, configurable: true});
  return fn;
};

export default nameFn;
