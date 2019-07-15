import {isEqual} from "lodash/fp";
import {testProp, fc} from "ava-fast-check";

import {of} from "../src/Future";

testProp("is equivalent to Promise.resolve", [fc.anything()], async (x) =>
  isEqual(await of(x), await Promise.resolve(x)),
);

testProp("lifts any value into a promise", [fc.anything()], async (x) =>
  isEqual(await of(x), x),
);
