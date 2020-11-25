import {fc, testProp} from "ava-fast-check";
import Bluebird from "bluebird";

import {fold} from "../src";
import {plus, plusP} from "./_helpers";

testProp(
  "produces the same result as a synchronous reduce",
  [fc.array(fc.nat()), fc.nat()],
  async (t, xs, y) => t.is(await fold(plus, y, xs), xs.reduce(plus, y)),
);

testProp(
  "produces the same result as reduce of Bluebird",
  [fc.array(fc.nat()), fc.nat()],
  async (t, xs, y) =>
    t.is(await fold(plusP, y, xs), await Bluebird.reduce(xs, plusP, y)),
);
