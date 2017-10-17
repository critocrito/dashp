import {map, reduce, identity, sum, isEqual} from "lodash/fp";
import {property} from "jsverify";

import {plusP} from "./arbitraries";
import {of, flow, flow2, flow3, compose} from "../lib";

const sumP = (...args) => of(sum(args));

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

  property("lifts two arguments into the pipe", "nat", "nat", async (x, y) =>
    isEqual(await flow2([sumP], x, y), x + y)
  );

  property(
    "lifts three arguments into the pipe",
    "nat",
    "nat",
    "nat",
    async (x, y, z) => isEqual(await flow3([sumP], x, y, z), x + y + z)
  );
});
