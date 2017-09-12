import {isEqual} from "lodash/fp";
import {property} from "jsverify";

import {add} from "./arbitraries";

import {Future as F, spread} from "../lib";

describe("The spread operator", () => {
  property("applying variadic arguments", "nat", "nat", (x, y) =>
    spread(add, F.of([x, y])).then(isEqual(add(x, y)))
  );

  property("calls a function with a single argument", "nat", "nat", (x, y) =>
    spread(add(x), F.of(y)).then(isEqual(add(x, y)))
  );
});
