import test from "ava";
import {testProp, fc} from "ava-fast-check";
import {map, every, isEqual} from "lodash/fp";
import sinon from "sinon";
import Bluebird from "bluebird";

import {singleValueArb, random, throws, plus, plusP} from "./_helpers";
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

const isTrue = isEqual(true);

testProp(
  "equivalency to synchronous map",
  [fc.array(fc.nat()), fc.nat()],
  async (xs, y) => isEqual(await collect(plus(y), xs), map(plus(y), xs)),
);

testProp(
  "equivalency of concurrent maps",
  [fc.array(fc.nat()), fc.nat()],
  async (xs, y) => {
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
    return rs.every(isEqual(rs[0]));
  },
);

[
  collect,
  collect2,
  collect3,
  collect4,
  collect5,
  collect6,
  collect7,
  collect8,
].forEach((f, i) => {
  testProp(
    `${f.name} is equivalent to Bluebird's map`,
    [fc.array(fc.nat()), fc.nat()],
    async (xs, y) =>
      isEqual(
        await Bluebird.map(xs, plusP(y), {concurrency: i + 1}),
        await f(plusP(y), xs),
      ),
  );

  test(`${f.name} adheres to the concurrency limit`, async (t) => {
    const xs = Array(100).fill(0);
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

  testProp(
    `${f.name} adheres to the order of inputs`,
    [fc.array(fc.anything())],
    async (xs) => {
      const stub = sinon.stub();
      xs.forEach((x, j) => stub.onCall(j).resolves(x));
      return f(stub, xs).then(isEqual(xs));
    },
  );

  testProp(
    `${f.name} rejects the collection if an element rejects`,
    [fc.array(fc.nat()), fc.string()],
    async (l, msg) => {
      const xs = [...Array.from(l).keys()]; // Make sure l is positive

      const g = (x) => {
        if (x === random(0, xs.length)) {
          throw new Error(msg);
        }
        return x;
      };

      return f(g, xs)
        .then(() => true)
        .catch((e) => e.message === msg);
    },
  );

  testProp(
    `${f.name} throws if the first argument is not a function`,
    [fc.anything(), fc.array(fc.anything())],
    (g, xs) =>
      throws(
        () => f(g, xs),
        TypeError,
        new RegExp(
          `^Future#${f.name.replace(/-[\d]$/, "")} (.+)to be a function`,
        ),
      ),
  );

  testProp(
    `${f.name} throws if the second argument is not an array`,
    [singleValueArb()],
    (a) =>
      throws(
        () => f((x) => x, a),
        TypeError,
        new RegExp(
          `^Future#${f.name.replace(/-[\d]$/, "")} (.+)to be an array`,
        ),
      ),
  );
});