import {isEqual} from "lodash/fp";
import {property} from "jsverify";

import {anyArb, maybePromisify, addP, addMaybeP} from "./arbitraries";
import {Future as F, all} from "../lib";

describe("The all combinator", () => {
  property("resolves a list of promises", anyArb, "nat", "nat", (x, y, z) =>
    all([F.of(x), addP(y, z)])().then(isEqual([x, y + z]))
  );

  property(
    "accepts non promisified and promisified values",
    anyArb,
    "nat",
    "nat",
    (x, y, z) =>
      all(maybePromisify([maybePromisify(x), addMaybeP(y, z)]))().then(
        isEqual([x, y + z])
      )
  );
});
