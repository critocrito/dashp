import {fc, testProp} from "ava-fast-check";

import {of} from "../src/future";

testProp("is equivalent to Promise.resolve", [fc.anything()], async (t, x) =>
  t.is(await of(x), await Promise.resolve(x)),
);

testProp("lifts any value into a promise", [fc.anything()], async (t, x) => t.is(await of(x), x));
