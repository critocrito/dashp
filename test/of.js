import {fc, testProp} from "ava-fast-check";
import {isEqual} from "lodash/fp";

import {of} from "../src/Future";

testProp("is equivalent to Promise.resolve", [fc.anything()], async (x) =>
  isEqual(await of(x), await Promise.resolve(x)),
);

testProp("lifts any value into a promise", [fc.anything()], async (x) =>
  isEqual(await of(x), x),
);
