import {isEqual, sum} from "lodash/fp";
import {property} from "jsverify";

import {of, lift2, lift3, lift4} from "../lib";

const plus = (...args) => sum(args);

describe("The lift operator", () => {
  property("lifts two arguments", "nat", "nat", async (x, y) =>
    isEqual(await lift2(plus, of(x), of(y)), x + y)
  );
  property("lifts three arguments", "nat", "nat", "nat", async (x, y, z) =>
    isEqual(await lift3(plus, of(x), of(y), of(z)), x + y + z)
  );
  property(
    "lifts four arguments",
    "nat",
    "nat",
    "nat",
    "nat",
    async (w, x, y, z) =>
      isEqual(await lift4(plus, of(w), of(x), of(y), of(z)), w + x + y + z)
  );
});
