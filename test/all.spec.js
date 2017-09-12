import {isEqual} from "lodash/fp";
import {property} from "jsverify";

import {anyArb, maybePromisify, plusP, plusMaybeP} from "./arbitraries";
import {Future as F, all} from "../lib";

describe("The all combinator", () => {
  property("resolves a list of promises", anyArb, "nat", "nat", (x, y, z) =>
    all([F.of(x), plusP(y, z)])().then(isEqual([x, y + z]))
  );

  property(
    "accepts non promisified and promisified values",
    anyArb,
    "nat",
    "nat",
    (x, y, z) =>
      all(maybePromisify([maybePromisify(x), plusMaybeP(y, z)]))().then(
        isEqual([x, y + z])
      )
  );
});
