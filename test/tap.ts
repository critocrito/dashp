import {fc, testProp} from "ava-fast-check";
import {isEqual} from "lodash/fp";

import {tap, tapClone} from "../src";

const f = (_x: number): void => {
  // eslint-disable-next-line no-param-reassign
  _x = 23;
};

// FIXME: add test to verify tapClone actually clones a value and tap not.

testProp("tap and tapClone return the same values", [fc.nat()], async (t, x) => {
  const a = await tap(f, x);
  const b = await tapClone(f, x);

  t.true([a, b].every(isEqual(x)));
});
