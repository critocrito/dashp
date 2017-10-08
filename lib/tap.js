import {of} from "./Future";
import {curry2} from "./internal/curryN";
import clone from "./internal/clone";
import {isFunction} from "./internal/is";
import {invalidFunction} from "./internal/throw";

export const tap = curry2((f, p) => {
  if (!isFunction(f)) invalidFunction("Future#tap", 0, f);
  return of(f(p)).then(() => p);
});

export const tapClone = curry2((f, p) => {
  if (!isFunction(f)) invalidFunction("Future#tapClone", 0, f);
  return of(f(clone(p))).then(() => p);
});
