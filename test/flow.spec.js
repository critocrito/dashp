import {map, reduce, identity, sum, isEqual} from "lodash/fp";
import {assertForall, array, nat} from "jsverify";

import {maybePromisify, addP, addMaybeP} from "./arbitraries";
import flow from "../lib/combinators/flow";
import compose from "../lib/combinators/compose";

describe("The flow combinator", () => {
  it("composes a list of functions", () =>
    assertForall(array(nat), nat, (xs, y) => {
      const fs = map(addP, xs);
      return flow(fs, y).then(isEqual(sum(xs) + y));
    }));

  it("it accepts non promisified and promisified arguments", () =>
    assertForall(array(nat), nat, (xs, y) => {
      const fs = map(addMaybeP, xs);
      return flow(maybePromisify(fs), maybePromisify(y)).then(
        isEqual(sum(xs) + y)
      );
    }));

  it("is equivalent to composing compositions of functions", () =>
    assertForall(array(nat), nat, (xs, y) => {
      const fs = map(addP, xs);
      const lhs = reduce((memo, x) => compose(memo, addP(x)), identity, xs);
      const rhs = flow(fs);
      return Promise.all([lhs(y), rhs(y)]).then(([a, b]) => isEqual(a, b));
    }));
});
