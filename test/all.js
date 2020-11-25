import {fc, testProp} from "ava-fast-check";

import {all, Future as F} from "../src";
import {plusP} from "./_helpers";

testProp(
  "resolve a list of promises",
  [fc.anything(), fc.nat(), fc.nat()],
  async (t, x, y, z) => {
    const expected = [x, y + z];
    const result = await all([F.of(x), plusP(y, z)])();
    t.deepEqual(result, expected);
  },
);
