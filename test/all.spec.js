import {isEqual} from "lodash/fp";
import {assertForall, nat} from "jsverify";

import {anyArb, maybePromisify, addP, addMaybeP} from "./arbitraries";
import all from "../lib/combinators/all";
import future from "../lib/combinators/future";

describe("The all combinator", () => {
  it("resolves a list of promises", () =>
    assertForall(anyArb, nat, nat, (x, y, z) =>
      all([future(x), addP(y, z)])().then(isEqual([x, y + z]))
    ));

  it("accepts non promisified and promisified values", () =>
    assertForall(anyArb, nat, nat, (x, y, z) =>
      all(maybePromisify([maybePromisify(x), addMaybeP(y, z)]))().then(
        isEqual([x, y + z])
      )
    ));
});
