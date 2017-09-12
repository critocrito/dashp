import {isEqual} from "lodash/fp";
import {property} from "jsverify";

import {plus} from "./arbitraries";

import {Future as F, spread} from "../lib";

describe("The spread operator", () => {
  property("applying variadic arguments", "nat", "nat", (x, y) =>
    spread(plus, F.of([x, y])).then(isEqual(plus(x, y)))
  );

  property("calls a function with a single argument", "nat", "nat", (x, y) =>
    spread(plus(x), F.of(y)).then(isEqual(plus(x, y)))
  );
});
