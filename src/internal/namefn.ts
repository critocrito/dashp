import {DashFn} from "./types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const nameFn = <F extends DashFn<any[], any>>(name: string, fn: F): F => {
  Object.defineProperty(fn, "name", {value: name, configurable: true});
  return fn;
};

export default nameFn;
