import {curry2, curry3} from "./internal/curry";
import checkTypes from "./internal/checkTypes";
import nameFn from "./internal/namefn";

const of = nameFn("of", (x) => Promise.resolve(x));

const map = curry2(
  "map",
  checkTypes(["function", "thenable"], (f, p) => p.then(f)),
);

const bimap = curry3(
  "bimap",
  checkTypes(["function", "function", "thenable"], (left, right, p) => {
    let mark = false; // When set to true, don't run left when right throws.
    return p
      .then((x) => {
        mark = true;
        return right(x);
      })
      .catch((e) => {
        if (mark) throw e;
        return left(e);
      });
  }),
);

const ap = curry2(
  "ap",
  checkTypes(["thenable", "thenable"], (pf, p) =>
    Promise.all([pf, p]).then(([f, x]) => f(x)),
  ),
);

const chain = curry2(
  "chain",
  checkTypes(["function", "thenable"], (f, p) => p.then(f)),
);

export {of, map, bimap, ap, chain};
export default {of, map, bimap, ap, chain};
