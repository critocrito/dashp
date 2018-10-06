import {isEqual} from "lodash/fp";
import {property} from "jsverify";

import {anyArb, plusP} from "./arbitraries";
import {Future as F, all} from "../src";

describe("The all combinator", () => {
  property(
    "resolves a list of promises",
    anyArb,
    "nat",
    "nat",
    async (x, y, z) => isEqual(await all([F.of(x), plusP(y, z)])(), [x, y + z]),
  );
});
