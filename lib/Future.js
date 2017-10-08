import {curry2, curry3} from "./internal/curryN";
import {isThenable, isFunction} from "./internal/is";
import action from "./internal/action";
import {invalidThenable, invalidFunction} from "./internal/throw";

const of = x => Promise.resolve(x);

const map = curry2((f, a) => {
  if (!isFunction(f)) invalidFunction("Future#map", 0, f);
  return action(a).then(f);
});

const bimap = curry3((left, right, a) => {
  if (!isFunction(left)) invalidFunction("Future#bimap", 0, left);
  if (!isFunction(right)) invalidFunction("Future#bimap", 1, right);
  let mark = false; // When set to true, don't run left when right throws.
  return action(a)
    .then(x => {
      mark = true;
      return right(x);
    })
    .catch(e => {
      if (mark) throw e;
      return left(e);
    });
});

const ap = curry2((pf, a) => {
  if (!isThenable(pf)) invalidThenable("Future#ap", 0, pf);
  return Promise.all([pf, action(a)]).then(([f, x]) => f(x));
});

const chain = curry2((f, a) => {
  if (!isFunction(f)) invalidFunction("Future#chain", 0, f);
  return action(a).then(f);
});

export {of, map, bimap, ap, chain};
export default {of, map, bimap, ap, chain};
