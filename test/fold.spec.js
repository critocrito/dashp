import {sum, isEqual} from "lodash/fp";
import {property} from "jsverify";
import Promise from "bluebird";

import {maybePromisify, add, addP, addMaybeP, isEqualAry} from "./arbitraries";
import fold from "../lib/combinators/fold";

describe("The fold combinator", () => {
  property(
    "accepts non promisified and promisified arguments",
    "array nat",
    "nat",
    (xs, y) =>
      fold(
        maybePromisify(addMaybeP),
        maybePromisify(y),
        maybePromisify(xs)
      ).then(isEqual(sum(xs) + y))
  );

  property(
    "produces the same result as a synchronous reduce",
    "array nat",
    "nat",
    (xs, y) => fold(add, y, xs).then(isEqual(xs.reduce(add, y)))
  );

  property(
    "produces the same result as reduce of Bluebird",
    "array nat",
    "nat",
    (xs, y) =>
      Promise.all([Promise.reduce(xs, addP, y), fold(addP, y, xs)]).then(
        isEqualAry
      )
  );
});
