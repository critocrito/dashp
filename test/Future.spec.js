import {isEqual, startsWith} from "lodash/fp";
import {property} from "jsverify";

import {addP, anyArb} from "./arbitraries";
import {Future as F, compose as comp} from "../lib";

const fixture = Symbol("fixture");

describe("The type Future", () => {
  // https://github.com/rpominov/static-land/blob/master/docs/spec.md#functor
  describe("is an instance of Functor", () => {
    property("identity", anyArb, async a => isEqual(await F.map(x => x, a), a));
    property("composition", "nat", "nat", "nat", async (a, b, c) => {
      const f = addP(b);
      const g = addP(c);

      return isEqual(await F.map(comp(f, g), a), await F.map(f, F.map(g, a)));
    });
    property("validates that the mapper is a function", anyArb, async f => {
      try {
        await F.map(f, fixture);
      } catch (e) {
        return e instanceof TypeError && startsWith("Future#map", e.message);
      }
      return false;
    });
  });

  describe("is an instance of Applicative", () => {
    // https://github.com/rpominov/static-land/blob/master/docs/spec.md#apply
    property("identity", "nat", async a => {
      const v = F.of(a);
      return isEqual(await F.ap(F.of(x => x), v), a);
    });

    property("homomorphism", "nat", "nat", async (a, b) => {
      const f = addP(a);
      return isEqual(await F.ap(F.of(f), F.of(b)), await F.of(f(b)));
    });

    property("interchange", "nat", "nat", async (a, b) => {
      const u = F.of(addP(b));
      return isEqual(await F.ap(u, F.of(b)), await F.ap(F.of(f => f(b)), u));
    });

    property("composition", "nat", "nat", "nat", async (a, b, c) => {
      const x = F.of(a);
      const u = F.of(addP(b));
      const v = F.of(addP(c));

      return isEqual(
        await F.ap(F.ap(F.map(comp, u), v), x),
        await F.ap(u, F.ap(v, x))
      );
    });

    property("deriving Functors map", "nat", "nat", async (a, b) => {
      const f = addP(b);
      const map = (g, u) => F.ap(F.of(g), u);

      return isEqual(await F.map(f, F.of(a)), await map(f, F.of(a)));
    });
  });
});
