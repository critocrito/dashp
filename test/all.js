import {isEqual} from "lodash/fp";
import {testProp, fc} from "ava-fast-check";

import {plusP} from "./_helpers";
import {Future as F, all} from "../src";

testProp(
  "resolve a list of promises",
  [fc.anything(), fc.nat(), fc.nat()],
  async (x, y, z) => {
    const result = await all([F.of(x), plusP(y, z)])();
    return isEqual(result, [x, y + z]);
  },
);
