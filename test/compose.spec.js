import {isEqual} from "lodash/fp";
import {property} from "jsverify";

import {plusP} from "./arbitraries";
import {Future as F, compose} from "../lib";

describe("The compose combinator", () => {
  property(
    "is always associative",
    "nat",
    "nat",
    "nat",
    "nat",
    async (w, x, y, z) =>
      isEqual(
        await compose(plusP(w), compose(plusP(x), plusP(y)), F.of(z)),
        await compose(compose(plusP(w), plusP(x)), plusP(y), F.of(z))
      )
  );

  property(
    "accepts a value and a promise for a value as last argument",
    "nat",
    "nat",
    "nat",
    async (a, b, c) =>
      isEqual(
        await compose(plusP(a), plusP(b), c),
        await compose(plusP(a), plusP(b), F.of(c))
      )
  );
});
