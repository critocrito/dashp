import {isEqual} from "lodash/fp";
import jsc, {property} from "jsverify";

import {anyArb, plusP} from "./arbitraries";
import {of, compose} from "../src";

describe("The compose combinator", () => {
  property(
    "is always associative",
    "nat",
    "nat",
    "nat",
    "nat",
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

  property(
    "accepts a value and a promise for a value as last argument",
    "nat",
    "nat",
    "nat",
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

  property(
    "throws if the first two arguments are not functions",
    anyArb,
    "nat",
    (f, a) => {
      const block = () => {
        if (jsc.random(0, 1) === 0) {
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
      return jsc.throws(
        block,
        TypeError,
        /^Future#compose (.+)to be a function/,
      );
    },
  );
});
