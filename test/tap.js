import {fc, testProp} from "ava-fast-check";
import {isEqual} from "lodash/fp";

import {tap, tapClone} from "../src";

// eslint-disable-next-line no-return-assign, @typescript-eslint/no-unused-vars, no-param-reassign
const f = (x) => (x = 23);

// FIXME: add test to verify tapClone actually clones a value and tap not.

testProp(
  "tap and tapClone return the same values",
  [fc.anything()],
  async (t, x) => {
    const a = await tap(f, x);
    const b = await tapClone(f, x);

    t.true([a, b].every(isEqual(x)));
  },
);
