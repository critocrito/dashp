import {isEqual} from "lodash/fp";
import {assertForall} from "jsverify";

import {anyArb} from "./arbitraries";
import constant from "../lib/combinators/constant";

describe("The constant operator", () => {
  it("always returns the same value", () =>
    assertForall(anyArb, x => constant(x)().then(isEqual(x))));
});
