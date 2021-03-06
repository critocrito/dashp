import test from "ava";
import {fc, testProp} from "ava-fast-check";
import {every, flatMap, flatten, isEqual} from "lodash/fp";
import sinon from "sinon";

import {
  collect,
  flatmap,
  flatmap2,
  flatmap3,
  flatmap4,
  flatmap5,
  flatmap6,
  flatmap7,
  flatmap8,
} from "../src";
import {singleValueArb} from "./_helpers";

const isTrue = isEqual(true);
const duplicate = (n) => [n, n];

testProp("equivalency to synchronous flatmap", [fc.array(fc.nat())], async (t, xs) =>
  t.deepEqual(await flatmap(duplicate, xs), flatMap(duplicate, xs)),
);

testProp("equivalency of concurrent flatmaps", [fc.array(fc.nat())], async (t, xs) => {
  const rs = await Promise.all([
    flatmap(duplicate, xs),
    flatmap2(duplicate, xs),
    flatmap3(duplicate, xs),
    flatmap4(duplicate, xs),
    flatmap5(duplicate, xs),
    flatmap6(duplicate, xs),
    flatmap7(duplicate, xs),
    flatmap8(duplicate, xs),
  ]);
  return t.true(rs.every(isEqual(rs[0])));
});

[flatmap, flatmap2, flatmap3, flatmap4, flatmap5, flatmap6, flatmap7, flatmap8].forEach((f, i) => {
  testProp(`${f.name} is equivalent to collect`, [fc.array(fc.anything())], async (t, xs) =>
    t.deepEqual(await collect(duplicate, xs).then(flatten), await f(duplicate, xs)),
  );

  test(`${f.name} adheres to the concurrency limit`, async (t) => {
    const xs = new Array(100).fill(0);
    const testFn = (mapper, concurrency) => {
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
    const rs = await testFn(f, i + 1);
    t.true(every(isTrue, rs));
  });

  testProp(
    `${f.name} adheres to the order of inputs`,
    [fc.array(singleValueArb())],
    async (t, xs) => {
      const stub = sinon.stub();
      xs.forEach((x, j) => stub.onCall(j).resolves(x));
      const result = await f(stub, xs);
      t.deepEqual(result, xs);
    },
  );
});
