import {map, reduce, identity, sum, isEqual} from "lodash/fp";
import {property} from "jsverify";

import {plusP, isEqualAry} from "./arbitraries";
import {flow, compose} from "../lib";

describe("The flow combinator", () => {
  property("composes a list of functions", "array nat", "nat", (xs, y) => {
    const fs = map(plusP, xs);
    return flow(fs, y).then(isEqual(sum(xs) + y));
  });

  property(
    "is equivalent to composing compositions of functions",
    "array nat",
    "nat",
    (xs, y) => {
      const fs = map(plusP, xs);
      const lhs = reduce((memo, x) => compose(memo, plusP(x)), identity, xs);
      const rhs = flow(fs);
      return Promise.all([lhs(y), rhs(y)]).then(isEqualAry);
    }
  );
});
