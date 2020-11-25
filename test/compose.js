import {fc, testProp} from "ava-fast-check";

import {compose, of} from "../src";
import {plusP} from "./_helpers";

testProp(
  "is always associative",
  [fc.nat(), fc.nat(), fc.nat(), fc.nat()],
  async (t, w, x, y, z) =>
    t.is(
      await compose(
        plusP(w),
        compose(
          plusP(x),
          plusP(y),
        ),
        of(z),
      ),
      await compose(
        compose(
          plusP(w),
          plusP(x),
        ),
        plusP(y),
        of(z),
      ),
    ),
);

testProp(
  "accepts a value and a promise for a value as last argument",
  [fc.nat(), fc.nat(), fc.nat()],
  async (t, a, b, c) =>
    t.is(
      await compose(
        plusP(a),
        plusP(b),
        c,
      ),
      await compose(
        plusP(a),
        plusP(b),
        of(c),
      ),
    ),
);
