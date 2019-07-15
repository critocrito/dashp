import {startsWith} from "lodash/fp";
import {testProp, fc} from "ava-fast-check";

import {isEqualAry} from "./_helpers";
import {tap, tapClone} from "../src";

const fixture = Symbol("fixture");

// eslint-disable-next-line no-return-assign, no-unused-vars, no-param-reassign
const f = (x) => (x = 23);

testProp("returns the original value", [fc.anything()], async (x) =>
  isEqualAry([await tap(f, x), await tapClone(f, x), x]),
);

testProp(
  "validates that the mapper is a function (tap)",
  [fc.anything()],
  async (g) => {
    try {
      await tap(g, fixture);
    } catch (e) {
      return e instanceof TypeError && startsWith("Future#tap", e.message);
    }
    return false;
  },
);

testProp(
  "validates that the mapper is a function (tapClone)",
  [fc.anything()],
  async (g) => {
    try {
      await tapClone(g, fixture);
    } catch (e) {
      return e instanceof TypeError && startsWith("Future#tapClone", e.message);
    }
    return false;
  },
);
