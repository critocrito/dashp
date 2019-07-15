import {map, reduce, range, identity, sum, isEqual, times} from "lodash/fp";
import {testProp, fc} from "ava-fast-check";

import {singleValueArb, throws, plusP} from "./_helpers";
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

testProp(
  "chains a list of functions",
  [fc.array(fc.nat()), fc.nat()],
  async (xs, y) => {
    const fs = map(plusP, xs);
    return isEqual(
      await flow(
        fs,
        y,
      ),
      sum(xs) + y,
    );
  },
);

testProp(
  "is equivalent to composing functions",
  [fc.array(fc.nat()), fc.nat()],
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
  const arbs = times(() => fc.nat(), i + 1);

  testProp(`lifts ${i + 1} arguments into the pipe`, arbs, async (...args) =>
    isEqual(await f([sumP], ...args), args.reduce((memo, a) => memo + a, 0)),
  );

  testProp(
    `${name} throws if the first argument is not an array`,
    [singleValueArb()],
    (a) =>
      throws(
        () => f(a, ...range(() => of(fixture), i + 1)),
        TypeError,
        new RegExp(`^Future#${name} (.+)to be an array`),
      ),
  );
});
