import {isEqual, sum} from "lodash/fp";
import {testProp, fc} from "ava-fast-check";

import {of, lift2, lift3, lift4} from "../src";

// plus must *not* be curried, hence the helpers version doesn't work here.
const plus = (...args) => sum(args);

testProp("lifts two arguments", [fc.nat(), fc.nat()], async (x, y) =>
  isEqual(await lift2(plus, of(x), of(y)), x + y),
);

testProp(
  "lifts three arguments",
  [fc.nat(), fc.nat(), fc.nat()],
  async (x, y, z) => isEqual(await lift3(plus, of(x), of(y), of(z)), x + y + z),
);

testProp(
  "lifts four arguments",
  [fc.nat(), fc.nat(), fc.nat(), fc.nat()],
  async (w, x, y, z) =>
    isEqual(await lift4(plus, of(w), of(x), of(y), of(z)), w + x + y + z),
);
