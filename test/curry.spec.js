import {curry as loCurry, every, isEqual} from "lodash/fp";
import {property} from "jsverify";

import {curry2, curry3, curry4} from "../lib/curryN";

describe("The currying of functions", () => {
  property(
    "curry2 is equivalent to the original function and lodash's curry",
    "nat",
    "nat",
    (x, y) => {
      const f = (a, b) => a + b;
      const f1 = loCurry(f);
      const f2 = curry2(f);
      return every(isEqual(f(x, y)), [f1(x, y), f2(x, y), f2(x)(y)]);
    }
  );

  property(
    "curry3 is equivalent to the original function and lodash's curry",
    "nat",
    "nat",
    "nat",
    (x, y, z) => {
      const f = (a, b, c) => a + b + c;
      const f1 = loCurry(f);
      const f2 = curry3(f);
      return every(isEqual(f(x, y, z)), [
        f1(x, y, z),
        f2(x, y, z),
        f2(x, y)(z),
        f2(x)(y, z),
        f2(x)(y)(z),
      ]);
    }
  );

  property(
    "curry4 is equivalent to the original function and lodash's curry",
    "nat",
    "nat",
    "nat",
    "nat",
    (w, x, y, z) => {
      const f = (a, b, c, d) => a + b + c + d;
      const f1 = loCurry(f);
      const f2 = curry4(f);
      return every(isEqual(f(w, x, y, z)), [
        f1(w, x, y, z),
        f2(w, x, y, z),
        f2(w, x, y)(z),
        f2(w, x)(y, z),
        f2(w)(x, y, z),
        f2(w)(x, y)(z),
        f2(w)(x)(y)(z),
      ]);
    }
  );

  property("curry/variadic function pattern", "nat", "nat", "nat", (...xs) => {
    const f = curry3((...args) => args.reduce((memo, a) => memo + a, 0));
    return isEqual(xs.reduce((memo, a) => memo + a, 0), f(...xs));
  });
});
