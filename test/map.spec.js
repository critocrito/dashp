import {map as loMap, isEqual} from "lodash/fp";
import {property} from "jsverify";
import Promise from "bluebird";

import {maybePromisify, add, addP, addMaybeP} from "./arbitraries";
import map from "../lib/combinators/map";

describe("The map operator", () => {
  property(
    "non promisified and promisified arguments",
    "array nat",
    "nat",
    (xs, y) =>
      map(addMaybeP(y), maybePromisify(xs)).then(zs =>
        isEqual(xs.length, zs.length)
      )
  );

  property("equivalency to synchronous map", "array nat", "nat", (xs, y) =>
    map(add(y), xs).then(isEqual(loMap(add(y), xs)))
  );

  property("equivalency to Bluebird's map", "array nat", "nat", (xs, y) =>
    Promise.all([Promise.map(xs, addP(y)), map(addP(y), xs)]).then(([a, b]) =>
      isEqual(a, b)
    )
  );
});
