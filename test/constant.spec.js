import {isEqual} from "lodash/fp";
import {property} from "jsverify";

import {anyArb, maybePromisify} from "./arbitraries";
import {constant} from "../lib";

describe("The constant operator", () => {
  property("always returns the same value", anyArb, async x =>
    isEqual(await constant(x)(), x)
  );

  property(
    "accepts non promisified and promisified arguments",
    anyArb,
    async x => isEqual(await constant(maybePromisify(x))(), x)
  );
});
