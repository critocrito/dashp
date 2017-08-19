import {flow, identity, flatMap, isEqual} from "lodash/fp";
import Promise from "bluebird";
import {property} from "jsverify";

import {maybePromisify} from "./arbitraries";
import {map} from "../lib/combinators/map";
import {
  flatmap,
  flatmap2,
  flatmap3,
  flatmap4,
  flatmap5,
} from "../lib/combinators/flatmap";

const duplicate = n => [n, n];
const duplicateMaybeP = flow([duplicate, maybePromisify]);

describe("The flatmap operator", () => {
  property("non promisified and promisified arguments", "array nat", xs =>
    flatmap(duplicateMaybeP, maybePromisify(xs)).then(ys =>
      isEqual(ys.length, xs.length * 2)
    )
  );

  property("equivalency to synchronous flatmap", "array nat", xs =>
    flatmap(duplicate, xs).then(isEqual(flatMap(duplicate, xs)))
  );

  property("equivalency of concurrent flatmaps", "array nat", xs =>
    Promise.all([
      flatmap(duplicate, xs),
      flatmap2(duplicate, xs),
      flatmap3(duplicate, xs),
      flatmap4(duplicate, xs),
      flatmap5(duplicate, xs),
    ]).then(rs => rs.every(isEqual(rs[0])))
  );

  property("equivalency to map", "array nat", xs =>
    Promise.all([map(identity, xs), flatmap(identity, xs)]).then(rs =>
      isEqual(...rs)
    )
  );
});
