import {fc, testProp} from "ava-fast-check";

import {tap, tapClone} from "../src";
import {isEqualAry} from "./_helpers";

// eslint-disable-next-line no-return-assign, no-unused-vars, no-param-reassign
const f = (x) => (x = 23);

// FIXME: add test to verify tapClone actually clones a value and tap not.

testProp(
  "tap and tapClone return the same values",
  [fc.anything()],
  async (t, x) =>
    t.true(isEqualAry([await tap(f, x), await tapClone(f, x), x])),
);
