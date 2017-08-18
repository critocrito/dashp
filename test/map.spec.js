import {map as loMap, isEqual} from "lodash/fp";
import {property} from "jsverify";
import Promise from "bluebird";

import {maybePromisify, add, addP, addMaybeP} from "./arbitraries";
import {map, map2, map3, map4, map5} from "../lib/combinators/map";

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

  property("equivalency of concurrent maps", "array nat", "nat", (xs, y) =>
    Promise.all([
      map(add(y), xs),
      map2(add(y), xs),
      map3(add(y), xs),
      map4(add(y), xs),
      map5(add(y), xs),
    ]).then(rs => rs.every(isEqual(rs[0])))
  );
});
