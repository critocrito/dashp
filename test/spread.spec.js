import {isEqual} from "lodash/fp";
import {property} from "jsverify";

import {maybePromisify, add, addMaybeP} from "./arbitraries";

import {Future as F, spread} from "../lib";

describe("The spread operator", () => {
  property("applying variadic arguments", "nat", "nat", (x, y) =>
    spread(add, F.of([x, y])).then(isEqual(add(x, y)))
  );

  property("non promisified and promisified arguments", "nat", "nat", (x, y) =>
    spread(addMaybeP, maybePromisify([x, y])).then(isEqual(add(x, y)))
  );

  property("calls a function with a single argument", "nat", "nat", (x, y) =>
    spread(add(x), F.of(y)).then(isEqual(add(x, y)))
  );
});
