import {map as loMap, every, isEqual} from "lodash/fp";
import jsc, {property} from "jsverify";
import Promise from "bluebird";

import {maybePromisify, add, addP, addMaybeP} from "./arbitraries";
import {map, map2, map3, map4, map5} from "../lib/combinators/map";

const isTrue = isEqual(true);

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

  property("adheres to the concurrency limit", "unit", () => {
    const xs = Array(100).fill(0);
    const test = (mapper, concurrency) => {
      let running = 0;
      return mapper(() => {
        running += 1;
        if (running <= concurrency)
          // eslint-disable-next-line no-return-assign
          return Promise.resolve(true).tap(() => (running -= 1));
        return Promise.resolve(false);
      }, xs).then(every(isTrue));
    };

    return Promise.all([
      test(map, 1),
      test(map2, 2),
      test(map3, 3),
      test(map4, 4),
      test(map5, 5),
    ]).then(every(isTrue));
  });

  it("adheres to the order of inputs", () =>
    jsc.assert(
      jsc.forall(jsc.unit, () => {
        const xs = Array(20).fill(0).map(() => jsc.random(0, 15));
        return map3(x => Promise.resolve(x).delay(x), xs).then(isEqual(xs));
      }),
      {tests: 25}
    ));
});
