import {collect, collect2, collect3, collect4, collect5} from "./collect";
import {curry2} from "./internal/curry";
import flatten from "./internal/flatten";
import {isFunction, isArray} from "./internal/is";
import {invalidFunction, invalidArray} from "./internal/throw";

const flatmapN = (mapper, f, xs) => mapper(f, xs).then(flatten);

export const flatmap = curry2("flatmap", (f, xs) => {
  if (!isFunction(f)) invalidFunction("Future#flatmap", 0, f);
  if (!isArray(xs)) invalidArray("Future#flatmap", 1, xs);
  return flatmapN(collect, f, xs);
});

export const flatmap2 = curry2("flatmap2", (f, xs) => {
  if (!isFunction(f)) invalidFunction("Future#flatmap2", 0, f);
  if (!isArray(xs)) invalidArray("Future#flatmap2", 1, xs);
  return flatmapN(collect2, f, xs);
});

export const flatmap3 = curry2("flatmap3", (f, xs) => {
  if (!isFunction(f)) invalidFunction("Future#flatmap3", 0, f);
  if (!isArray(xs)) invalidArray("Future#flatmap3", 1, xs);
  return flatmapN(collect3, f, xs);
});

export const flatmap4 = curry2("flatmap4", (f, xs) => {
  if (!isFunction(f)) invalidFunction("Future#flatmap4", 0, f);
  if (!isArray(xs)) invalidArray("Future#flatmap4", 1, xs);
  return flatmapN(collect4, f, xs);
});

export const flatmap5 = curry2("flatmap5", (f, xs) => {
  if (!isFunction(f)) invalidFunction("Future#flatmap5", 0, f);
  if (!isArray(xs)) invalidArray("Future#flatmap5", 1, xs);
  return flatmapN(collect5, f, xs);
});
