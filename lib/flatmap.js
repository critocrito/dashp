import {collect, collect2, collect3, collect4, collect5} from "./collect";
import {curry2} from "./internal/curryN";
import flatten from "./internal/flatten";
import {isFunction} from "./internal/is";
import {invalidFunction} from "./internal/throw";

const flatmapN = (mapper, f, xs) => mapper(f, xs).then(flatten);

export const flatmap = curry2((f, xs) => {
  if (!isFunction(f)) invalidFunction("Future#flatmap", 0, f);
  return flatmapN(collect, f, xs);
});

export const flatmap2 = curry2((f, xs) => {
  if (!isFunction(f)) invalidFunction("Future#flatmap2", 0, f);
  return flatmapN(collect2, f, xs);
});

export const flatmap3 = curry2((f, xs) => {
  if (!isFunction(f)) invalidFunction("Future#flatmap3", 0, f);
  return flatmapN(collect3, f, xs);
});

export const flatmap4 = curry2((f, xs) => {
  if (!isFunction(f)) invalidFunction("Future#flatmap4", 0, f);
  return flatmapN(collect4, f, xs);
});

export const flatmap5 = curry2((f, xs) => {
  if (!isFunction(f)) invalidFunction("Future#flatmap5", 0, f);
  return flatmapN(collect5, f, xs);
});
