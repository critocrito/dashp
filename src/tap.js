import {of} from "./Future";
import {flow} from "./flow";
import {curry2} from "./internal/curry";
import clone from "./internal/clone";
import checkTypes from "./internal/checkTypes";

const k = (f, p) =>
  of(p)
    .then(f)
    .then(() => p);

export const tap = curry2("tap", checkTypes(["function"], (f, p) => k(f, p)));

export const tapClone = curry2(
  "tapClone",
  checkTypes(["function"], (f, p) => k(flow([clone, f]), p)),
);
