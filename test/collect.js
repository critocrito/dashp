import test from "ava";
import {fc, testProp} from "ava-fast-check";
import Bluebird from "bluebird";
import {every, isEqual, map} from "lodash/fp";
import sinon from "sinon";

import {
  collect,
  collect2,
  collect3,
  collect4,
  collect5,
  collect6,
  collect7,
  collect8,
} from "../src";
import {plus, plusP, random} from "./_helpers";

const isTrue = isEqual(true);

testProp("equivalency to synchronous map", [fc.array(fc.nat()), fc.nat()], async (t, xs, y) =>
  t.deepEqual(await collect(plus(y), xs), map(plus(y), xs)),
);

testProp("equivalency of concurrent maps", [fc.array(fc.nat()), fc.nat()], async (t, xs, y) => {
  const rs = await Promise.all([
    collect(plus(y), xs),
    collect2(plus(y), xs),
    collect3(plus(y), xs),
    collect4(plus(y), xs),
    collect5(plus(y), xs),
    collect6(plus(y), xs),
    collect7(plus(y), xs),
    collect8(plus(y), xs),
  ]);
  return t.true(rs.every(isEqual(rs[0])));
});

[collect, collect2, collect3, collect4, collect5, collect6, collect7, collect8].forEach((f, i) => {
  testProp(
    `${f.name} is equivalent to Bluebird's map`,
    [fc.array(fc.nat()), fc.nat()],
    async (t, xs, y) =>
      t.deepEqual(await Bluebird.map(xs, plusP(y), {concurrency: i + 1}), await f(plusP(y), xs)),
  );

  test(`${f.name} adheres to the concurrency limit`, async (t) => {
    const xs = new Array(100).fill(0);
    const testF = (mapper, concurrency) => {
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
    const results = await testF(f, i + 1);
    t.true(every(isTrue, results));
  });

  testProp(`${f.name} adheres to the order of inputs`, [fc.array(fc.anything())], async (t, xs) => {
    const stub = sinon.stub();
    xs.forEach((x, j) => stub.onCall(j).resolves(x));
    const result = await f(stub, xs);
    t.deepEqual(result, xs);
  });

  testProp(
    `${f.name} rejects the collection if an element rejects`,
    [fc.array(fc.nat()), fc.string()],
    async (t, l, msg) => {
      const xs = [...[...l].keys()]; // Make sure l is positive

      const g = (x) => {
        if (x === random(0, xs.length)) {
          throw new Error(msg);
        }
        return x;
      };

      try {
        const result = await f(g, xs);
        t.deepEqual(result, xs);
      } catch (error) {
        t.is(error.message, msg);
      }
    },
  );
});
