import {map, every, isEqual, startsWith} from "lodash/fp";
import jsc, {property} from "jsverify";
import Promise from "bluebird";

import {anyArb, maybePromisify, add, addP, addMaybeP} from "./arbitraries";
import {collect, collect2, collect3, collect4, collect5} from "../lib";

const isTrue = isEqual(true);
const fixture = Symbol("fixture");

describe("The collect operator", () => {
  property(
    "non promisified and promisified arguments",
    "array nat",
    "nat",
    (xs, y) =>
      collect(addMaybeP(y), maybePromisify(xs)).then(zs =>
        isEqual(xs.length, zs.length)
      )
  );

  property("equivalency to synchronous map", "array nat", "nat", (xs, y) =>
    collect(add(y), xs).then(isEqual(map(add(y), xs)))
  );

  property("equivalency to Bluebird's map", "array nat", "nat", (xs, y) =>
    Promise.all([
      Promise.map(xs, addP(y)),
      collect(addP(y), xs),
    ]).then(([a, b]) => isEqual(a, b))
  );

  property("equivalency of concurrent maps", "array nat", "nat", (xs, y) =>
    Promise.all([
      collect(add(y), xs),
      collect2(add(y), xs),
      collect3(add(y), xs),
      collect4(add(y), xs),
      collect5(add(y), xs),
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
      test(collect, 1),
      test(collect2, 2),
      test(collect3, 3),
      test(collect4, 4),
      test(collect5, 5),
    ]).then(every(isTrue));
  });

  it("adheres to the order of inputs", () =>
    jsc.assert(
      jsc.forall(jsc.unit, () => {
        const xs = Array(20)
          .fill(0)
          .map(() => jsc.random(0, 15));
        return collect3(x => Promise.resolve(x).delay(x), xs).then(isEqual(xs));
      }),
      {tests: 25}
    ));

  property("validates that the mapper is a function", anyArb, async f => {
    try {
      await collect(f, [fixture]);
    } catch (e) {
      return e instanceof TypeError && startsWith("Future#collect", e.message);
    }
    return false;
  });

  property(
    "contains the correct function name when mapper is not a function",
    "unit",
    async () => {
      let funcName;
      try {
        switch (jsc.random(1, 5)) {
          case 2:
            funcName = "collect2";
            await collect2(fixture, [fixture]);
            break;
          case 3:
            funcName = "collect3";
            await collect3(fixture, [fixture]);
            break;
          case 4:
            funcName = "collect4";
            await collect4(fixture, [fixture]);
            break;
          case 5:
            funcName = "collect5";
            await collect5(fixture, [fixture]);
            break;
          default:
            funcName = "collect";
            await collect(fixture, [fixture]);
            break;
        }
      } catch (e) {
        return startsWith(`Future#${funcName} `, e.message);
      }
      return false;
    }
  );
});
