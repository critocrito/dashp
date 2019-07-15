import {flow} from "./flow";
import {of} from "./Future";
import clone from "./internal/clone";
import {curry2} from "./internal/curry";

const k = (f, p) =>
  of(p)
    .then(f)
    .then(() => p);

export const tap = curry2("tap", (f, p) => k(f, p));

export const tapClone = curry2("tapClone", (f, p) => k(flow([clone, f]), p));
