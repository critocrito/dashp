import {testProp, fc} from "ava-fast-check";

import {isEqualAry} from "./_helpers";
import {tap, tapClone} from "../src";

// eslint-disable-next-line no-return-assign, no-unused-vars, no-param-reassign
const f = (x) => (x = 23);

// FIXME: add test to verify tapClone actually clones a value and tap not.

testProp(
  "tap and tapClone return the same values",
  [fc.anything()],
  async (x) => isEqualAry([await tap(f, x), await tapClone(f, x), x]),
);
