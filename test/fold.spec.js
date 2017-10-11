import {isEqual} from "lodash/fp";
import jsc, {property} from "jsverify";
import Bluebird from "bluebird";

import {anyArb, arrayArb, singleValueArb, plus, plusP} from "./arbitraries";
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
      isEqual(await fold(plusP, y, xs), await Bluebird.reduce(xs, plusP, y))
  );

  property(
    "throws if the first argument is not a function",
    anyArb,
    arrayArb,
    (g, xs) => {
      const block = () => fold(g, fixture, xs);
      return jsc.throws(block, TypeError, /^Future#fold (.+)to be a function/);
    }
  );

  property(
    "throws if the third argument is not an array",
    singleValueArb,
    a => {
      const block = () => fold(x => x, fixture, a);
      return jsc.throws(block, TypeError, /^Future#fold (.+)to be an array/);
    }
  );
});
