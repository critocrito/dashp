import {fc, testProp} from "ava-fast-check";
import {isEqual} from "lodash/fp";

import {constant} from "../src";
import {random} from "./_helpers";

testProp("always returns the same value", [fc.anything()], async (x) =>
  isEqual(await constant(x)(), x),
);

testProp(
  "accepts non promisified and promisified arguments",
  [fc.anything()],
  async (x) => {
    const f = constant(random(0, 2) === 0 ? x : Promise.resolve(x));
    return isEqual(await f(), x);
  },
);
