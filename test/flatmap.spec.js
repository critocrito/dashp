import {identity, flatMap, isEqual, startsWith} from "lodash/fp";
import Promise from "bluebird";
import jsc, {property} from "jsverify";

import {anyArb} from "./arbitraries";
import {flatmap, flatmap2, flatmap3, flatmap4, flatmap5, collect} from "../lib";

const fixture = Symbol("fixture");
const duplicate = n => [n, n];

describe("The flatmap operator", () => {
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

  property("equivalency to collect", "array nat", async xs =>
    isEqual(await collect(identity, xs), await flatmap(identity, xs))
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
