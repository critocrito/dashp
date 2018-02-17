import {curry2, curry3} from "./internal/curry";
import {isThenable, isFunction} from "./internal/is";
import {invalidThenable, invalidFunction} from "./internal/throw";
import nameFn from "./internal/namefn";

const of = nameFn("of", x => Promise.resolve(x));

const map = curry2("map", (f, p) => {
  if (!isFunction(f)) invalidFunction("Future#map", 0, f);
  if (!isThenable(p)) invalidThenable("Future#map", 1, p);
  return p.then(f);
});

const bimap = curry3("bimap", (left, right, p) => {
  if (!isFunction(left)) invalidFunction("Future#bimap", 0, left);
  if (!isFunction(right)) invalidFunction("Future#bimap", 1, right);
  if (!isThenable(p)) invalidThenable("Future#bimap", 2, p);
  let mark = false; // When set to true, don't run left when right throws.
  return p
    .then(x => {
      mark = true;
      return right(x);
    })
    .catch(e => {
      if (mark) throw e;
      return left(e);
    });
});

const ap = curry2("ap", (pf, p) => {
  if (!isThenable(pf)) invalidThenable("Future#ap", 0, pf);
  if (!isThenable(p)) invalidThenable("Future#ap", 1, p);
  return Promise.all([pf, p]).then(([f, x]) => f(x));
});

const chain = curry2("chain", (f, p) => {
  if (!isFunction(f)) invalidFunction("Future#chain", 0, f);
  if (!isThenable(p)) invalidThenable("Future#chain", 1, p);
  return p.then(f);
});

export {of, map, bimap, ap, chain};
export default {of, map, bimap, ap, chain};
