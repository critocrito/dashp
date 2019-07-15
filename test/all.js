import {fc, testProp} from "ava-fast-check";
import {isEqual} from "lodash/fp";

import {all, Future as F} from "../src";
import {plusP} from "./_helpers";

testProp(
  "resolve a list of promises",
  [fc.anything(), fc.nat(), fc.nat()],
  async (x, y, z) => {
    const expected = [x, y + z];
    const result = await all([F.of(x), plusP(y, z)])();
    return isEqual(result, expected);
  },
);
