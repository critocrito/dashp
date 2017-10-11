import {map, flatten, every, isEqual, startsWith} from "lodash/fp";
import jsc, {property} from "jsverify";
import Promise from "bluebird";

import {anyArb, singleValueArb, plus, plusP} from "./arbitraries";
import {collect, collect2, collect3, collect4, collect5} from "../lib";

const isTrue = isEqual(true);
const fixture = Symbol("fixture");

describe("The collect operator", () => {
  property(
    "equivalency to synchronous map",
    "array nat",
    "nat",
    async (xs, y) => isEqual(await collect(plus(y), xs), map(plus(y), xs))
  );

  property("equivalency to Bluebird's map", "array nat", "nat", async (xs, y) =>
    isEqual(await Promise.map(xs, plusP(y)), await collect(plusP(y), xs))
  );

  property(
    "equivalency of concurrent maps",
    "array nat",
    "nat",
    async (xs, y) => {
      const rs = await Promise.all([
        collect(plus(y), xs),
        collect2(plus(y), xs),
        collect3(plus(y), xs),
        collect4(plus(y), xs),
        collect5(plus(y), xs),
      ]);
      return rs.every(isEqual(rs[0]));
    }
  );

  it("adheres to the concurrency limit", async () => {
    const xs = Array(100).fill(0);
    const test = (mapper, concurrency) => {
      let running = 0;
      return mapper(async () => {
        running += 1;
        if (running <= concurrency) {
          await Promise.resolve();
          running -= 1;
          return true;
        }
        await Promise.resolve();
        return false;
      }, xs);
    };
    const rs = await Promise.all([
      test(collect, 1),
      test(collect2, 2),
      test(collect3, 3),
      test(collect4, 4),
      test(collect5, 5),
    ]);
    every(isTrue, flatten(rs)).should.equal(true);
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

  [collect, collect2, collect3, collect4, collect5].forEach(f =>
    property(
      `throws if the second argument of ${f.name} is not an array`,
      singleValueArb,
      async a => {
        const block = () => f(x => x, a);
        return jsc.throws(
          block,
          TypeError,
          /^Future#collect(.+)to be an array/
        );
      }
    )
  );
});
