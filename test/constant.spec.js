import {isEqual} from "lodash/fp";
import {assertForall} from "jsverify";

import {anyArb, maybePromisify} from "./arbitraries";
import constant from "../lib/combinators/constant";

describe("The constant operator", () => {
  it("always returns the same value", () =>
    assertForall(anyArb, x => constant(x)().then(isEqual(x))));

  it("accepts non promisified and promisified arguments", () =>
    assertForall(anyArb, x => constant(maybePromisify(x))().then(isEqual(x))));
});
