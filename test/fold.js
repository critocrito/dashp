import {isEqual} from "lodash/fp";
import {testProp, fc} from "ava-fast-check";
import Bluebird from "bluebird";

import {singleValueArb, plus, plusP} from "./_helpers";
import {fold} from "../src";

const fixture = Symbol("fixture");

testProp(
  "produces the same result as a synchronous reduce",
  [fc.array(fc.nat()), fc.nat()],
  async (xs, y) => isEqual(await fold(plus, y, xs), xs.reduce(plus, y)),
);

testProp(
  "produces the same result as reduce of Bluebird",
  [fc.array(fc.nat()), fc.nat()],
  async (xs, y) =>
    isEqual(await fold(plusP, y, xs), await Bluebird.reduce(xs, plusP, y)),
);

testProp(
  "throws if the first argument is not a function",
  [fc.anything(), fc.array(fc.anything())],
  async (g, xs) => {
    try {
      await (() => fold(g, fixture, xs))();
    } catch (e) {
      if (
        e instanceof TypeError &&
        /^Future#fold (.+)to be a function/.test(e.message)
      )
        return true;
    }
    return false;
  },
);

testProp(
  "throws if the third argument is not an array",
  [singleValueArb()],
  async (a) => {
    try {
      await (() => fold((x) => x, fixture, a))();
    } catch (e) {
      if (
        e instanceof TypeError &&
        /^Future#fold (.+)to be an array/.test(e.message)
      )
        return true;
    }
    return false;
  },
);
