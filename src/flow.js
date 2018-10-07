import {of} from "./Future";
import curries from "./internal/curry";
import identity from "./internal/identity";
import checkTypes from "./internal/checkTypes";

export const flowN = (fs, ...xs) => {
  // If we encounter a call to `caught`, wrap the whole block in an exception
  // handler.
  const [head, ...tail] = fs.reduce((memo, f) => {
    if (/^caught-/.test(f.name)) return [(p) => f(flowN(memo, p))];
    return memo.concat(f);
  }, []);
  const f = head || identity;

  return tail.reduce((memo, g) => memo.then(g), of(f(...xs)));
};

export const {
  flow,
  flow2,
  flow3,
  flow4,
  flow5,
  flow6,
  flow7,
  flow8,
} = Array.from(...[Array(8).keys()]).reduce((memo, i) => {
  const name = `flow${i === 0 ? "" : i + 1}`;
  const curry = curries[`curry${i + 2}`];
  const g = curry(name, checkTypes(["array"], flowN));
  return Object.assign(memo, {[name]: g});
}, {});
