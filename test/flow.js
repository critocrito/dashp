import {fc, testProp} from "ava-fast-check";
import {identity, map, reduce, sum, times} from "lodash/fp";

import {compose, flow, flow2, flow3, flow4, flow5, flow6, flow7, flow8} from "../src";
import {plusP, sumP} from "./_helpers";

testProp("chains a list of functions", [fc.array(fc.nat()), fc.nat()], async (t, xs, y) => {
  const fs = map(plusP, xs);
  return t.is(await flow(fs, y), sum(xs) + y);
});

testProp(
  "is equivalent to composing functions",
  [fc.array(fc.nat()), fc.nat()],
  async (t, xs, y) => {
    const fs = map(plusP, xs);
    const lhs = reduce((memo, x) => compose(memo, plusP(x)), identity, xs);
    const rhs = flow(fs);
    return t.is(await lhs(y), await rhs(y));
  },
);

[flow, flow2, flow3, flow4, flow5, flow6, flow7, flow8].forEach((f, i) => {
  const arbs = times(() => fc.nat(), i + 1);

  testProp(`lifts ${i + 1} arguments into the pipe`, arbs, async (t, ...args) =>
    t.is(
      await f([sumP], ...args),
      args.reduce((memo, a) => memo + a, 0),
    ),
  );
});
