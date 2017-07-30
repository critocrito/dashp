import {curry} from "lodash/fp";
import {property} from "jsverify";

import {curry2, curry3} from "../lib/utils";

describe("The custom curry2 functions", () => {
  property("equivalency when fully saturated", "nat", "nat", (x, y) => {
    const f = (a, b) => a + b;
    const f1 = curry(f);
    const f2 = curry2(f);
    return f1(x, y) === f2(x, y);
  });

  property("equivalency when saturating one argument", "nat", "nat", (x, y) => {
    const f = (a, b) => a + b;
    const f1 = curry(f)(x);
    const f2 = curry2(f)(x);
    return f1(y) === f2(y);
  });

  property(
    "equivalency when saturating all arguments",
    "nat",
    "nat",
    (x, y) => {
      const f = (a, b) => a + b;
      const f1 = curry(f)(x, y);
      const f2 = curry2(f)(x, y);
      return f1 === f2;
    }
  );
});

describe("The custom curry3 functions", () => {
  property(
    "equivalency when fully saturated",
    "nat",
    "nat",
    "nat",
    (x, y, z) => {
      const f = (a, b, c) => a + b + c;
      const f1 = curry(f);
      const f2 = curry3(f);
      return f1(x, y, z) === f2(x, y, z);
    }
  );

  property(
    "equivalency when saturating one argument",
    "nat",
    "nat",
    "nat",
    (x, y, z) => {
      const f = (a, b, c) => a + b + c;
      const f1 = curry(f)(x);
      const f2 = curry3(f)(x);
      return f1(y, z) === f2(y, z);
    }
  );

  property(
    "equivalency when saturating two arguments",
    "nat",
    "nat",
    "nat",
    (x, y, z) => {
      const f = (a, b, c) => a + b + c;
      const f1 = curry(f)(x, y);
      const f2 = curry3(f)(x, y);
      return f1(z) === f2(z);
    }
  );

  property(
    "equivalency when saturating all arguments",
    "nat",
    "nat",
    "nat",
    (x, y, z) => {
      const f = (a, b, c) => a + b + c;
      const f1 = curry(f)(x, y, z);
      const f2 = curry3(f)(x, y, z);
      return f1 === f2;
    }
  );
});
