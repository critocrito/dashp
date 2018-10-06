import {of} from "./Future";
import {curry2, curry3, curry4, curry5} from "./internal/curry";
import identity from "./internal/identity";
import {isArray} from "./internal/is";
import {invalidArray} from "./internal/throw";

export const flowN = (fs, ...xs) => {
  const name = `flow${xs.length === 1 ? "" : xs.length}`;
  if (!isArray(fs)) invalidArray(`Future#${name}`, 0, fs);

  // If we encounter a call to `caught`, wrap the whole block in an exception
  // handler.
  const [head, ...tail] = fs.reduce((memo, f) => {
    if (/^caught-/.test(f.name)) return [(p) => f(flowN(memo, p))];
    return memo.concat(f);
  }, []);
  const f = head || identity;

  return tail.reduce((memo, g) => memo.then(g), of(f(...xs)));
};

export const flow = curry2("flow", flowN);
export const flow2 = curry3("flow2", flowN);
export const flow3 = curry4("flow3", flowN);
export const flow4 = curry5("flow4", flowN);
