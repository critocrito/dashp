import {isEqual, startsWith} from "lodash/fp";
import {property} from "jsverify";

import {anyArb} from "./arbitraries";
import {tap} from "../lib";

const fixture = Symbol("fixture");

describe("The tap combinator", () => {
  // eslint-disable-next-line no-return-assign, no-unused-vars, no-param-reassign
  const f = x => (x = 23);

  property("returns the original value", anyArb, async x =>
    isEqual(await tap(f, x), x)
  );

  property("validates that the mapper is a function", anyArb, async g => {
    try {
      await tap(g, fixture);
    } catch (e) {
      return e instanceof TypeError && startsWith("Future#tap", e.message);
    }
    return false;
  });
});
