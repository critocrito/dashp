import {flow, identity, flatMap, isEqual, startsWith} from "lodash/fp";
import Promise from "bluebird";
import jsc, {property} from "jsverify";

import {anyArb, maybePromisify, isEqualAry} from "./arbitraries";
import {flatmap, flatmap2, flatmap3, flatmap4, flatmap5, collect} from "../lib";

const fixture = Symbol("fixture");
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

  property("validates that the mapper is a function", anyArb, async f => {
    try {
      await flatmap(f, [fixture]);
    } catch (e) {
      return e instanceof TypeError && startsWith("Future#flatmap", e.message);
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
            funcName = "flatmap2";
            await flatmap2(fixture, [fixture]);
            break;
          case 3:
            funcName = "flatmap3";
            await flatmap3(fixture, [fixture]);
            break;
          case 4:
            funcName = "flatmap4";
            await flatmap4(fixture, [fixture]);
            break;
          case 5:
            funcName = "flatmap5";
            await flatmap5(fixture, [fixture]);
            break;
          default:
            funcName = "flatmap";
            await flatmap(fixture, [fixture]);
            break;
        }
      } catch (e) {
        return startsWith(`Future#${funcName} `, e.message);
      }
      return false;
    }
  );
});
