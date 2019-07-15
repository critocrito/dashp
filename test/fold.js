import {isEqual} from "lodash/fp";
import {testProp, fc} from "ava-fast-check";
import Bluebird from "bluebird";

import {plus, plusP} from "./_helpers";
import {fold} from "../src";

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
