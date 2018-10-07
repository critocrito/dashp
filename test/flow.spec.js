import {map, reduce, range, identity, sum, isEqual, times} from "lodash/fp";
import jsc, {property} from "jsverify";

import {singleValueArb, plusP} from "./arbitraries";
import {
  of,
  flow,
  flow2,
  flow3,
  flow4,
  flow5,
  flow6,
  flow7,
  flow8,
  compose,
} from "../src";

const sumP = (...args) => of(sum(args));
const fixture = Symbol("fixture");

describe("The flow combinator", () => {
  property("chains a list of functions", "array nat", "nat", async (xs, y) => {
    const fs = map(plusP, xs);
    return isEqual(
      await flow(
        fs,
        y,
      ),
      sum(xs) + y,
    );
  });

  property(
    "is equivalent to composing functions",
    "array nat",
    "nat",
    async (xs, y) => {
      const fs = map(plusP, xs);
      const lhs = reduce(
        (memo, x) =>
          compose(
            memo,
            plusP(x),
          ),
        identity,
        xs,
      );
      const rhs = flow(fs);
      return isEqual(await lhs(y), await rhs(y));
    },
  );

  [flow, flow2, flow3, flow4, flow5, flow6, flow7, flow8].forEach((f, i) => {
    const name = f.name.replace(/-\d$/, "");
    const arbs = times(() => "nat", i + 1);

    property(
      `lifts ${i + 1} arguments into the pipe`,
      ...arbs,
      async (...args) =>
        isEqual(
          await f([sumP], ...args),
          args.reduce((memo, a) => memo + a, 0),
        ),
    );

    describe("has argument type checks", () => {
      property(
        `${name} throws if the first argument is not an array`,
        singleValueArb,
        (a) => {
          const block = () => f(a, ...range(() => of(fixture), i + 1));
          return jsc.throws(
            block,
            TypeError,
            new RegExp(`^Future#${name} (.+)to be an array`),
          );
        },
      );
    });
  });
});
