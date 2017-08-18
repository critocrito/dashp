import {isEqual} from "lodash/fp";
import {property} from "jsverify";

import {maybePromisify, addP, addMaybeP, isEqualAry} from "./arbitraries";
import future from "../lib/combinators/future";
import compose from "../lib/combinators/compose";
import all from "../lib/combinators/all";
import fmap from "../lib/combinators/fmap";

const id = future;

describe("The functor fmap", () => {
  property("maps a function", "nat", "nat", (x, y) =>
    fmap(addP(x), future(y)).then(isEqual(x + y))
  );

  // fmap id === id
  property("holds for the first functor law", "nat", x =>
    all([fmap(id, future(x)), id(x)])().then(isEqualAry)
  );

  // fmap f . fmap g === fmap (f . g)
  property(
    "holds for the second functor law",
    "nat",
    "nat",
    "nat",
    (x, y, z) => {
      const f = addP(x);
      const g = addP(y);

      return all([
        compose(fmap(f), fmap(g), future(z)),
        fmap(compose(f, g), future(z)),
      ])().then(isEqualAry);
    }
  );

  property(
    "accepts non promisified and promisified arguments",
    "nat",
    "nat",
    (x, y) =>
      fmap(maybePromisify(addMaybeP(x)), maybePromisify(y)).then(isEqual(x + y))
  );
});
