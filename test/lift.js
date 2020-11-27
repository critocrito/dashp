import {fc, testProp} from "ava-fast-check";
import {sum} from "lodash/fp";

import {lift2, lift3, lift4, of} from "../src";

// plus must *not* be curried, hence the helpers version doesn't work here.
const plus = (...args) => sum(args);

testProp("lifts two arguments", [fc.nat(), fc.nat()], async (t, x, y) =>
  t.is(await lift2(plus, of(x), of(y)), x + y),
);

testProp("lifts three arguments", [fc.nat(), fc.nat(), fc.nat()], async (t, x, y, z) =>
  t.is(await lift3(plus, of(x), of(y), of(z)), x + y + z),
);

testProp("lifts four arguments", [fc.nat(), fc.nat(), fc.nat(), fc.nat()], async (t, w, x, y, z) =>
  t.is(await lift4(plus, of(w), of(x), of(y), of(z)), w + x + y + z),
);
