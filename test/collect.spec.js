import {map, every, isEqual} from "lodash/fp";
import jsc, {property} from "jsverify";
import sinon from "sinon";
import Bluebird from "bluebird";

import {anyArb, arrayArb, singleValueArb, plus, plusP} from "./arbitraries";
import {collect, collect2, collect3, collect4, collect5} from "../lib";

const isTrue = isEqual(true);

describe("mapping a function over an array", () => {
  property(
    "equivalency to synchronous map",
    "array nat",
    "nat",
    async (xs, y) => isEqual(await collect(plus(y), xs), map(plus(y), xs))
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
});

[collect, collect2, collect3, collect4, collect5].forEach((f, i) =>
  describe(`the ${f.name} operator`, () => {
    property(
      "equivalency to Bluebird's map",
      "array nat",
      "nat",
      async (xs, y) =>
        isEqual(
          await Bluebird.map(xs, plusP(y), {concurrency: i + 1}),
          await f(plusP(y), xs)
        )
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
      return test(f, i + 1).then(rs => every(isTrue, rs).should.equal(true));
    });

    property("adheres to the order of inputs", arrayArb, async xs => {
      const stub = sinon.stub();
      xs.forEach((x, j) => stub.onCall(j).resolves(x));
      return f(stub, xs).then(isEqual(xs));
    });

    property(
      "throws if the first argument is not a function",
      anyArb,
      arrayArb,
      (g, xs) => {
        const block = () => f(g, xs);
        return jsc.throws(
          block,
          TypeError,
          new RegExp(`^Future#${f.name} (.+)to be a function`)
        );
      }
    );

    property(
      "throws if the second argument is not an array",
      singleValueArb,
      a => {
        const block = () => f(x => x, a);
        return jsc.throws(
          block,
          TypeError,
          new RegExp(`^Future#${f.name} (.+)to be an array`)
        );
      }
    );
  })
);
