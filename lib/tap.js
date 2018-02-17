import {of} from "./Future";
import {curry2} from "./internal/curry";
import clone from "./internal/clone";
import {isFunction} from "./internal/is";
import {invalidFunction} from "./internal/throw";

export const tap = curry2("tap", (f, p) => {
  if (!isFunction(f)) invalidFunction("Future#tap", 0, f);
  return of(f(p)).then(() => p);
});

export const tapClone = curry2("tapClone", (f, p) => {
  if (!isFunction(f)) invalidFunction("Future#tapClone", 0, f);
  return of(f(clone(p))).then(() => p);
});
