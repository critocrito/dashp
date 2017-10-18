import {of} from "./Future";
import {curry2, curry3, curry4, curry5} from "./internal/curryN";
import {isArray} from "./internal/is";
import {invalidArray} from "./internal/throw";

export const flow = curry2("flow", (fs, x) => {
  if (!isArray(fs)) invalidArray("Future#flow", 0, fs);
  return fs.reduce((memo, f) => memo.then(f), of(x));
});

export const flow2 = curry3("flow2", (fs, x, y) => {
  if (!isArray(fs)) invalidArray("Future#flow2", 0, fs);
  const [head, ...tail] = fs;
  return tail.reduce((memo, f) => memo.then(f), of(head(x, y)));
});

export const flow3 = curry4("flow3", (fs, x, y, z) => {
  if (!isArray(fs)) invalidArray("Future#flow3", 0, fs);
  const [head, ...tail] = fs;
  return tail.reduce((memo, f) => memo.then(f), of(head(x, y, z)));
});

export const flow4 = curry5("flow4", (fs, w, x, y, z) => {
  if (!isArray(fs)) invalidArray("Future#flow4", 0, fs);
  const [head, ...tail] = fs;
  return tail.reduce((memo, f) => memo.then(f), of(head(w, x, y, z)));
});
