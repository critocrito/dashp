import {isEqual, startsWith} from "lodash/fp";
import {property} from "jsverify";
import Promise from "bluebird";

import {anyArb, plus, plusP} from "./arbitraries";
import {fold} from "../lib";

const fixture = Symbol("fixture");

describe("The fold combinator", () => {
  property(
    "produces the same result as a synchronous reduce",
    "array nat",
    "nat",
    async (xs, y) => isEqual(await fold(plus, y, xs), xs.reduce(plus, y))
  );

  property(
    "produces the same result as reduce of Bluebird",
    "array nat",
    "nat",
    async (xs, y) =>
      isEqual(await fold(plusP, y, xs), await Promise.reduce(xs, plusP, y))
  );

  property("validates that the mapper is a function", anyArb, async f => {
    try {
      await fold(f, fixture, [fixture]);
    } catch (e) {
      return e instanceof TypeError && startsWith("Future#fold", e.message);
    }
    return false;
  });
});
