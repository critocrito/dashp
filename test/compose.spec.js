import {isEqual} from "lodash/fp";
import {property} from "jsverify";

import {plusP, isEqualAry} from "./arbitraries";
import {Future as F, compose} from "../lib";

describe("The compose combinator", () => {
  property("is always associative", "nat", "nat", "nat", "nat", (w, x, y, z) =>
    Promise.all([
      compose(plusP(w), compose(plusP(x), plusP(y)), F.of(z)),
      compose(compose(plusP(w), plusP(x)), plusP(y), F.of(z)),
    ]).then(isEqualAry)
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
