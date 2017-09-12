import {isEqual} from "lodash/fp";
import {property} from "jsverify";

import {addP, isEqualAry} from "./arbitraries";
import {Future as F, compose} from "../lib";

describe("The compose combinator", () => {
  property("is always associative", "nat", "nat", "nat", "nat", (w, x, y, z) =>
    Promise.all([
      compose(addP(w), compose(addP(x), addP(y)), F.of(z)),
      compose(compose(addP(w), addP(x)), addP(y), F.of(z)),
    ]).then(isEqualAry)
  );

  property(
    "accepts a value and a promise for a value as last argument",
    "nat",
    "nat",
    "nat",
    async (a, b, c) =>
      isEqual(
        await compose(addP(a), addP(b), c),
        await compose(addP(a), addP(b), F.of(c))
      )
  );
});
