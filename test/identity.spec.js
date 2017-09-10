import {isEqual} from "lodash/fp";
import {property} from "jsverify";

import {anyArb} from "./arbitraries";
import identity from "../lib/internal/identity";

describe("The I combinator", () => {
  property("returns it's arguments", anyArb, x => isEqual(identity(x), x));
});
