import {isEqual} from "lodash/fp";
import {property} from "jsverify";

import {maybePromisify, add, addMaybeP} from "./arbitraries";

import future from "../lib/combinators/future";
import spread from "../lib/combinators/spread";

describe("The spread operator", () => {
  property("applying variadic arguments", "nat", "nat", (x, y) =>
    spread(add, future([x, y])).then(isEqual(add(x, y)))
  );

  property("non promisified and promisified arguments", "nat", "nat", (x, y) =>
    spread(addMaybeP, maybePromisify([x, y])).then(isEqual(add(x, y)))
  );

  property("calls a function with a single argument", "nat", "nat", (x, y) =>
    spread(add(x), future(y)).then(isEqual(add(x, y)))
  );
});
