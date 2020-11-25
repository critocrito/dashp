import {fc, testProp} from "ava-fast-check";

import {constant} from "../src";
import {random} from "./_helpers";

testProp("always returns the same value", [fc.anything()], async (t, x) =>
  t.is(await constant(x)(), x),
);

testProp(
  "accepts non promisified and promisified arguments",
  [fc.anything()],
  async (t, x) => {
    const f = constant(random(0, 2) === 0 ? x : Promise.resolve(x));
    t.is(await f(), x);
  },
);
