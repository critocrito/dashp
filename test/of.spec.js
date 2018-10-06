import {isEqual} from "lodash/fp";
import {property} from "jsverify";

import {anyArb} from "./arbitraries";
import {Future as F} from "../src";

describe("Lifting values into a promise", () => {
  property("is equivalent to Promise.resolve", anyArb, async (x) =>
    isEqual(await F.of(x), await Promise.resolve(x)),
  );

  property("lifts any value into a promise", anyArb, async (x) =>
    isEqual(await F.of(x), x),
  );
});
