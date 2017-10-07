import {startsWith} from "lodash/fp";
import {property} from "jsverify";

import {anyArb, isEqualAry} from "./arbitraries";
import {tap, tapClone} from "../lib";

const fixture = Symbol("fixture");

describe("The tap combinator", () => {
  // eslint-disable-next-line no-return-assign, no-unused-vars, no-param-reassign
  const f = x => (x = 23);

  property("returns the original value", anyArb, async x =>
    isEqualAry([await tap(f, x), await tapClone(f, x), x])
  );

  property("validates that the mapper is a function (tap)", anyArb, async g => {
    try {
      await tap(g, fixture);
    } catch (e) {
      return e instanceof TypeError && startsWith("Future#tap", e.message);
    }
    return false;
  });

  property(
    "validates that the mapper is a function (tapClone)",
    anyArb,
    async g => {
      try {
        await tapClone(g, fixture);
      } catch (e) {
        return (
          e instanceof TypeError && startsWith("Future#tapClone", e.message)
        );
      }
      return false;
    }
  );
});
