import {map, reduce, identity, sum, isEqual} from "lodash/fp";
import {property} from "jsverify";

import {plusP} from "./arbitraries";
import {flow, compose} from "../lib";

describe("The flow combinator", () => {
  property(
    "composes a list of functions",
    "array nat",
    "nat",
    async (xs, y) => {
      const fs = map(plusP, xs);
      return isEqual(await flow(fs, y), sum(xs) + y);
    }
  );

  property(
    "is equivalent to composing compositions of functions",
    "array nat",
    "nat",
    async (xs, y) => {
      const fs = map(plusP, xs);
      const lhs = reduce((memo, x) => compose(memo, plusP(x)), identity, xs);
      const rhs = flow(fs);
      return isEqual(await lhs(y), await rhs(y));
    }
  );
});
