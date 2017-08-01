import {isEqual} from "lodash/fp";
import {property} from "jsverify";

import {maybePromisify, addP} from "./arbitraries";
import lift2 from "../lib/combinators/lift2";

describe("The lift2 operator", () => {
  property("lifts two arguments", "nat", "nat", (x, y) =>
    lift2(addP, x, y).then(isEqual(x + y))
  );

  property(
    "accepts non promisified and promisified arguments",
    "nat",
    "nat",
    (x, y) =>
      lift2(maybePromisify(addP), maybePromisify(x), maybePromisify(y)).then(
        isEqual(x + y)
      )
  );
});
