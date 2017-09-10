import {flow, identity, flatMap, isEqual} from "lodash/fp";
import Promise from "bluebird";
import {property} from "jsverify";

import {maybePromisify, isEqualAry} from "./arbitraries";
import {flatmap, flatmap2, flatmap3, flatmap4, flatmap5, collect} from "../lib";

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

  property("equivalency to collect", "array nat", xs =>
    Promise.all([collect(identity, xs), flatmap(identity, xs)]).then(isEqualAry)
  );
});
