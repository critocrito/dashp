import {isEqual} from "lodash/fp";
import {property} from "jsverify";

import {plus} from "./arbitraries";

import {Future as F, spread} from "../lib";

describe("The spread operator", () => {
  property("applying variadic arguments", "nat", "nat", async (x, y) =>
    isEqual(await spread(plus, F.of([x, y])), plus(x, y))
  );

  property(
    "calls a function with a single argument",
    "nat",
    "nat",
    async (x, y) => isEqual(await spread(plus(x), F.of(y)), plus(x, y))
  );
});
