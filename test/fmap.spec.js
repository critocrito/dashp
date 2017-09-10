import {isEqual} from "lodash/fp";
import {property} from "jsverify";

import {maybePromisify, addP, addMaybeP} from "./arbitraries";
import {Future as F} from "../lib";

describe("The functor fmap", () => {
  property("maps a function", "nat", "nat", (x, y) =>
    F.map(addP(x), F.of(y)).then(isEqual(x + y))
  );

  property(
    "accepts non promisified and promisified arguments",
    "nat",
    "nat",
    (x, y) =>
      F.map(maybePromisify(addMaybeP(x)), maybePromisify(y)).then(
        isEqual(x + y)
      )
  );
});
