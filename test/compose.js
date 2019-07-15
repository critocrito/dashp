import {isEqual} from "lodash/fp";
import {testProp, fc} from "ava-fast-check";

import {throws, plusP} from "./_helpers";
import {of, compose} from "../src";

testProp(
  "is always associative",
  [fc.nat(), fc.nat(), fc.nat(), fc.nat()],
  async (w, x, y, z) =>
    isEqual(
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
  async (a, b, c) =>
    isEqual(
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

testProp(
  "throws if the first two arguments are not functions",
  [fc.anything(), fc.nat(), fc.boolean()],
  (f, a, p) => {
    const block = () => {
      if (p) {
        return compose(
          f,
          (x) => x,
          a,
        );
      }
      return compose(
        (x) => x,
        f,
        a,
      );
    };
    return throws(block, TypeError, /^Future#compose (.+)to be a function/);
  },
);
