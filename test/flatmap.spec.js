import {flatMap, flatten, every, isEqual} from "lodash/fp";
import jsc, {property} from "jsverify";
import sinon from "sinon";

import {anyArb, arrayArb, singleValueArb} from "./arbitraries";
import {flatmap, flatmap2, flatmap3, flatmap4, flatmap5, collect} from "../lib";

const isTrue = isEqual(true);
const duplicate = n => [n, n];

describe("flatmap over a list", () => {
  property("equivalency to synchronous flatmap", "array nat", async xs =>
    isEqual(await flatmap(duplicate, xs), flatMap(duplicate, xs))
  );

  property("equivalency of concurrent flatmaps", "array nat", async xs => {
    const rs = await Promise.all([
      flatmap(duplicate, xs),
      flatmap2(duplicate, xs),
      flatmap3(duplicate, xs),
      flatmap4(duplicate, xs),
      flatmap5(duplicate, xs),
    ]);
    return rs.every(isEqual(rs[0]));
  });
});

[flatmap, flatmap2, flatmap3, flatmap4, flatmap5].forEach((f, i) =>
  describe(`the ${f.name} operator`, () => {
    property("equivalency to collect", jsc.array(anyArb), async xs =>
      isEqual(
        await collect(duplicate, xs).then(flatten),
        await f(duplicate, xs)
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
