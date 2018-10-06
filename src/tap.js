import {of} from "./Future";
import {flow} from "./flow";
import {curry2} from "./internal/curry";
import clone from "./internal/clone";
import {isFunction} from "./internal/is";
import {invalidFunction} from "./internal/throw";

const k = (f, p) =>
  of(p)
    .then(f)
    .then(() => p);

export const tap = curry2("tap", (f, p) => {
  if (!isFunction(f)) invalidFunction("Future#tap", 0, f);
  return k(f, p);
});

export const tapClone = curry2("tapClone", (f, p) => {
  if (!isFunction(f)) invalidFunction("Future#tapClone", 0, f);
  return k(flow([clone, f]), p);
});
