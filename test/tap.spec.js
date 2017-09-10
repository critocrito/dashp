import {isEqual} from "lodash/fp";
import {assertForall} from "jsverify";

import {anyArb, maybePromisify} from "./arbitraries";
import {tap} from "../lib";

describe("The tap combinator", () => {
  // eslint-disable-next-line no-return-assign, no-unused-vars, no-param-reassign
  const f = x => (x = 23);

  it("returns the original value", () =>
    assertForall(anyArb, x => tap(f, x).then(isEqual(x))));

  it("accepts non promisified and promisified values", () =>
    assertForall(anyArb, x =>
      tap(maybePromisify(f), maybePromisify(x)).then(isEqual(x))
    ));
});
