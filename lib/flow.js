import {of} from "./Future";
import {curry2, curry3, curry4} from "./internal/curryN";

export const flow = curry2("flow", (fs, x) =>
  fs.reduce((memo, f) => memo.then(f), of(x))
);

export const flow2 = curry3("flow2", (fs, x, y) => {
  const [head, ...tail] = fs;
  return tail.reduce((memo, f) => memo.then(f), of(head(x, y)));
});

export const flow3 = curry4("flow3", (fs, x, y, z) => {
  const [head, ...tail] = fs;
  return tail.reduce((memo, f) => memo.then(f), of(head(x, y, z)));
});
