import {map, reduce, identity, sum, isEqual} from "lodash/fp";
import jsc, {property} from "jsverify";

import {singleValueArb, plusP} from "./arbitraries";
import {of, flow, flow2, flow3, flow4, compose} from "../lib";

const sumP = (...args) => of(sum(args));
const fixture = Symbol("fixture");

describe("The flow combinator", () => {
  property("chains a list of functions", "array nat", "nat", async (xs, y) => {
    const fs = map(plusP, xs);
    return isEqual(await flow(fs, y), sum(xs) + y);
  });

  property(
    "is equivalent to composing functions",
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

  property(
    "lifts four arguments into the pipe",
    "nat",
    "nat",
    "nat",
    "nat",
    async (w, x, y, z) =>
      isEqual(await flow4([sumP], w, x, y, z), w + x + y + z)
  );

  [flow, flow2, flow3, flow4].forEach(f =>
    describe("has argument type checks", () => {
      property(
        `${f.name} throws if the first argument is not an array`,
        singleValueArb,
        a => {
          const block = () =>
            f(a, ...[of(fixture), of(fixture), of(fixture), of(fixture)]);
          return jsc.throws(
            block,
            TypeError,
            new RegExp(`^Future#${f.name} (.+)to be an array`)
          );
        }
      );
    })
  );
});
